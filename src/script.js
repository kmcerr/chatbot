// Get references to HTML elements
const chatOutput = document.getElementById( "chat-output" );
const chatInput = document.getElementById( "chat-input" );
const sendButton = document.getElementById( "send-button" );

sendButton.addEventListener( "click", async () => {
	const userMessage = chatInput.value;
	if (!userMessage) return;

	displayMessage( userMessage, "user" );
	chatInput.value = "";

	try {
		const response = await fetch( "/api/chat", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify( {message: userMessage} )
		} );
		const data = await response.json();
		displayMessage( data.reply, "bot" );
	} catch (error) {
		console.error( "Error:", error );
		displayMessage( "Sorry, something went wrong.", "bot" );
	}
} );

function displayMessage(message, sender) {
	const messageElement = document.createElement( "p" );
	messageElement.classList.add( sender === "user" ? "user-message" : "bot-message" );
	messageElement.textContent = message;
	chatOutput.appendChild( messageElement );
	chatOutput.scrollTop = chatOutput.scrollHeight;
}
