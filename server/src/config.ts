import fs from "fs";
import path from "path";

let config: Configuration;
let configFileExists = false;
try {
    config = require("../config.json");
    configFileExists = true;
} catch {}

export const Config: Configuration = config;
export const ConfigFileExists: boolean = configFileExists;
export async function writeToConfig(config: Configuration): Promise<void> {
    return new Promise(resolve => {
        fs.writeFile(path.join(__dirname, "../config.json"), JSON.stringify(config, undefined, 4), () => resolve());
    });
}

export declare type Configuration = {
    Port: number,
    Hue: {
        Username: string,
        ClientKey: string
    }
};