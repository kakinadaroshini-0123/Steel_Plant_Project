const API_BASE = "http://localhost:5000";
const statusElement = document.getElementById("backendStatus");
let backendReady = false;

function setBackendStatus(connected, checking = false) {
  if (!statusElement) return;

  backendReady = connected;

  if (checking) {
    statusElement.textContent = "Checking backend connection...";
    statusElement.style.color = "#ffd166";
  } else if (connected) {
    statusElement.textContent = "Backend and database are connected.";
    statusElement.style.color = "#3ddc97";
  } else {
    statusElement.textContent = "Backend or database is unavailable. Start the server; this page will reconnect automatically.";
    statusElement.style.color = "#ff605c";
  }
}

async function checkBackend() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(`${API_BASE}/auth/status`, {
      cache: "no-store",
      signal: controller.signal
    });
    const data = await response.json();
    return response.ok && data.success;
  } catch (error) {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function refreshBackendStatus(showChecking = false) {
  if (showChecking) {
    setBackendStatus(false, true);
  }

  const connected = await checkBackend();
  setBackendStatus(connected);
  return connected;
}

window.addEventListener("DOMContentLoaded", () => {
  refreshBackendStatus(true);
  setInterval(refreshBackendStatus, 5000);
});

async function selectRole(role) {
  if (!backendReady && !(await refreshBackendStatus(true))) {
    alert("Unable to connect to the backend/database. Please start the server and try again.");
    setBackendStatus(false);
    return;
  }

  localStorage.setItem("userRole", role);
  window.location.href = "login.html";
}
