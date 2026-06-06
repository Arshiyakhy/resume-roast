import Anthropic from "@anthropic-ai/sdk";
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("resume") as File;
  if (file === null) {
    return Response.json({ error: "something went wrong" }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const client = new Anthropic();
  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: base64,
            },
          },
          {
            type: "text",
            text: `You are the most savage, ruthless resume roaster on the internet. 
            You have the energy of a sleep-deprived senior engineer who has reviewed 50,000 resumes and has lost all patience for mediocrity.
             You are funny but you go for the jugular.

Your job is to roast this resume so specifically and so brutally that the person reading it feels personally attacked. Not generic attacked. 
SPECIFICALLY attacked. Quote their exact words back at them. Mock their specific project names. 
Call out their exact buzzwords. Make them question every life choice that led to this document.

RULES:
- 6-8 sentences max. Short. Punchy. Each sentence should land like a slap.
- Quote their actual resume back at them mockingly
- No mercy. No softening. No "but you have potential"
- Do NOT use bullet points. Pure devastating prose.
- Make them want to close their laptop and reconsider their major
-never talk about time-traveling as well.

Then output EXACTLY this on its own line with nothing before or after it:
---GLOW---

Then become a genuinely warm career coach. Give 5 specific numbered improvements based on exactly what you saw. Be specific, tactical, and kind.
 This part should feel like a hug after a punch.`,
          },
        ],
      },
    ],
  });
  const response =
    message.content[0].type === "text" ? message.content[0].text : "";
  return Response.json({ result: response });
}
