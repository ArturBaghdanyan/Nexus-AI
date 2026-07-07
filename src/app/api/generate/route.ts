import { Octokit } from "octokit";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  try {
    const { prompt, language } = await req.json();

    if (!prompt.includes("github.com")) {
      return Response.json({ error: "Invalid GitHub URL" }, { status: 400 });
    }

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const urlParts = prompt.replace(/\/$/, "").split("/");
    const repoIndex = urlParts.indexOf("github.com");
    const owner = urlParts[repoIndex + 1];
    const repo = urlParts[repoIndex + 2];

    console.log(`Fetching: ${owner}/${repo}`);

    const { data: contents } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "",
    });

    const fileNames = (Array.isArray(contents) ? contents : [contents])
      .map((file) => file.name)
      .join(", ");

    const systemPrompt = `Analyze the repository structure of ${repo}: ${fileNames}.
                          Provide a 0-10 score for Security, Performance, and Clean Code.
                          Respond in ${language}.`;

    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Review this repository: ${prompt}` },
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    return Response.json(
      {
        error: "Failed to analyze repository. Check your GitHub link or Token.",
      },
      { status: 500 },
    );
  }
}
