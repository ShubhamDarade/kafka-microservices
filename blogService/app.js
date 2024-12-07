require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Blog service running on port ${PORT}`);
});

// .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
// .\bin\windows\kafka-server-start.bat .\config\server.properties

// .\bin\windows\kafka-topics.bat --create --topic test-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
// .\bin\windows\kafka-console-producer.bat --topic test-topic --bootstrap-server localhost:9092
// .\bin\windows\kafka-console-consumer.bat --topic test-topic --from-beginning --bootstrap-server localhost:9092
