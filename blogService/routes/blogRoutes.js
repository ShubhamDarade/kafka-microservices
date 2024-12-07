const express = require("express");
const Blog = require("../models/blog");
const sendMessageToKafka = require("../kafkaProducer");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newBlogPost = await Blog.create({ title, content, author });

    sendMessageToKafka({
      blogId: newBlogPost._id,
      title: newBlogPost.title,
      author: newBlogPost.author,
    });

    res
      .status(201)
      .json({ message: "Blog post created successfully", blog: newBlogPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog post", error });
  }
});

module.exports = router;
