let waitingForCryptoChoice = false;
let whatCrypto = "";

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

function sendMessage(event) {
    if (event.key === "Enter") {
        const userMessage = document.getElementById("user-input").value;
        if (userMessage.trim() === "") return;

        const chatlogs = document.getElementById("chatlogs");

        const userChatContainer = document.createElement("div");
        userChatContainer.className = "chat";
        userChatContainer.innerHTML = '<span class="user-label">You: </span> ' + userMessage;
        chatlogs.appendChild(userChatContainer);

        playSound("userSound"); 

        chatlogs.scrollTop = chatlogs.scrollHeight;

        document.getElementById("user-input").value = "";

        let botResponse;
        const lowerCaseUserMessage = userMessage.toLowerCase();

        if (lowerCaseUserMessage.includes("hello") || lowerCaseUserMessage.includes("hi") || lowerCaseUserMessage.includes("sup") || lowerCaseUserMessage.includes("yuri") )  {
            botResponse = "Yuri: Ack | zdarova";
        } else if (lowerCaseUserMessage.includes("Wdyh") || lowerCaseUserMessage.includes("smss")) {
            botResponse = "Yuri: Ack | I Have : 1. Green Grass | 2. White Cockinom | 3. Blue Viagra | 4. Green Medical Kanabis. #### Enter The Number OR The Name with the color!";
        } else if (lowerCaseUserMessage.includes("pic 1") || lowerCaseUserMessage.includes("pic Green Grass")) {
            const botImageContainer = document.createElement("div");
            botImageContainer.className = "chat bot";
            botImageContainer.innerHTML = 'Yuri: <img src="/images/grasspic.jpeg" alt="grass picture">';
            botResponse = botImageContainer;
        } else if (lowerCaseUserMessage.includes("prlpg") || lowerCaseUserMessage.includes("price list per gram")) {
            botResponse = "Yuri: Ack | Price List Per Gram:\n1 Gram Green Grass = 40 ILS\n1 Gram Cockinom = 470 ILS\n1 Blue Viagra = 130 ILS\n1 Green Medical Kanbis = 57 ILS";
        } else if (lowerCaseUserMessage.includes("os") || lowerCaseUserMessage.includes("order style")) {
            botResponse = `Yuri: Ack | The Order Style: You can pay for the product only by crypto (BTC, USDT, ETH, BNB). If you'd like to make an order, type "!Order", and you'll receive a crypto wallet address.`;
        } else if (lowerCaseUserMessage.includes("!order")) {
            botResponse = "Succeeded | Crypto wallet : $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ | Now, choose the crypto coin you would like to pay with (type the name, like: btc)";
            waitingForCryptoChoice = true;
        } else if (waitingForCryptoChoice) {
            if (["btc", "eth", "bnb", "usdt"].includes(lowerCaseUserMessage)) {
                whatCrypto = lowerCaseUserMessage;
                botResponse = `Yuri : Ack | You've chosen to pay with ${whatCrypto} cryptocurrency.`;
                waitingForCryptoChoice = false;
            } else {
                botResponse = "Yuri : Ack | Invalid cryptocurrency choice. Please choose from BTC, ETH, BNB, or USDT.";
            }
        } else {
            botResponse = "Yuri: It isn't metter for the convesetion.";
        }

        setTimeout(() => {
            const botMessage = document.createElement("div");
            botMessage.className = "chat bot";

            if (typeof botResponse === "string") {
                botMessage.textContent = botResponse;
            } else if (botResponse instanceof HTMLElement) {
                botMessage.appendChild(botResponse);
            }

            chatlogs.appendChild(botMessage);

            playSound("botSound"); 

            chatlogs.scrollTop = chatlogs.scrollHeight;
        }, 2000);
    }
}
