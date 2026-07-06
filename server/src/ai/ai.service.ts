import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.GROQ_API_KEY, // Այստեղ կդնես Groq-ից ստացած բանալին
      baseURL: 'https://api.groq.com/openai/v1', // Սա է հիմնական տարբերությունը
    });
  }

  async generateResponse(prompt: string) {
    const response = await this.openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Groq-ի անվճար հզոր մոդելներից
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  }
}
