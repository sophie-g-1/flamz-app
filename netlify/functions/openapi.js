import dotenv from "dotenv";
dotenv.config();

export async function handler(event, context) {
  const apiKey = process.env.OPENAI_API_KEY;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: event.body }],
    }),
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
