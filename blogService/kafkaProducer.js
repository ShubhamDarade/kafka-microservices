const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

const producer = new kafka.Producer(client);

producer.on("ready", () => {
  console.log("Kafka Producer is connected and ready.");
});

producer.on("error", (err) => {
  console.error("Error in Kafka Producer:", err);
});

const sendMessageToKafka = (blogPost) => {
  const message = JSON.stringify(blogPost);

  producer.send(
    [{ topic: "new_blog_post", messages: message }],
    (err, data) => {
      if (err) {
        console.error("Error sending message to Kafka:", err);
      } else {
        console.log("Message sent successfully:", data);
      }
    }
  );
};

module.exports = sendMessageToKafka;
