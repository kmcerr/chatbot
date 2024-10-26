// script.js

// Get references to HTML elements for the chatbot
const chatOutput = document.getElementById("chat-output");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

// Event listener for the send button
sendButton.addEventListener("click", async () => {
	const userMessage = chatInput.value;
	if (!userMessage) return;

	// Display user's message in the chat window
	displayMessage(userMessage, "user");

	// Clear the input field
	chatInput.value = "";

	// Fetch response from the serverless function
	try {
		const response = await fetch("/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: userMessage })
		});

		const data = await response.json();
		const botMessage = data.reply;

		// Display bot's response in the chat window
		displayMessage(botMessage, "bot");
	} catch (error) {
		console.error("Error:", error);
		displayMessage("Sorry, something went wrong. Please try again.", "bot");
	}
});

// Function to display messages in the chat window
function displayMessage(message, sender) {
	const messageElement = document.createElement("p");
	messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
	messageElement.textContent = message;
	chatOutput.appendChild(messageElement);
	chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom of the chat
}
