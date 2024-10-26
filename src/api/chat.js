export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { message } = req.body;
	try {
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
			},
			body: JSON.stringify({
				model: "gpt-4",
				messages: [{ role: "user", content: message }],
				max_tokens: 100
			})
		});
		const data = await response.json();
		res.status(200).json({ reply: data.choices[0].message.content });
	} catch (error) {
		console.error("Error fetching OpenAI response:", error);
		res.status(500).json({ error: "An error occurred" });
	}
}
