// Simple placeholder AI that echoes the user's message with a silly prefix.
// Replace this with actual API calls if you have access to a backend.

const chatForm = document.getElementById('chat-form');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');

function appendMessage(sender, text) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerText = `${sender}: ${text}`;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('You', text);
    userInput.value = '';

    // Simple simulated AI response
    const replies = [
        "Haha that's silly!",
        "Classic Amogh move!",
        "You might be sillier than Amogh.",
        "Are you sure about that?",
        "Amogh would approve!"
    ];
    setTimeout(() => {
        const reply = replies[Math.floor(Math.random() * replies.length)];
        appendMessage('AmoghAI', `${reply} You said: ${text}`);
    }, 500);
});
