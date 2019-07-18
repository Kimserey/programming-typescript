import * as ajv from "ajv";
import Axios from "axios";

const ajvSchema = new ajv({
    allErrors: true,
    unknownFormats: ["int32", "int64"]
});

const id = (_: any) => _;

export interface ValidationResult {
    valid: boolean;
    errors: Array<{ message: string, path: string }>;
}

export interface OAS {
    definitions: {
        [schemaName: string]: any;
    };
}

/**
 * Validates the data provided using the JsonSchema specified at the schema URL.
 * @param data Data to validate.
 * @param schemaUrl Schema url.
 * @returns ValidationResult where valid is true and errors is [] if there are no errors.
 */
export function validateSchema<TData>(data: TData, schemaUrl: string): Promise<ValidationResult>;
/**
 * Validates the data provided by using a JsonSchema embedded within an Open API Specification.
 * @param data Data to validate.
 * @param oasUrl Open API Specification Url.
 * @param path Path to the JsonSchema within the Open API Specification.
 * @returns ValidationResult where valid is true and errors is [] if there are no errors.
 */
export function validateSchema<TData>(data: TData, oasUrl: string, path: (pathToSchema: OAS) => any): Promise<ValidationResult>;
export async function validateSchema<TData>(data: TData, schemaUrl: string, schemaPath: (oas: any) => any = id): Promise<ValidationResult> {
    const response =
        await Axios.get(schemaUrl);

    const schema =
        schemaPath(response.data);

    const validate =
        ajvSchema.compile(schema);

    const isValid =
        validate(data);

    return {
        errors: (validate.errors || []).map(err => ({
            message: err.message || "",
            path: err.schemaPath
        })),
        valid: isValid as boolean
    };
}
