import OpenAI from "openai";

const openai = new OpenAI();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { text }: { text: string } = await req.json();

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
    });

    return new Response(mp3.body, {
        headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "attachment; filename=speech.mp3",
        },
    });
}