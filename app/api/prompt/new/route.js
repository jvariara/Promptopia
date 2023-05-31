import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    // need to connect to db to post a prompt
    await connectToDB();
    // once connected, create a new prompt
    const newPrompt = new Prompt({ creater: userId, prompt, tag });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt.", { status: 500 });
  }
};
