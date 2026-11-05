
const SERVER_URL = "http://localhost:5000";

const serverStatus = document.getElementById("server-status");
const message = document.getElementById("message");

const startCameraButton = document.getElementById("start-camera");
const stopCameraButton = document.getElementById("stop-camera");

const socket = io(SERVER_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"]
});

socket.on("connect", () => {
  console.log("Connected to Vezun:", socket.id);

  serverStatus.textContent = "Connected";
  serverStatus.style.color = "#22c55e";

  message.textContent = "Connected to signaling server";
});

socket.on("server:ready", (data) => {
  console.log("Server response:", data);
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message);

  serverStatus.textContent = "Connection failed";
  serverStatus.style.color = "#ef4444";

  message.textContent = error.message;
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);

  serverStatus.textContent = "Disconnected";
  serverStatus.style.color = "#ef4444";
});

socket.connect();

startCameraButton.addEventListener("click", async () => {
  try {
    await startLocalMedia();

    startCameraButton.disabled = true;
    stopCameraButton.disabled = false;

    message.textContent = "Your camera is working!";
  } catch (error) {
    message.textContent = "Could not access camera or microphone";
  }
});

stopCameraButton.addEventListener("click", () => {
  stopLocalMedia();

  startCameraButton.disabled = false;
  stopCameraButton.disabled = true;

  message.textContent = "Camera stopped";
});
