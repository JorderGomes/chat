function openPopup() {
    const user = localStorage.getItem("user"); 
    if (user !== null) {
        console.log(`Já tenho o usuário: ${user}`);
        openChat();
    } else {
        console.log("não tem usuário");
        const popup = document.getElementById("popup");
        popup.classList.remove("hidden");
    }
}

function openChat() {
    const popup = document.getElementById("popup");
    const chatContainer = document.getElementById("chatContainer");
    const usernameInput = document.getElementById("usernameInput").value;
    const user = localStorage.getItem("user"); 
    const usernamespan = document.getElementById("username");

    if (usernameInput !== "" || user !== null) {
        popup.style.display = "none";
        chatContainer.classList.remove("hidden");
        usernamespan.innerHTML = user;
        localStorage.setItem("user", usernameInput === "" ? user : usernameInput );
    } else {
        alert("Digite um nome válido!");
    }
}

openPopup();
