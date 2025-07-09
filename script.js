document.getElementById("chat-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Stop page from reloading

  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  addMessage("You", userInput);
  document.getElementById("user-input").value = "";

  simulateTyping();

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_input: userInput,
        victim_name: victimName,
        insult: insult
      })
    });

    const data = await response.json();
    removeTyping();

    const reply =
      (data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content) ||
      `${victimName}GPT glitched. ${victimName} probably unplugged the internet.`;

    addMessage(`${victimName}GPT 🤖`, reply);
  } catch (error) {
    console.error("Proxy error:", error);
    removeTyping();
    addMessage(`${victimName}GPT 🤖`, `Oops! Something broke. Maybe blame ${victimName}.`);
  }
});

function addMessage(sender, message) {
  const chatbox = document.getElementById("chatbox");
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function simulateTyping() {
  const chatbox = document.getElementById("chatbox");
  const typing = document.createElement("div");
  typing.id = "typing";
  typing.className = "message";
  typing.innerHTML = `<em>${victimName}GPT is typing...</em>`;
  chatbox.appendChild(typing);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}
