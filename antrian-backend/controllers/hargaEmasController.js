const HargaEmas = require("../models/hargaEmas");

// Tambah atau update harga emas per berat
exports.upsertHarga = async (req, res) => {
  const { berat, beli, buyback } = req.body;

  try {
    const existing = await HargaEmas.findOne({ berat });

    if (existing) {
      existing.beli = beli;
      existing.buyback = buyback;
      await existing.save();
      return res.json(existing);
    }

    const newHarga = await HargaEmas.create({ berat, beli, buyback });
    res.status(201).json(newHarga);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal simpan harga emas" });
  }
};

// Ambil semua harga emas
exports.getHarga = async (req, res) => {
  try {
    const data = await HargaEmas.find().sort({ berat: 1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil harga emas" });
  }
};
