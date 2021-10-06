const socket=io('http://localhost:3000');
console.log("0")
const form=document.getElementById('send-container');

const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})
let name=prompt("enter your name to join");
console.log(name)
socket.emit('new-user-joined',name);
socket.on('user-joined',name=>{
    append(`${name}  joined the chat`,'right')
})
socket.on('receive',data=>{
    //console.log(data)
    append(`${data.name}:${data.message}`,'left')
})