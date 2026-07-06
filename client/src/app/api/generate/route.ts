import { OpenAI } from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request Body:", body);

    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: body.prompt }],
    });

    return Response.json({ result: response.choices[0].message.content });
  } catch (error: any) {
    console.error("Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
