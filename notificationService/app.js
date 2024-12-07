require("dotenv").config();
const express = require("express");
const kafkaConsumer = require("./kafkaConsumer");

const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
