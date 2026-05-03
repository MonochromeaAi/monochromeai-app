// ==========================
// INIT DATA
// ==========================
let points = Number(localStorage.getItem("points")) || 0;
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
let lastCheck = localStorage.getItem("lastCheck");

// ==========================
// UPDATE UI
// ==========================
function updateUI() {
  const pointEl = document.getElementById("points");
  if (pointEl) pointEl.innerText = points;
}

// ==========================
// TOAST NOTIFICATION
// ==========================
function showToast(msg) {
  const toast = document.createElement("div");
  toast.innerText = msg;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#00ff99";
  toast.style.color = "#000";
  toast.style.padding = "10px 16px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 0 10px rgba(0,255,150,0.5)";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}

// ==========================
// DAILY CHECK-IN
// ==========================
function checkIn() {
  const today = new Date().toDateString();

  if (lastCheck === today) {
    showToast("Already checked today ⚠️");
    return;
  }

  points += 10;
  lastCheck = today;

  localStorage.setItem("points", points);
  localStorage.setItem("lastCheck", lastCheck);

  updateUI();
  showToast("+10 Points 🚀");
}

// ==========================
// TASK SYSTEM
// ==========================
function completeTask(id, reward) {
  if (tasks[id]) {
    showToast("Task already completed");
    return;
  }

  tasks[id] = true;
  points += reward;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("points", points);

  updateUI();
  showToast("+" + reward + " Points");
}

// ==========================
// CONNECT WALLET (MetaMask)
// ==========================
async function connectWallet() {
  if (!window.ethereum) {
    showToast("Install MetaMask!");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address = accounts[0];

    const btn = document.getElementById("walletBtn");
    if (btn) {
      btn.innerText =
        address.slice(0, 6) + "..." + address.slice(-4);
    }

    showToast("Wallet Connected ✅");
  } catch (err) {
    console.log(err);
    showToast("Connection failed");
  }
}

// ==========================
// OPEN TASK LINK (OPTIONAL)
// ==========================
function openTask(url) {
  window.open(url, "_blank");
}

// ==========================
// LOAD PAGE
// ==========================
window.onload = () => {
  updateUI();
};
