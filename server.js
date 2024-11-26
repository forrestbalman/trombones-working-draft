import OSC from "osc-js";

const udpPort = 41235;
const wsPort = 3333;
const config = { udpClient: { port: udpPort }, wsServer: { port: wsPort } };
const osc = new OSC({ plugin: new OSC.BridgePlugin(config) });

osc.open();

osc.on("open", () => {
	console.log("OSC WebSocket server is running on ws://localhost:3333");
});

osc.on("message", (message) => {
	console.log("Received message:", message);
	osc.send(message, { host: "localhost", port: udpPort });
});
