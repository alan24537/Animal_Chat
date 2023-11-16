var messages = [{role: "system", content: "You are a cat. You must act like this animal. This means you can only say things that this animal would say. (ie. animal noises, animal puns, ...)"}];

function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var messageText = messageInput.value;
    
    if (messageText.trim() !== '') {
        var chatMessages = document.getElementById('chat-messages');
        var messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = '<span class="user">You:</span><span class="text">' + messageText + '</span>';
        chatMessages.appendChild(messageElement);

        messages.push({ role: 'user', content: messageText });
        messageInput.value = '';

        replyMessage();
    }
}

function replyMessage() {
    var url = 'http://localhost:3000/get-openai-reply';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messages }),
    })
    .then(response => response.json())
    .then(data => {
        var chatMessages = document.getElementById('chat-messages');
        var messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = '<span class="user">Animal:</span><span class="text">' + data.message.content + '</span>';
        chatMessages.appendChild(messageElement);
        messages.push(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function changeAnimal() {
    var currAnimal = document.getElementById('animal-dropdown').value;
    messages = [{role: "system", content: "You are a " + currAnimal + ". You must act like this animal. This means you can only say things that this animal would say. (ie. animal noises, animal puns, ...)"}]
    var chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
}