const kafka = require("kafka-node");
const nodemailer = require("nodemailer");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

const consumer = new kafka.Consumer(
  client,
  [{ topic: "new_blog_post", partition: 0 }],
  { autoCommit: true }
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

const sendNotificationEmail = (blogPost) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: process.env.SMTP_TO_EMAIL,
    subject: `New Blog Post: ${blogPost.title}`,
    text: `A new blog post titled "${blogPost.title}" has been published by ${blogPost.author}.\n\nCheck it out!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

consumer.on("message", (message) => {
  console.log("New blog post received from Kafka:", message.value);

  const blogPost = JSON.parse(message.value);

  sendNotificationEmail(blogPost);
});

consumer.on("error", (err) => {
  console.error("Error in Kafka Consumer:", err);
});
