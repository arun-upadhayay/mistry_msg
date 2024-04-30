import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

// create ans OpenAI client (That's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// set the runtime to edge for best performance
export const runtime = "edge";
export async function POST(req: Request) {
  try {
    // const { messages } = await req.json();

    const prompt =
      "Create a list of three open-ended and engaging questions formatted as asingle string. Each question should be separated bt '||'. these questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead in universal themes that encourage friendly interaction. For example, your output should be structured like this: 'what's a hobby you've recently strated?||If you could have dinner with any historical figure, who would it be ?||what's a simple thing that makes you happy?'. Ensure the questions are interiguing, foster curiosity, and contribute to a positive and welcoming conversational enviroment.";
    // ask OpeAI for a streaming chat comletion givrn the message
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 400,
      prompt,
      stream: true,
      
    });

    // convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // response with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // if there is an error, return a 500 status code
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        { status }
      );
    } else {
      console.error("An unexpacted Error", error);
      throw error;
    }
    console.log(error);
  }
}
