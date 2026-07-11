import { groq } from "@/src/hooks/useGroq";
import { Octokit } from "octokit";

export async function POST(req: Request) {
  try {
    const { mode, prompt, language } = await req.json();

    if (!prompt || !prompt.trim()) {
      return Response.json({ error: "No input provided" }, { status: 400 });
    }

    let systemPrompt: string;
    let userContent: string;

    if (mode === "url") {
      if (!prompt.includes("github.com")) {
        return Response.json({ error: "Invalid GitHub URL" }, { status: 400 });
      }

      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

      const urlParts = prompt.replace(/\/$/, "").split("/");
      const repoIndex = urlParts.indexOf("github.com");
      const owner = urlParts[repoIndex + 1];
      const repo = urlParts[repoIndex + 2];

      if (!owner || !repo) {
        return Response.json({ error: "Invalid GitHub URL" }, { status: 400 });
      }

      console.log(`Fetching: ${owner}/${repo}`);

      const { data: contents } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: "", 
      });

      if (!contents) throw new Error("Repository content not found");

      const fileNames = (Array.isArray(contents) ? contents : [contents])
        .map((file) => file.name)
        .join(", ");

      systemPrompt = `Analyze the repository structure of ${repo}: ${fileNames}.
                       Provide a 0-10 score for Security, Performance, and Clean Code.
                       Respond in ${language}.`;
      userContent = `Review this repository: ${prompt}`;
    } else if (mode === "code") {
      systemPrompt = `You are a senior software engineer reviewing a code snippet.
                       Analyze it for correctness, security, performance, and code quality.
                       Provide a 0-10 score for Security, Performance, and Clean Code.
                       Respond in ${language}.`;
      userContent = `Review this code:\n\n${prompt}`;
    } else {
      return Response.json({ error: "Invalid mode" }, { status: 400 });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    return Response.json(
      {
        error:
          "Failed to analyze input. Check your GitHub link, Token, or code.",
      },
      { status: 500 },
    );
  }
}
