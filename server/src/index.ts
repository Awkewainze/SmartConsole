import { createServer } from "http";
import socketIO from "socket.io";
import { v3 } from "node-hue-api";
import { Config, ConfigFileExists, writeToConfig, Configuration } from "./config";
import { promisify } from "util";
import Api from "node-hue-api/lib/api/Api";
import { LightManager } from "./light-manager";

async function main() {
    if (!ConfigFileExists) {
        console.log("Config missing...");
        return firstRun();
    }
    const api = await connectToBridge();
    const server = createServer();
    const lightManager = new LightManager(api);
    const io = socketIO(server);

    io.on("connection", client => {
        client.on("GetLights", async () => {
            client.emit("Lights", (await lightManager.getLights()).map(simpleLightSimpler));
        });
        client.on("GetGroups", async () => {
            client.emit("Groups", (await lightManager.getGroups()).map(simpleGroupSimpler));
        });
        client.on("SetLightState", async (lightId: string, state: SimpleLightState) => {
            await lightManager.setLightState(lightId, state);
        });
        client.on("SetGroupState", async (groupId: string, state: SimpleLightState) => {
            await lightManager.setGroupState(groupId, state);
        });
    });

    lightManager.getLightOrGroupChangedObservable().subscribe(x => {
        io.emit("LightOrGroupChanged", {lights: x.lights.map(simpleLightSimpler), groups: x.groups.map(simpleGroupSimpler)});
    });
    const refreshClients = () => io.emit("Refresh");

    server.listen(Config.Port);
}

function simpleLightSimpler(light: SimpleLight): SuperSimpleLight {
    return {
        id: light.id,
        name: light.name,
        state: {
            on: light.state.on as any,
            saturation: light.state.saturation as any,
            brightness: light.state.brightness as any,
            hue: light.state.hue as any,
            ct: light.state.ct as any
        }
    }
}

function simpleGroupSimpler(group: SimpleLightGroup): SuperSimpleLightGroup {
    return {
        id: group.id,
        name: group.name,
        lights: group.lights,
        type: group.type
    }
}

async function connectToBridge(): Promise<Api> {
    const ipAddress = (await v3.discovery.nupnpSearch())[0].ipaddress;
    return v3.api.createLocal(ipAddress).connect(Config.Hue.Username);
}

async function firstRun(): Promise<void> {
    try {
        console.log("Connecting to Hue Bridge, press Link button.")
        await promisify(setTimeout)(3000);
        const ipAddress = (await v3.discovery.nupnpSearch())[0].ipaddress;
        const appName = 'console';
        const deviceName = 'server';
        const unauthenticatedApi = await v3.api.createLocal(ipAddress).connect();
        const default_port = 3000;

        let createdUser = await unauthenticatedApi.users.createUser(appName, deviceName);
        console.log('*******************************************************************************\n');
        console.log('User has been created on the Hue Bridge. The following username can be used to\n' +
            'authenticate with the Bridge and provide full local access to the Hue Bridge.\n' +
            'YOU SHOULD TREAT THIS LIKE A PASSWORD\n');
        console.log(`Hue Bridge User: ${createdUser.username}`);
        console.log(`Hue Bridge User Client Key: ${createdUser.clientkey}`);
        console.log('*******************************************************************************\n');

        console.log("Creating config file...");
        await writeToConfig({
            Hue: {
                Username: createdUser.username,
                ClientKey: createdUser.clientkey
            },
            Port: default_port
        });
        console.log("Done!");

        // Create a new API instance that is authenticated with the new user we created
        const authenticatedApi = await v3.api.createLocal(ipAddress).connect(createdUser.username);

        // Do something with the authenticated user/api
        const bridgeConfig = await authenticatedApi.configuration.getConfiguration();
        console.log(`Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);

    } catch (err) {
        if (err.getHueErrorType() === 101) {
            console.error('The Link button on the bridge was not pressed. Please press the Link button and try again.');
        } else {
            console.error(`Unexpected Error: ${err.message}`);
        }
    }
}

main();