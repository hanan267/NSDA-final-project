const express = require('express');
const router = express.Router();

// 🔹 Import your authentication middleware
const authMiddleWare = require('../middleWare/authMiddleWare'); // adjust the path if your folder is named differently

router.get("/all-questions", authMiddleWare, (req, res) => {
   res.send("all question")
})

module.exports = router