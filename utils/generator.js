// Minimal generator: creates a JS-only Next.js starter.

const allowedJSOnlyExts = new Set(['.js', '.json', '.css', '.md', '.gitignore', 'tailwind.config.js', 'postcss.config.js']);

function extFromPath(p) {
  const idx = p.lastIndexOf('.');
  return idx === -1 ? '' : p.slice(idx);
}

function extractDomain(text) {
  const t = (text || "").toLowerCase();
  if (t.includes("education") || t.includes("student") || t.includes("learn")) return "Education";
  if (t.includes("health") || t.includes("clinic")) return "Healthcare";
  if (t.includes("shop") || t.includes("ecom") || t.includes("commerce")) return "E-commerce";
  if (t.includes("chat") || t.includes("messag") || t.includes("social")) return "Social/Chat";
  return "Web Application";
}

function pickStack(text) {
  const t = (text || "").toLowerCase();
  const stack = {
    frontend: ["Next.js (React)"],
    styling: ["Tailwind CSS"],
    backend: [],
    database: [],
    auth: [],
    hosting: []
  };

  if (t.match(/\b(ai|ml|model|predict)\b/)) {
    stack.backend.push("Python (FastAPI) for ML-heavy components");
    stack.backend.push("Node.js as API gateway");
    stack.database.push("Postgres");
    stack.auth.push("Supabase/Auth0 (optional)");
  }

  if (t.match(/\b(ecom|payment|checkout|cart)\b/)) {
    stack.backend.push("Node.js (Express) or Next.js API routes");
    stack.database.push("Postgres");
    stack.auth.push("Stripe + Auth0 / Supabase");
    stack.hosting.push("Vercel + Render");
  }

  if (t.match(/\b(chat|realtime|socket)\b/)) {
    stack.backend.push("Node.js + Socket.IO (real-time)");
    stack.database.push("Redis (pub/sub) + Postgres");
  }

  // defaults
  if (!stack.backend.length) stack.backend.push("Node.js (Next.js API routes)");
  if (!stack.database.length) stack.database.push("SQLite (dev) / Postgres (prod)");
  if (!stack.auth.length) stack.auth.push("JWT-based auth / Supabase");
  if (!stack.hosting.length) stack.hosting.push("Vercel (frontend) and serverless APIs");

  // dedupe
  Object.keys(stack).forEach(k => stack[k] = Array.from(new Set(stack[k])));
  return stack;
}

function makeDFD(title) {
  return `DFD (high-level)
[User Browser] --> [Next.js Frontend (UI)]
  --> POST /api/generate --> [Generator API (this app)]
  --> returns files JSON
  --> Frontend (JSZip) -> downloads ZIP -> Developer runs locally

Generated Project runtime (example)
[User Browser] --> [Generated App (Next.js)]
  --> /api/* --> Backend or external services (DB, Auth, ML)
`;
}

function makeArchitecture(stack) {
  return `Architecture (advice)
Frontend: ${stack.frontend.join(" , ")}
Styling: ${stack.styling.join(" , ")}
Backend (recommended): ${stack.backend.join(" | ")}
Database (recommended): ${stack.database.join(" | ")}
Auth (recommended): ${stack.auth.join(" | ")}
Hosting (recommended): ${stack.hosting.join(" | ")}
`;
}

/* create JS-only starter files */
function createJSOnlyStarter({ projectName = "generated-project", summary = "", includeTailwind = true }) {
  const files = {};

  const pkg = {
    name: projectName.replace(/\s+/g, "-").toLowerCase(),
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev -p 3000",
      build: "next build",
      start: "next start -p 3000"
    },
    dependencies: {
      next: "13.5.6",
      react: "18.2.0",
      "react-dom": "18.2.0"
    }
  };

  if (includeTailwind) {
    pkg.devDependencies = {
      tailwindcss: "^3.5.5",
      postcss: "^8.4.23",
      autoprefixer: "^10.4.14"
    };
  }

  files["package.json"] = JSON.stringify(pkg, null, 2);

  files["README.md"] = `# ${projectName}

${summary}

This generated starter includes only JS/CSS/JSON/MD files to ensure it runs locally with Node.
Run:
1. npm install
2. npm run dev
Open http://localhost:3000
`;

  files[".gitignore"] = "node_modules\n.next\n.env.local\n";

  files["tailwind.config.js"] = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}","./components/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: []
};`;

  files["postcss.config.js"] = `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`;

  files["styles/globals.css"] = `@tailwind base;
@tailwind components;
@tailwind utilities;

html,body{padding:0;margin:0;font-family:Inter,system-ui;background:#f8fafc;color:#0f172a}
main{max-width:980px;margin:24px auto;padding:16px}
`;

  files["pages/_app.js"] = `import '../styles/globals.css'
export default function App({ Component, pageProps }) { return <Component {...pageProps} /> }`;

  files["components/Header.js"] = `export default function Header({ title = "${projectName}" }) {
  return (
    <header style={{padding:18, display:'flex', alignItems:'center', gap:12}}>
      <div style={{width:44,height:44,borderRadius:10,background:'linear-gradient(135deg,#2563eb,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>GP</div>
      <div>
        <div style={{fontSize:16,fontWeight:700}}>{title}</div>
        <div style={{fontSize:12,color:'#6b7280'}}>Generated Next.js Starter</div>
      </div>
    </header>
  );
}
`;

  files["pages/index.js"] = `import Header from "../components/Header";
export default function Home(){
  return (
    <>
      <Header title="${projectName}" />
      <main>
        <section style={{background:'#fff',padding:20,borderRadius:12,boxShadow:'0 6px 18px rgba(15,23,42,0.06)'}}>
          <h1 style={{fontSize:22,fontWeight:700}}>${projectName}</h1>
          <p style={{color:'#475569',marginTop:8}}>${summary}</p>
          <p style={{marginTop:12}}>This is a generated JS-only starter. Edit pages/index.js to continue.</p>
        </section>
      </main>
    </>
  );
}
`;

  files["pages/api/project.js"] = `export default function handler(req,res){
  res.status(200).json({ ok: true, message: "Demo generated project API", name: ${JSON.stringify(projectName)} });
}
`;

  files["WHY.md"] = `# Why these tools?

- Next.js — rapid React-based UI + built-in serverless API routes. Good for prototypes and production.
- Tailwind CSS — utility-first styling for consistent minimal design and rapid iteration.
- Node.js — runtime for the generated JS app.
- package.json scripts — standard for developer experience.

Each recommended non-JS tool (if present in tech_stack) is listed in ARCHITECTURE.md with reasons and how to add.
`;

  files["ARCHITECTURE.md"] = `# Architecture Notes

This generated starter is JS-only so it runs locally with Node.
If you want to add non-JS components (examples):
- Python FastAPI: place code in /recommended/backend_python and run in separate environment.
- Database: use Postgres in production; for quick local testing use SQLite or a hosted free tier.

See WHY.md for reasoning behind choices.
`;

  return files;
}

/* optional example non-JS sample files (text only) */
function createNonJSSamples({ idea } = {}) {
  const files = {};
  // sample Python FastAPI file
  files["recommended/backend_python/app.py"] =
`# Example FastAPI app (sample - text only)
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def read_root():
    return {"msg": "Hello from sample FastAPI (not runnable from this ZIP)"}  # Add real code locally
`;
  // sample Dockerfile reference
  files["recommended/Dockerfile.sample"] =
`# Sample Dockerfile (text only)
FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install fastapi uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
`;
  // sample Go main (text)
  files["recommended/backend_go/main.go"] =
`// Sample Go server (text only)
package main
import ("fmt"; "net/http")
func handler(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "Hello from sample Go") }
func main() { http.HandleFunc("/", handler); http.ListenAndServe(":8080", nil) }
`;
  return files;
}

// Keep only JS-friendly files unless includeNonJS is true
function sanitizeFiles(filesMap, includeNonJS = false) {
  const safe = {};
  for (const path in filesMap) {
    const ext = extFromPath(path);
    // allow tailwind/postcss config names explicitly
    const special = path.endsWith("tailwind.config.js") || path.endsWith("postcss.config.js");
    if (includeNonJS) {
      // allow everything (still returned as text) but keep extension as-is
      safe[path] = filesMap[path];
    } else {
      // include only allowed JS-only set
      // treat .js, .json, .css, .md, .gitignore and the specific config names allowed
      if (special || ['.js', '.json', '.css', '.md', '.gitignore'].includes(ext)) {
        safe[path] = filesMap[path];
      } else {
        // convert disallowed file into a markdown note
        const mdpath = path + ".md";
        safe[mdpath] = `> NOTE: the original file "${path}" was omitted because non-JS files are not included by default.\n\nIf you want to include sample non-JS files, enable the includeNonJS option when generating. See ARCHITECTURE.md for guidance.`;
      }
    }
  }
  return safe;
}

function generateModules(text, domain) {
  const t = (text || "").toLowerCase();
  const modules = [];

  // Core modules (always present)
  modules.push("User Interface (Frontend)");
  modules.push("API Routes & Backend Logic");
  modules.push("Database Schema & Models");

  // Domain-specific modules
  if (domain === "Education") {
    modules.push("Assignment Management");
    modules.push("Student Dashboard");
    modules.push("Teacher Portal");
    modules.push("Progress Tracking");
    modules.push("Feedback System");
  } else if (domain === "E-commerce") {
    modules.push("Product Catalog");
    modules.push("Shopping Cart");
    modules.push("Payment Processing");
    modules.push("Order Management");
    modules.push("User Profiles");
  } else if (domain === "Healthcare") {
    modules.push("Patient Management");
    modules.push("Appointment Scheduling");
    modules.push("Medical Records");
    modules.push("Doctor Dashboard");
  } else if (domain === "Social/Chat") {
    modules.push("Real-time Messaging");
    modules.push("User Profiles");
    modules.push("Friend/Connection System");
    modules.push("Notification System");
  } else {
    // Generic web app modules
    modules.push("User Management");
    modules.push("Content Management");
    modules.push("Settings & Configuration");
  }

  // Feature-based modules
  if (t.match(/\b(auth|login|signup|register)\b/)) {
    modules.push("Authentication & Authorization");
  }
  if (t.match(/\b(ai|ml|model|predict)\b/)) {
    modules.push("AI/ML Integration");
    modules.push("Data Processing Pipeline");
  }
  if (t.match(/\b(notification|email|sms)\b/)) {
    modules.push("Notification Service");
  }
  if (t.match(/\b(search|filter|sort)\b/)) {
    modules.push("Search & Filtering");
  }
  if (t.match(/\b(upload|file|image)\b/)) {
    modules.push("File Upload & Management");
  }
  if (t.match(/\b(payment|stripe|checkout)\b/)) {
    modules.push("Payment Gateway Integration");
  }
  if (t.match(/\b(report|analytics|dashboard)\b/)) {
    modules.push("Analytics & Reporting");
  }

  // Always add security and deployment
  modules.push("Security & Validation");
  modules.push("Deployment Configuration");

  return modules;
}

export function generateFromIdea({ idea = "", includeNonJS = false } = {}) {
  const cleaned = (idea || "").trim();
  const domain = extractDomain(cleaned);
  const stack = pickStack(cleaned);
  const title = `${domain} — ${cleaned.split(".")[0].slice(0, 48)}`;
  const summary = `Generated from: "${cleaned}"`;

  const logic = [
    `1) parse idea and determine domain (${domain})`,
    `2) recommend tech stack (advice): frontend, styling, backend, DB, auth, hosting`,
    `3) create JS-only starter files (Next.js + Tailwind) as runnable ZIP`,
    `4) include WHY.md and ARCHITECTURE.md describing choices and how to extend`,
    `5) if includeNonJS=true, add sample non-JS files under /recommended (text-only)`
  ].join("\n");

  const folder_structure = `
/ (project root)
├─ package.json
├─ README.md
├─ pages/
│  ├─ _app.js
│  ├─ index.js
│  └─ api/
│     └─ project.js
├─ components/
│  └─ Header.js
├─ styles/
│  └─ globals.css
├─ WHY.md
├─ ARCHITECTURE.md
`;

  const dfd = makeDFD(title);
  const architecture = makeArchitecture(stack);
  
  // Generate modules
  const modules = generateModules(cleaned, domain);

  // base JS-only files
  const baseFiles = createJSOnlyStarter({ projectName: title, summary, includeTailwind: true });

  // optionally non-JS samples
  const nonJsFiles = includeNonJS ? createNonJSSamples({ idea: cleaned }) : {};

  // combine
  const all = { ...baseFiles, ...nonJsFiles };

  // sanitize according to includeNonJS flag
  const files = sanitizeFiles(all, includeNonJS);

  // tech_stack as flattened array for UI
  const techStackFlat = [
    ...stack.frontend, ...stack.styling, ...stack.backend, ...stack.database, ...stack.auth, ...stack.hosting
  ].filter(Boolean);

  return {
    title,
    summary,
    logic,
    tech_stack: techStackFlat,
    modules,
    folder_structure,
    dfd,
    architecture,
    files
  };
}

