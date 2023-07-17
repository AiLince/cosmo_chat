const submit = document.querySelector('#submit');
const chatComment = document.querySelector('#chatComment');
const checkboxYes = document.querySelector("#yes");

const FIOInput = document.querySelector('#FIO');
const commentInput = document.querySelector('#comment');

FIOInput.addEventListener('input', function() {
    this.value = this.value.replace(/(^|\s)\S/g, function(a) { return a.toUpperCase() });
    this.value = this.value.replace('  ', ' ');
});

commentInput.addEventListener('input', function() {
    this.value = this.value.replace(/viagra/i, '***');
    this.value = this.value.replace(/XXX/i, '***');
});

submit.addEventListener('click', () => {
    let avatar = document.querySelector('#avatar-link').value;
    const defaultAvatar = ["images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png", "images/7.png", "images/8.png", "images/9.png", "images/10.png"];
    if (document.querySelector('#avatar-link').value !== "") {
        avatar = avatar;
    } else {
        let any = defaultAvatar[Math.floor(Math.random() * defaultAvatar.length)];
        avatar = any;
    }

    let date = new Date();
    let formattedDate = formatDate(date);

    if (FIOInput.value !== "" && checkboxYes.checked) {
        const message = `<img src=${avatar} width="70">` + '<br>' + FIOInput.value + ':' + '<br>' + commentInput.value + '<br>' + formattedDate + '<br>' + `<button class="delete-btn" onclick="deleteMessage(this)">Удалить</button>` + '<br>' + '<br>';
        chatComment.insertAdjacentHTML('beforeend', message);
        saveMessageToLocalstorage(message);
    } else {
        const message = `<img src=${avatar} width="70">` + '<br>' + 'Username' + ':' + '<br>' + commentInput.value + '<br>' + formattedDate + '<br>' + `<button class="delete-btn" onclick="deleteMessage(this)">Удалить</button>` + '<br>' + '<br>';
        chatComment.insertAdjacentHTML('beforeend', message);
        saveMessageToLocalstorage(message);
    }

    commentInput.value = '';
});

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function saveMessageToLocalstorage(message) {
    let messages = localStorage.getItem('messages');

    if (messages) {
        messages = JSON.parse(messages);
        messages.push(message);
    } else {
        messages = [message];
    }

    localStorage.setItem('messages', JSON.stringify(messages));
}

function deleteMessage(button) {
    const messageElement = button.parentNode;
    const index = Array.from(chatComment.children).indexOf(messageElement);
    let messages = localStorage.getItem('messages');

    if (messages) {
        messages = JSON.parse(messages);
        messages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        reloadMessages();
    }
}

function reloadMessages() {
    chatComment.innerHTML = '';

    let messages = localStorage.getItem('messages');

    if (messages) {
        messages = JSON.parse(messages);

        messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.innerHTML = message;
            chatComment.appendChild(messageElement);
        });
    }
}

commentInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit.click();
    }
});

window.addEventListener('DOMContentLoaded', reloadMessages);