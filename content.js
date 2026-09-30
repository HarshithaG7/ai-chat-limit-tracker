console.log("AI Chat Limit Tracker is running!");

const hostname = window.location.hostname;

if (hostname.includes("chatgpt.com")) {
    console.log("ChatGPT detected");
}

if (hostname.includes("claude.ai")) {
    console.log("Claude detected");
}