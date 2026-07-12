import { createClient } from "../../../lib/supabase/server";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import { runReview } from "../../../hooks/ai";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mode, prompt, language } = await req.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    let systemPrompt: string;
    let userContent: string;

    if (mode === "url") {
      if (!prompt.includes("github.com")) {
        return NextResponse.json(
          { error: "Invalid GitHub URL" },
          { status: 400 },
        );
      }

      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

      const urlParts = prompt.replace(/\/$/, "").split("/");
      const repoIndex = urlParts.indexOf("github.com");
      const owner = urlParts[repoIndex + 1];
      const repo = urlParts[repoIndex + 2];

      if (!owner || !repo) {
        return NextResponse.json(
          { error: "Invalid GitHub URL" },
          { status: 400 },
        );
      }

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
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    const { result, provider } = await runReview(systemPrompt, userContent);

    const entryName =
      mode === "url"
        ? prompt.split("/").pop() || "Repository"
        : prompt.substring(0, 30) + "...";

    const { error: insertError } = await supabase.from("history").insert([
      {
        user_id: user.id,
        name: entryName,
        url: mode === "url" ? prompt : null,
        result,
      },
    ]);

    if (insertError) {
      console.error("History insert error:", insertError);
    }

    return NextResponse.json({ result, provider });
  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json(
      {
        error: "Analysis failed",
        details: error.message || String(error),
      },
      { status: 500 },
    );
  }
}
