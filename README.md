# SmartConsole
This is an app I use to control some stuff around my apartment. I mainly did it to work on my web dev skills and refresh myself. The server is able to run multiple clients, and the clients are designed to be run on a small touch screen.

### Currently, my setup works by using the following
* Raspberry Pi, or a similar microcomputer
    * The version doesn't matter, but more power should help lead to less freezes (I am currently using 3+)
    * Wi-Fi recommended (either dongle or built-in)
    * I recommend a lightweight OS, I use [DietPi](https://github.com/MichaIng/DietPi) and configured it to boot into Chromium pointing to the server.
* Touchscreen - I used [this one](https://www.amazon.com/gp/product/B07L6WT77H/)
* Another computer - not required, but something to run the server. You can run the server on the same Pi, or another Pi
* Battery - definitely not required, but if you want mobile screen, can be useful, such as [this one](https://www.amazon.com/gp/product/B07H8F5HYJ/)
* Philips Hue lights

## Development
Currently the codebase is split into two parts, the client and server. You must start both the server and client. More details to come.

### Server
In the server/ folder `npm run start`
Uses socket.io to provide updates to client(s) with aggregated data.


### Client
In the client/ folder `npm run start`
Uses ReactJS to dynamically update with data provided by server.