import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GptService {
  private readonly apiKey = process.env.OPEN_AI_KEY!;
  private readonly gptApiInstance : string = process.env.OPEN_AI_LINK!

  async askGpt(prompt: string): Promise<string> {
    const response = await axios.post(
      this.gptApiInstance,
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.choices[0].message.content.trim();
  }
}
