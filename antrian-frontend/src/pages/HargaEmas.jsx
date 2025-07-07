import { useEffect, useState } from "react"

export default function HargaEmas() {
  const [harga, setHarga] = useState(null)

  useEffect(() => {
    const dataDummy = {
      jual: 1095000,
      beli: 1050000,
      update: "2025-07-05 11:00 WIB",
    }
    setTimeout(() => setHarga(dataDummy), 500)
  }, [])

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-yellow-800 mb-4">Harga Emas Hari Ini</h1>

      {harga ? (
        <div className="bg-white shadow-md rounded-xl p-6 text-center w-full max-w-sm">
          <p className="text-sm text-gray-500 mb-2">Update: {harga.update}</p>
          <div className="text-xl mb-1">
            Harga Jual: <span className="text-green-700 font-semibold">Rp {harga.jual.toLocaleString()}</span>
          </div>
          <div className="text-xl">
            Harga Beli: <span className="text-red-700 font-semibold">Rp {harga.beli.toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <p>Memuat data harga emas...</p>
      )}
    </div>
  )
}
