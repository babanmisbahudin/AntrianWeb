const Queue = require("../models/queue");

// Inisialisasi jika belum ada
const initQueueIfNotExists = async () => {
  const existing = await Queue.findOne();
  if (!existing) {
    await Queue.create({ lastKasir: 0, lastPenaksir: 0 });
  }
};

// GET /queue - Ambil status antrian
exports.getQueueStatus = async (req, res) => {
  try {
    await initQueueIfNotExists();
    const queue = await Queue.findOne().select("-__v");
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: "Gagal ambil data antrian" });
  }
};

// POST /queue/reset - Reset antrian
exports.resetQueue = async (req, res) => {
  try {
    await initQueueIfNotExists();
    const queue = await Queue.findOne();
    queue.lastKasir = 0;
    queue.lastPenaksir = 0;
    await queue.save();

    res.json({ message: "Antrian berhasil direset", queue });
  } catch (err) {
    res.status(500).json({ message: "Gagal reset antrian" });
  }
};
