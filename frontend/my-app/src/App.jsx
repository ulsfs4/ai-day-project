import { useState } from "react";

export default function App() {
  const [inputData, setInputData] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const send = async () => {
    if (loading) return;

    const text = inputData.trim();
    if (!text) return;

    setLoading(true);
    setError(false);
    setResult("");

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      setResult(data?.emotion ?? "unknown");
      setInputData("");
    } catch (err) {
      setError(true);
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2eef8] p-6">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[#4b4675]">
            how do you feel?
          </h1>
          <p className="text-xs tracking-widest uppercase text-[#7F77DD] mt-1">
            emotion detector
          </p>
        </div>

        <div className="flex items-center bg-white border border-[#AFA9EC] rounded-full px-5 py-2 focus-within:ring-5 focus-within:ring-[#bebaf233]">
          <input
            className="flex-1 outline-none bg-transparent text-sm text-[#3C3489]"
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="describe your feeling..."
          />

          <button
            onClick={send}
            className="w-9 h-9 bg-[#bcb9e6] rounded-full flex items-center justify-center hover:opacity-90 transition"
          >
            ➜
          </button>
        </div>

        <div className="min-h-[90px] flex flex-col items-center justify-center text-center rounded-xl border border-[#CECBF6] bg-gradient-to-br from-[#EEEDFE] to-[#f0ebfa] p-6">
          <p className="text-[10px] uppercase tracking-widest text-[#a5a0e2] mb-2">
            {loading ? "detecting..." : error ? "error" : "your emotion"}
          </p>

          {loading && (
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-[#AFA9EC] rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-[#AFA9EC] rounded-full animate-bounce delay-150" />
              <span className="w-2 h-2 bg-[#AFA9EC] rounded-full animate-bounce delay-300" />
            </div>
          )}

          {!loading && error && (
            <p className="text-[#f59e81] text-sm">could not connect</p>
          )}

          {!loading && !error && (
            <p className="text-2xl font-serif italic text-[#3C3489]">
              {result || "awaiting input..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
