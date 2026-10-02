console.log("AI Chat Limit Tracker is running!");

const hostname = window.location.hostname;

let service = "unknown";

if (hostname.includes("chatgpt.com")) {
    service = "chatgpt";
    console.log("ChatGPT detected");
}

if (hostname.includes("claude.ai")) {
    service = "claude";
    console.log("Claude detected");
}

const limitKeywords = [
    "limit reached",
    "usage limit",
    "message limit",
    "rate limit",
    "try again later",
    "you've reached"
];

let popupShown = false;
let popupCancelled = false;

function showLimitPopup() {
    console.log("SHOWING LIMIT POPUP");
    
    if (popupShown) {
        return;
    }

    popupShown = true;

    const popup = document.createElement("div");
    popup.className = "ai-limit-tracker-popup";

    popup.innerHTML = `
        <h3>⚠️ Chat limit reached</h3>
        <p>Your conversation may no longer accept messages.</p>

        <button class="ai-limit-copy">
            Copy Summary
        </button>

        <button class="ai-limit-new">
            New Chat
        </button>

        <button class="ai-limit-cancel">
            Cancel
        </button>
    `;

    document.body.appendChild(popup);

    popup.querySelector(".ai-limit-cancel").onclick = () => {
        popup.remove();
        popupShown = false;
        popupCancelled = true;
    };

    popup.querySelector(".ai-limit-copy").addEventListener("click", () => {
        alert("Summary feature coming next!");
    });

    popup.querySelector(".ai-limit-new").addEventListener("click", () => {
        if (service === "chatgpt") {
            window.location.href = "https://chatgpt.com/";
        }

        if (service === "claude") {
            window.location.href = "https://claude.ai/new";
        }
    });
}

function checkForLimit() {
    const pageText = document.body.innerText.toLowerCase();

    if (popupCancelled) {
        return false;
    }
    
    for (const keyword of limitKeywords) {
        if (pageText.includes(keyword)) {
            console.log("LIMIT DETECTED:", keyword);
            showLimitPopup();
            return true;
        }
    }

    return false;
}

const observer = new MutationObserver(() => {
    checkForLimit();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

checkForLimit();