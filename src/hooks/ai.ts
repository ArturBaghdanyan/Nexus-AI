import { groq } from "./useGroq";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function runReview(systemPrompt: string, userContent: string) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("Groq returned an empty response");

    return { result: content, provider: "groq" as const };
  } catch (groqError) {
    console.error("Groq failed, falling back to Anthropic:", groqError);
  }

  // Fallback: Anthropic
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: `${systemPrompt}\n\n${userContent}` }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const content = textBlock?.type === "text" ? textBlock.text : null;
    if (!content) throw new Error("Anthropic returned an empty response");

    return { result: content, provider: "anthropic" as const };
  } catch (anthropicError) {
    console.error("Anthropic also failed:", anthropicError);
    throw new Error(
      "Both AI providers failed to generate a review. Check API keys and credit balances for Groq and Anthropic."
    );
  }
}