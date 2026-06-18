let seconds = 120;
let speed = 1;
let attempts = 0;
let last = Date.now();

function setSpeed(v, btn) {
    speed = v;
    document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

function RNG() {

    attempts++;

    let roll = Math.floor(Math.random() * 50000) + 1;
    let now = new Date();
    let win = roll === 50000;

    // UPDATE LAST RESULT
    let result = document.getElementById("result");

    if (win) {
        result.innerHTML = "✨ EDEN SPAWNED ✨";
        result.style.color = "#66ff99";
    } else {
        result.innerHTML = "❌ FAILED";
        result.style.color = "#ff4d4d";
    }


    // CREATE LOG ROW
    let row = document.createElement("div");

    row.className = "log-row " + (win ? "log-success" : "log-fail");


    row.innerHTML = `

        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>

        <div>
            <b>${win ? "SPAWNED" : "FAILED"}</b>
            | Attempt #${attempts.toLocaleString()}
            | Roll: ${roll.toLocaleString()}
        </div>

        <div class="log-right">
            ${now.toLocaleTimeString()}
        </div>

    `;


    document.getElementById("log").prepend(row);

}

setInterval(() => {

    let now = Date.now();
    let delta = (now - last) / 1000;
    last = now;

    seconds -= delta * speed;

    if (seconds <= 0) {
        seconds = 120;
        RNG();
    }

    let m = Math.floor(seconds / 60);
    let s = Math.floor(seconds % 60);

    document.getElementById("timer").innerHTML =
        String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");

}, 100);

function calculateTime(){

    const attempt = Number(document.getElementById("attemptInput").value);

    const result = document.getElementById("calcResult");


    if(!attempt || attempt <= 0){
        result.innerHTML = "INVALID ATTEMPT";
        return;
    }


    let totalSeconds = attempt * 120;

    let days = Math.floor(totalSeconds / 86400);

    let hours = Math.floor((totalSeconds % 86400) / 3600);

    let minutes = Math.floor((totalSeconds % 3600) / 60);


    let output = "";


    if(days > 0){
        output += days + " DAYS ";
    }

    if(hours > 0){
        output += hours + " HOURS ";
    }

    if(minutes > 0){
    output += minutes + " MINUTES";
    }

    if(output === ""){
    output = "0 MINUTES";
}

    result.innerHTML =
    attempt.toLocaleString() + " ATTEMPTS = " + output.trim();
}

document.getElementById("calcButton").onclick = calculateTime;
