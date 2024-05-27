const mqtt = require("mqtt");
const client = mqtt.connect("http://localhost:8083");

client.on("connect", () => {
  client.subscribe("notifications", (err) => {
    if (!err) {
      client.publish("notifications", "Hello mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  console.log(message.toString());
  client.end();
});
