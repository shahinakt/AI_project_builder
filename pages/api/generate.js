import { generateFromIdea } from "../../utils/generator";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { idea = "", includeNonJS = false } = req.body || {};
    const cleaned = (idea || "").trim();
    if (!cleaned) return res.status(400).json({ error: "Idea (text) is required in the request body." });

    const payload = generateFromIdea({ idea: cleaned, includeNonJS: !!includeNonJS });

    return res.status(200).json(payload);
  } catch (err) {
    console.error("generate error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
