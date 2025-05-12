let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speak_func = (input) => {
    let speak_inp = new SpeechSynthesisUtterance(input); // new is used to create an instance

    // speak_inp.rate=1; // speed of the speech
    //speak_inp.pitch=3;   // ye pitch control mota ya patla krta hai
    // speak_inp.volume=1; // volume case
    speak_inp.lang = 'en'; // THIS CHANGES ACCENT AND VOICE
    window.speechSynthesis.speak(speak_inp); // jo bhi bolna hai

}
window.onload = () => {
    greet();
}
const greet = () => {
    let date = new Date();
    let hours = date.getHours();
    console.log(hours);
    if (hours >= 0 && hours < 12) {
        speak_func("Good Morning Shikhar , How Can I help You Today");
    }
    else if (hours >= 12 && hours < 16) {
        speak_func("Good AfterNoon Shikhar, How Can I help You Today");
    }
    else {
        speak_func("Good Evening Shikhar, How Can I help You Today");
    }
}
const startVoiceInp = () => {
    if ('webkitSpeechRecognition' in window) {
        let recog = new webkitSpeechRecognition();
        recog.lang = 'en-US';
        recog.onresult = (event) => {
            let spoken_text = event.results[0][0].transcript;
            handleCommands(spoken_text.toLowerCase());
            box.classList.remove("btn-box");
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`;
        }
        recog.start();
    }
    else {
        alert("No Support Of Voice Input");
    }
}

btn.onclick = () => {
    box.classList.add("btn-box");
    btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
    startVoiceInp();
}

const handleCommands = (command) => {
    console.log(command);
    if (command.includes("hello") || command.includes("hey") || command.includes("hi")) {
        speak_func("Hello , How Can I help You");
    }
    else if (command.includes("who are you") || command.includes("developed") || command.includes("who")) {
        speak_func("I am An AI Virtual Assistant Developed By Shikhar");
    }
    else if (command.includes("Open Youtube") || command.includes("yt") || command.includes("youtube")) {
        speak_func("Opening... YouTube Now");
        window.open("https://www.youtube.com/");
    }
    else if (command.includes("Open Google") || command.includes("google") || command.includes("search")) {
        speak_func("Opening... Google Chrome Now");
        window.open("https://www.google.com/");
    }
    else if (command.includes("Open chatgpt") || command.includes("chatgpt")) {
        speak_func("Opening... ChatGpt Now");
        window.open("https://www.chat.openai.com/");
    }
    else if (command.includes("Open Leetcode") || command.includes("leetcode") || command.includes("lc") || command.includes("open lc")) {
        speak_func("Opening... LeetCode Now");
        window.open("https://www.leetcode.com/");
    }
    else if (command.includes("time") || command.includes("tell me time") || command.includes("what is the time now") 
        || command.includes("tell me day") || command.includes("tell me date") || command.includes("date") || command.includes("day")) {
        let time = new Date().toLocaleString(undefined, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric'
        });
        speak_func(time);
    }
    else {
        speak_func(`Here is What I found on Google Regarding ${command}`);
        window.open(`https://www.google.com/search?q=${command}`);
    }
}

const element = document.getElementById("typewriter");
const messages = ["Hello There !! ", "How can I help you with ?"];
let messageIndex = 0;
let charIndex = 0;

function typeMessage() {
    if (charIndex < messages[messageIndex].length) {
        element.textContent += messages[messageIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeMessage, 100); // typing speed
    } else {
        if (messageIndex < messages.length - 1) {
            setTimeout(() => {
                // Clear the text and move to next message
                element.textContent = "";
                charIndex = 0;
                messageIndex++;
                typeMessage();
            }, 1000); // pause before next message
        }
    }
}

typeMessage();
