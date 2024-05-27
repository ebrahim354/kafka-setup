const {Kafka} = require("kafkajs")

async function consume(){
    try
    {
         const kafka = new Kafka({
              "clientId": "brocker",
              "brokers" :["localhost:9092"]
         })

        const consumer = kafka.consumer();
        await consumer.connect();
        console.log("Connected to Kafka");
        
        await consumer.subscribe({
            "topic": "notifications",
            "fromBeginning": false // true means load all previouse messages.
        })
        
        await consumer.run({
            "eachMessage": async res => {
                console.log(`received the following message ${res.message.value}`);
            }
        })
    }
    catch(e)
    {
        console.error(e);
    }
}
consume();
