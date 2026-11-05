
const localVideo = document.getElementById("local-video");
const cameraStatus = document.getElementById("camera-status");

let localStream = null;

async function startLocalMedia() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    localVideo.srcObject = localStream;

    cameraStatus.textContent = "Camera and microphone active";

    console.log("Local media started");

    return localStream;
  } catch (error) {
    console.error("Media access error:", error);

    cameraStatus.textContent = "Permission denied or device unavailable";

    throw error;
  }
}

function stopLocalMedia() {
  if (!localStream) return;

  localStream.getTracks().forEach((track) => {
    track.stop();
  });

  localVideo.srcObject = null;
  localStream = null;

  cameraStatus.textContent = "Stopped";

  console.log("Local media stopped");
}
