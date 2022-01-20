import axios, { AxiosRequestConfig } from "axios";
import { Config } from "../config";

export class TranslationService {
    private readonly baseUrl = "https://translation.googleapis.com/language/translate/v2";
    constructor() {

    }

    async getSupportedLanguages(): Promise<Array<string>> {
        const config: AxiosRequestConfig = {
            params: {
                key: Config.GoogleCloud.TranslateApiKey
            }
        };
        axios.get(this.baseUrl + "/languages", config);

        return [];
    }

    async translate(phrase: string, fromLang: string, toLang: string): Promise<string> {
        return "";
    }
}

export class CachedTranslationService extends TranslationService {
    private constructor() {
        super();
    }

    async getSupportedLanguages(): Promise<Array<string>> {
        return [];
    }
}