import { TShirt } from "../models";

export function get(): Promise<TShirt[]> {
    return new Promise((resolve, reject) => {
        resolve([{
            id: 0,
            brand: "",
            description: "",
            price: 20
        }, {
            id: 1,
            brand: "",
            description: "",
            price: 20
        }, {
            id: 2,
            brand: "",
            description: "",
            price: 20
        }]);
    });
}
