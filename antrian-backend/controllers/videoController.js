const Video = require("../models/video");

exports.createVideo = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "URL diperlukan" });

    const video = new Video({ url });
    await video.save();

    res.status(201).json(video);
  } catch (err) {
    console.error("Gagal tambah video:", err);
    res.status(500).json({ message: "Gagal tambah video" });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("Gagal ambil video:", err);
    res.status(500).json({ message: "Gagal ambil video" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Video.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Video tidak ditemukan" });
    res.json({ message: "Video berhasil dihapus" });
  } catch (err) {
    console.error("Gagal hapus video:", err);
    res.status(500).json({ message: "Gagal hapus video" });
  }
};
