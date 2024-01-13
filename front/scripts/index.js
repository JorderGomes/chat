const socket = new WebSocket('ws://localhost:8080/connect');
const Client = Stomp.over(socket);

const newMessageForm = document.getElementById("new-message-form");
 newMessageForm.addEventListener("submit", function (e) {
     e.preventDefault();
     sendMessage();
    //  const message = document.getElementById("message").value;
    //  document.getElementById("message").value = '';
    //  const name = localStorage.getItem('user') !== null ? localStorage.getItem('user') : 'nome';
    //  const dat eTimeNow = new Dat e();
    //  append Message(message, name, formatDat e(dat eTimeNow));
 });

function formatDate(date) {
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const hora = date.getHours();
    const minutos = date.getMinutes();
    
    return `${dia}/${mes} ${hora}:${minutos}`;
}

function sendMessage() {
    // e.preventDefault();
    const messageText = document.getElementById("message").value;
    document.getElementById("message").value = "";
    const name = localStorage.getItem('user') !== null ? localStorage.getItem('user') : 'nome';
    const dateTimeNow = formatDate(new Date());

    const message = {
        user: name,
        msg: messageText,
        time: dateTimeNow
    };

    Client.send("/app/chatmessage", {}, JSON.stringify(message));

}


function appendMessage(message, name, timeStr){
    console.log(`${name}: ${message}, ${timeStr}`);
    const user = localStorage.getItem('user');
    
    const msg = document.createElement('div');
    msg.classList.add(
        'flex-shrink-1', 
        name === user ? 'text-right' : 'text-left',
        'rounded', 'py-2', 'px-3', 
        name === user ? 'mr-3' : 'ml-3',
        );
    
    const person = document.createElement('div');
    person.classList.add('font-weight-bold', 'mb-1');
    person.innerHTML = name;

    const messageText = document.createTextNode(message);
    
    msg.appendChild(person);
    msg.appendChild(messageText);

    const time = document.createElement('div');
    time.classList.add('text-muted', 'small', 'text-nowrap', 'mt-2');
    time.innerHTML = timeStr;
    const timeWrap = document.createElement('div');
    timeWrap.appendChild(time);

    const messageCard = document.createElement('div');

    messageCard.classList.add( 
        name === user ? 'chat-message-right' : 'chat-message-left', 
        'rounded',
        'pb-4'
        );

    messageCard.appendChild(time);
    messageCard.appendChild(msg);

    const renderMessages = document.getElementById('render-messages');
    renderMessages.appendChild(messageCard);
}

function connect(){
    Client.connect({}, function (frame) {
        console.log('Conectado: ' + frame);


        Client.subscribe('/chat', function (message) {
            const chatMessage = JSON.parse(message.body);
            console.log(chatMessage);
            appendMessage(chatMessage.msg, chatMessage.user, chatMessage.time);
        });
    });
}


connect();
