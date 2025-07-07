const Antrian = require("../models/antrian");

// Tambah antrian baru
exports.tambahAntrian = async (req, res) => {
  const { loket, jenisLayanan } = req.body;

  try {
    const last = await Antrian.find().sort({ nomor: -1 }).limit(1);
    const lastNomor = last.length > 0 ? last[0].nomor : 0;

    const newAntrian = await Antrian.create({
      nomor: lastNomor + 1,
      loket,
      jenisLayanan,
    });

    res.status(201).json(newAntrian);
  } catch (err) {
    res.status(500).json({ message: "Gagal tambah antrian" });
  }
};

// Ambil semua antrian
exports.getAntrian = async (req, res) => {
  try {
    const data = await Antrian.find().sort({ nomor: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Gagal ambil data antrian" });
  }
};

// Reset semua antrian
exports.resetAntrian = async (req, res) => {
  try {
    await Antrian.deleteMany({});
    res.json({ message: "Antrian berhasil direset" });
  } catch (err) {
    res.status(500).json({ message: "Gagal reset antrian" });
  }
};

// Update status antrian
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Antrian.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Gagal update status" });
  }
};
