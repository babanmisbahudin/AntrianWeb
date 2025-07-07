const Video = require("../models/video");

// Tambah video
exports.tambahVideo = async (req, res) => {
  const { title, link } = req.body;

  try {
    const newVideo = await Video.create({ title, link });
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: "Gagal tambah video" });
  }
};

// Ambil semua video
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ addedAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Gagal ambil daftar video" });
  }
};

// Hapus video
exports.hapusVideo = async (req, res) => {
  const { id } = req.params;

  try {
    await Video.findByIdAndDelete(id);
    res.json({ message: "Video berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus video" });
  }
};
