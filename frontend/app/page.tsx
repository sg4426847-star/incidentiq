"use client";
import { useState } from "react";

export default function Home() {
  const [incident, setIncident] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!incident.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incidentReport: incident }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-green-400">
          IncidentIQ
        </h1>
        <p className="text-center text-gray-400 mb-8">
          AI-Powered Incident Response & Post-Mortem System
        </p>

        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Paste your incident report or logs:
          </label>
          <textarea
            className="w-full h-40 bg-gray-800 text-white rounded-lg p-4 border border-gray-700 focus:border-green-400 focus:outline-none resize-none"
            placeholder="e.g. Users are getting 401 Unauthorized errors on the login page..."
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? "Analyzing..." : "Analyze Incident"}
          </button>
        </div>

        {result && !result.error && (
          <div className="space-y-4">
            {result.enkryptValidation && (
              <div className={`rounded-xl p-4 ${result.enkryptValidation.isSafe ? 'bg-green-900' : 'bg-red-900'}`}>
                <h3 className="font-bold mb-1">
                  🛡️ Enkrypt AI Safety Check
                </h3>
                <p className="text-sm">
                  Status: {result.enkryptValidation.isSafe ? '✅ Safe' : '❌ Unsafe'}
                </p>
                <p className="text-sm">
                  Score: {result.enkryptValidation.score}
                </p>
                <p className="text-sm">
                  {result.enkryptValidation.reason}
                </p>
              </div>
            )}

            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-bold text-green-400 mb-3">
                📋 Post-Mortem Report
              </h2>
              <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                {result.postMortemReport}
              </pre>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="bg-red-900 rounded-xl p-4 text-red-300">
            {result.error}
          </div>
        )}
      </div>
    </div>
  );
}