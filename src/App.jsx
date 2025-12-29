import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const url = import.meta.env.VITE_API_URL
  async function handleSubmit() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input })
      });

      const text = await res.text();
      const parsed = JSON.parse(text);
      
      setData(parsed);
    } catch (err) {
      setError("Could not parse AI response.");
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "system-ui" }}>
      <h2>🧮 Math Solver: Personalized AI Teacher</h2>

      <textarea
        rows={3}
        placeholder="Enter any mathematics problem"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          borderRadius: 10,
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 12,
          padding: "10px 18px",
          fontSize: 16,
          borderRadius: 10,
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer"
        }}
      >
        {loading ? "Solving..." : "Solve"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 12 }}>{error}</p>
      )}

      {data && (
        <div style={{
          marginTop: 24,
          padding: 16,
          borderRadius: 12,
          background: "#f6f6f6"
        }}>
          <section style={{ marginBottom: 16 }}>
            <h3>📌 Problem Type</h3>
            <p style={{ fontSize: 16 }}>
              {data.problem_type || "N/A"}
            </p>
          </section>

          <section style={{ marginBottom: 16 }}>
            <h3>📝 Steps</h3>
            <ul style={{ fontSize: 15, paddingLeft: 18 }}>
              {(data.steps || []).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>✅ Final Answer</h3>
            <div style={{
              padding: "10px 12px",
              borderRadius: 8,
              background: "white",
              fontSize: 18,
              fontWeight: 600
            }}>
              {data.final_answer || "N/A"}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
