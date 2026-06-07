import fs from "fs";
import path from "path";
import { profileData } from "@/content/profile";
import { contact, thinking, writing, projects } from "@/content/site.config";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Read prompt from file
    let systemInstruction = "";
    try {
      const promptPath = path.join(process.cwd(), "src/content/copilot-prompt.md");
      systemInstruction = fs.readFileSync(promptPath, "utf-8");
    } catch (err) {
      console.error("Failed to read system prompt file, using fallback", err);
      systemInstruction = "You are Clancy's AI Twin. Help users learn about Clancy.";
    }

    // Format profile and config data to append to system instruction
    const profileText = JSON.stringify(profileData, null, 2);
    const siteConfigText = JSON.stringify({ contact, thinking, writing, projects }, null, 2);

    systemInstruction += `

## Clancy's Database (For reference)

### Profile Data:
\`\`\`json
${profileText}
\`\`\`

### Site Config & Project Data:
\`\`\`json
${siteConfigText}
\`\`\`
`;

    // Initialize Gemini AI
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is missing.");
      return Response.json({ error: "API key is not configured on the server." }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      }
    });

    // Format chat history for Gemini
    // Gemini history expects role: 'user' | 'model' and parts: [{ text: string }]
    const geminiHistory = messages.map((m: any) => {
      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      };
    });

    // We send all messages except the last one as history, and the last one as the main query
    const history = geminiHistory.slice(0, -1);
    const latestMessage = geminiHistory[geminiHistory.length - 1];

    if (!latestMessage) {
      return Response.json({ error: "No messages provided" }, { status: 400 });
    }

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessageStream(latestMessage.parts[0].text);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            controller.enqueue(encoder.encode(chunkText));
          }
          controller.close();
        } catch (error) {
          console.error("Stream generation error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (error: any) {
    console.error("API error:", error);
    return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
