import { useState } from "react";

export default function Satpam() {
  const [antrianCetak, setAntrianCetak] = useState(null);
  const [nomorKasir, setNomorKasir] = useState("K-101");
  const [nomorPenaksir, setNomorPenaksir] = useState("P-201");
  const [diprosesKasir, setDiprosesKasir] = useState("-");
  const [diprosesPenaksir, setDiprosesPenaksir] = useState("-");

  const formatNomor = (prefix, count) => {
    return `${prefix}-${count.toString().padStart(3, "0")}`;
  };

  const handleAmbilAntrian = (tujuan) => {
    let nomor = "";
    if (tujuan === "Kasir") {
      const next = parseInt(nomorKasir.split("-")[1]) + 1;
      nomor = formatNomor("K", next);
      setNomorKasir(nomor);
      setDiprosesKasir(nomor);
    } else {
      const next = parseInt(nomorPenaksir.split("-")[1]) + 1;
      nomor = formatNomor("P", next);
      setNomorPenaksir(nomor);
      setDiprosesPenaksir(nomor);
    }

    setAntrianCetak({ nomor, tujuan });
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8 print:hidden">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">Dashboard Satpam</h1>

        {/* Info Antrian Sedang Diproses */}
        <div className="mb-6 text-center">
          <p className="text-xs text-gray-500 mb-2 tracking-wide">Nomor Antrian Sedang Diproses</p>
          <div className="flex justify-center gap-6 text-sm">
            <div>
              <p className="text-gray-500">Kasir</p>
              <p className="text-base font-semibold text-blue-700">{diprosesKasir}</p>
            </div>
            <div>
              <p className="text-gray-500">Penaksir</p>
              <p className="text-base font-semibold text-green-700">{diprosesPenaksir}</p>
            </div>
          </div>
        </div>

        {/* Tombol Ambil Antrian */}
        <p className="text-center text-gray-600 mb-3">Ambil nomor antrian untuk layanan:</p>
        <div className="space-y-3">
          <button
            onClick={() => handleAmbilAntrian("Kasir")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 w-full rounded-lg transition"
          >
            Ambil Antrian ke Kasir
          </button>
          <button
            onClick={() => handleAmbilAntrian("Penaksir")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 w-full rounded-lg transition"
          >
            Ambil Antrian ke Penaksir
          </button>
        </div>
      </div>

      {/* Cetakan Struk */}
      {antrianCetak && (
        <div className="hidden print:block text-center p-12">
          <h2 className="text-3xl font-bold mb-2">Nomor Antrian</h2>
          <div className="text-7xl font-extrabold mb-2">{antrianCetak.nomor}</div>
          <p className="text-lg">Tujuan: {antrianCetak.tujuan}</p>
          <p className="text-sm text-gray-600 mt-4">Silakan tunggu panggilan Anda</p>
        </div>
      )}
    </div>
  );
}
