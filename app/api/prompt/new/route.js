import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req) => {
	const { userId, prompt, tag } = await req.json();

	try {
		await connectToDatabase();
		const newPrompt = new Prompt({ creator: userId, prompt, tag });

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), {
			status: 201,
		});
	} catch (error) {
        console.log(error);
        return new Response("Internal server error", { status: 500 });
    }
};
