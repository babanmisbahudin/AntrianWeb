import { useState, useEffect } from "react";

export default function Kasir() {
  const [queue, setQueue] = useState(["K-101", "K-102", "K-103"]);
  const [current, setCurrent] = useState("-");
  const [loket, setLoket] = useState("-");
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
    const savedLoket = localStorage.getItem("loketKasir");
    setLoket(savedLoket || "-");
  }, []);

  const speak = (text, callback) => {
    const utter = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.lang === "id-ID") || voices[0];
    if (voice) utter.voice = voice;
    if (callback) utter.onend = callback;
    window.speechSynthesis.speak(utter);
  };

  const callNumber = (nomor) => {
    speak("Perhatian. Akan dipanggil.", () => {
      speak(`Nomor antrian ${nomor.replace("-", " ")}, silakan ke loket ${loket}`);
    });
  };

  const handleNext = () => {
    if (queue.length === 0) {
      alert("Antrian habis.");
      return;
    }

    const next = queue[0];
    setCurrent(next);
    setQueue(queue.slice(1));
    callNumber(next);
  };

  const handleRepeat = () => {
    if (current === "-") {
      alert("Belum ada nomor yang dipanggil.");
      return;
    }
    callNumber(current);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-300">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          💼 Kasir - Loket {loket}
        </h1>

        <div className="bg-green-100 border border-green-300 rounded-xl py-6 px-4 mb-6 text-center shadow-inner">
          <p className="text-sm text-gray-600 mb-1 uppercase">Sedang Dilayani</p>
          <p className="text-6xl font-bold text-green-800 tracking-widest">{current}</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-lg shadow-md transition"
          >
            ➕ Panggil Antrian Berikutnya
          </button>
          <button
            onClick={handleRepeat}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-xl text-sm shadow-inner"
          >
            🔁 Ulangi Panggilan
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 shadow-inner">
          <p className="text-sm font-semibold text-gray-600 mb-2">Antrian Selanjutnya:</p>
          {queue.length > 0 ? (
            <ul className="space-y-1">
              {queue.map((no, i) => (
                <li
                  key={i}
                  className="text-gray-800 font-mono text-sm bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100"
                >
                  {no}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm italic">Tidak ada antrian lagi.</p>
          )}
        </div>
      </div>
    </div>
  );
}
