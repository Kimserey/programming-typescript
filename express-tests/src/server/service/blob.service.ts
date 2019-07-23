import { createReadStream } from "fs";
import { BucketItem, Client } from "minio";
import { Stream } from "stream";

const minio = new Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESSKEY!,
    secretKey: process.env.MINIO_SECRETKEY!
});

function listObjects(bucket: string): Promise<{ [key: string]: BucketItem }> {
    return new Promise((resolve, reject) => {
        const objects = minio.listObjectsV2(bucket);

        let data: { [key: string]: BucketItem } = {};

        objects.on("data", (item: BucketItem) => {
            data = {
                [item.name]: item,
                ...data
            };
        });

        objects.on("error", (err) => {
            reject(err);
        });

        objects.on("end", () => {
            resolve(data);
        });
    });
}

function putObject(bucket: string, name: string, data: Stream | Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
        minio.putObject(bucket, name, data, (err) => {
            if (!!err) {
                reject(err);
            }
            resolve();
        });
    });
}

listObjects("kimserey")
    .then(data => console.log(data))
    .catch(err => console.error(err));