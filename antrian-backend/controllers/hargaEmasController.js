const HargaEmas = require("../models/hargaEmas");

// Ambil semua harga emas
exports.getAllHarga = async (req, res) => {
  try {
    const data = await HargaEmas.find().sort({ berat: 1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil harga emas" });
  }
};

// Tambah data harga emas
exports.addHarga = async (req, res) => {
  const { berat, beli, buyback } = req.body;

  try {
    const newHarga = await HargaEmas.create({ berat, beli, buyback });
    res.status(201).json(newHarga);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal tambah harga emas" });
  }
};

// Update data harga emas (bisa untuk bulk atau satuan)
exports.updateHarga = async (req, res) => {
  const { _id, berat, beli, buyback } = req.body;

  try {
    const updated = await HargaEmas.findByIdAndUpdate(
      _id,
      { berat, beli, buyback },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal update harga emas" });
  }
};

// Hapus satu harga emas berdasarkan ID
exports.deleteHarga = async (req, res) => {
  try {
    await HargaEmas.findByIdAndDelete(req.params.id);
    res.json({ message: "Harga emas berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal hapus harga emas" });
  }
};
