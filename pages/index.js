import { useState } from "react";
import JSZip from "jszip";
import Header from "../components/Header";
import ResultCard from "../components/ResultCard";
import AnimatedButton from "../components/AnimatedButton";
import Footer from "../components/Footer";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [includeNonJS, setIncludeNonJS] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleGenerate() {
    if (!idea.trim()) return alert("Please enter a project idea.");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, includeNonJS })
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setResult(json);
      setTimeout(() => window.scrollTo({ top: 700, behavior: "smooth" }), 200);
    } catch (err) {
      alert("Generate failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function downloadZip() {
    if (!result || !result.files) return;
    const zip = new JSZip();
    for (const path in result.files) {
      zip.file(path, result.files[path]);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (result.title || "project").replace(/\s+/g, "_") + "_mvp.zip";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Header title="AI Project Builder — Minimal & Professional" />
      <main className="container px-6 py-10 flex-1">
        <section className="card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Build a starter from your idea</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Paste a one-paragraph idea. The app returns a project logic, tech recommendations, DFD & architecture,
            and a runnable JS-only starter ZIP. Enable "Include non-JS sample files" to also include text samples for other languages.
          </p>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project idea</label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-xl border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm p-3 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-400 transition-colors duration-200"
            placeholder="Example: A web app where teachers upload assignments, students submit, and receive AI-style feedback. Small MVP with auth and progress tracking."
          />

          <div className="mt-4 flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input 
                type="checkbox" 
                checked={includeNonJS} 
                onChange={(e)=>setIncludeNonJS(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
              <span>Include non-JS sample files (text only)</span>
            </label>

            <div className="ml-auto">
              <AnimatedButton onClick={handleGenerate}>
                {loading ? "Generating..." : "Generate Project"}
              </AnimatedButton>
            </div>
          </div>
        </section>

        {result && (
          <>
            {/* Generate Again / Clear Results Section */}
            <section className="card p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    ✅ Project Generated Successfully!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Want to generate another project or modify this one?
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setResult(null);
                      setIdea("");
                      setIncludeNonJS(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Start New Project
                  </button>
                  <AnimatedButton 
                    onClick={handleGenerate}
                    className="text-sm"
                  >
                    {loading ? "Generating..." : "Generate Again"}
                  </AnimatedButton>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <ResultCard title={result.title}>
                <p className="text-sm text-gray-500 dark:text-gray-400">{result.summary}</p>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Logic</h4>
                  <pre className="pre mt-2">{result.logic}</pre>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Folder Structure</h4>
                  <pre className="pre mt-2">{result.folder_structure}</pre>
                </div>
              </ResultCard>

              <ResultCard title="DFD & Architecture">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">DFD</h4>
                <pre className="pre mt-2">{result.dfd}</pre>
                <h4 className="font-medium mt-4 text-gray-900 dark:text-gray-100">Architecture</h4>
                <pre className="pre mt-2">{result.architecture}</pre>
              </ResultCard>
            </div>

            <div className="space-y-4">
              <ResultCard title="Tech Stack">
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                  {result.tech_stack.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </ResultCard>

              <ResultCard title={`Modules Overview (${result.modules?.length || 0})`}>
                <div className="text-sm">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Total modules: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{result.modules?.length || 0}</span>
                  </p>
                  <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {result.modules?.map((module, i) => (
                      <li key={i} className="text-sm">
                        {module}
                      </li>
                    ))}
                  </ol>
                </div>
              </ResultCard>

              <ResultCard title="Files (preview)">
                <div className="text-sm">
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {Object.keys(result.files).map(p => <li key={p} className="break-all text-xs">{p}</li>)}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <button onClick={downloadZip} className="flex-1 bg-brand-500 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 whitespace-nowrap text-sm">Download ZIP</button>
                    <button onClick={()=>navigator.clipboard.writeText(JSON.stringify(result, null, 2))} className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg py-2 transition-colors duration-200 whitespace-nowrap text-sm">Copy JSON</button>
                  </div>
                </div>
              </ResultCard>
            </div>
          </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
