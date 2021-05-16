import axios from "axios";
import { ConfigurationService } from "./configuration";

class UVService {
    static async getCurrentUVIndex(): Promise<number> {
        const configService = ConfigurationService.getInstance();
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(axios.get(`https://api.openuv.io/api/v1/uv?lat=${position.coords.latitude}&lng=${position.coords.longitude}&alt=${position.coords.altitude}`, {
                    headers: {
                        "x-access-token" : configService.getOpenUVIndexKey()
                    }
                }).then(response => (response.data as UVIndexResponse).uv))
            });
        });
    }
}

interface UVIndexResponse {
    uv: number,
    uv_max: number,
    uv_max_time: string
}