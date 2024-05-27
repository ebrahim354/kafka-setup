const {Kafka} = require("kafkajs");
const kafka = new Kafka({
    clientId: "brocker",
    brokers :["localhost:9092"]
});


// should be called once.
async function createNotificationsTopic() {
    const admin = kafka.admin();
    await admin.connect()
    console.log("Connected as admin");
    await admin.createTopics({
        "topics": [{
            "topic" : "notifications",
            "numPartitions": 1,
        }]
    })
    console.log("Created notifications topic!");
    await admin.disconnect();

}

async function produce(){
    try
    {


        const producer = kafka.producer();
        await producer.connect();
        console.log("Connected to Kafka");
        const result =  await producer.send({
            "topic": "notifications",
            "messages": [
                {
                    "value": "Produced a new notification",
                }
            ]
        })

        console.log(`Sent with a the following result: ${JSON.stringify(result)}`);
        await producer.disconnect();
    }
    catch(e)
    {
        console.error(e);
    }
}

createNotificationsTopic();
produce();
