const express = require("express");
const router = express.Router();
const { createVideo, getAllVideos, deleteVideo } = require("../controllers/videoController");

router.get("/", getAllVideos);
router.post("/", createVideo);
router.delete("/:id", deleteVideo);

module.exports = router;
