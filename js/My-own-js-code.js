let startTime = null;
let running = false;
let entries = [];
let interval = null;

function toggleTimer() {
    const btn = document.getElementById("timerBtn");
    const status = document.getElementById("status");
    const live = document.getElementById("liveTimer");

    if (!running) {
        startTime = Date.now();
        running = true;

        btn.innerText = "Stop";
        status.innerText = "Timer running...";

        interval = setInterval(() => {
            const seconds = Math.floor((Date.now() - startTime) / 1000);
            live.innerText = formatTime(seconds);
        }, 1000);

        return; // early exit (?)
    }

    // STOP
    const duration = Math.floor((Date.now() - startTime) / 1000);

    clearInterval(interval);
    running = false;

    btn.innerText = "Start";
    status.innerText = "Not running";
    live.innerText = "00:00";

    const activity = prompt("What were you doing?")?.trim();

    if (activity) {
        entries.push({ activity, duration });
        displayEntries();
    }
}

function formatTime(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function displayEntries() {
    const container = document.getElementById("entriesList");
    container.innerHTML = entries.map(entry => `
        <div class="card p-3 mb-2 d-flex flex-row justify-content-between align-items-center">
            <span>${entry.activity}</span>
            <strong>${formatTime(entry.duration)}</strong>
        </div>
    `).join("");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}