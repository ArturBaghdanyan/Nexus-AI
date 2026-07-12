import { createClient } from "../../../lib/supabase/server";
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

async function runAnalysis(
  mode: "url" | "code",
  input: string,
  language: string,
) {
  const prompt =
    mode === "url"
      ? `Analyze the repository at ${input}. Summarize its structure, quality, and any issues. Respond in ${language}.`
      : `Review this code for bugs, style, and improvements. Respond in ${language}:\n\n${input}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  return textBlock?.type === "text" ? textBlock.text : "";
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const { mode, input, language } = body ?? {};

  if (!mode || !input || (mode !== "url" && mode !== "code")) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  let result: string;
  try {
    result = await runAnalysis(mode, input, language ?? "English");
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }

  const { error: insertError } = await supabase.from("history").insert([
    {
      user_id: user.id,
      name: input.split("/").pop() || input,
      url: mode === "url" ? input : null,
      result,
    },
  ]);

  if (insertError) {
    console.error("Error inserting history:", insertError);
    // Still return the result even if saving history failed
  }

  return NextResponse.json({ result });
}
