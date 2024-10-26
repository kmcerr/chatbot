// src/api/chat.js

export default async function handler(req, res) {
	if (req.method === "POST") {
		const userMessage = req.body.message;

		try {
			const response = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
				},
				body: JSON.stringify({
					model: "gpt-4",
					messages: [{ role: "user", content: userMessage }],
					max_tokens: 100
				})
			});

			const data = await response.json();
			res.status(200).json({ reply: data.choices[0].message.content });
		} catch (error) {
			console.error("Error fetching response:", error);
			res.status(500).json({ error: "Something went wrong" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
