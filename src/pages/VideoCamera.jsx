import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const VideoCamera = () => {
  const videoRef = useRef(null);
  const [mode, setMode] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Detect mobile route
  useEffect(() => {
    const func = () => {
      if (window.location.pathname === "/video-camera") {
        setMode("mobile");
      }
    }
    func();
  }, []);

  // Desktop start
  const startFaceScan = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setMode("desktop-camera");
    } catch {
      setMode("qr");
    }
  };

  // Start camera ONLY after button click (important)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: mode === "mobile" ? { facingMode: "user" } : true,
      });
      videoRef.current.srcObject = stream;
      setCameraStarted(true);
    } catch (err) {
      console.log("Camera permission denied", err.message);
    }
  };

  // Capture image
  const captureFace = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], "face-scan.png", {
        type: "image/png",
      });
      console.log("âœ… Captured Face File:", file);
    });
  };

  // Auto mobile detect (but NOT auto camera start)
  useEffect(() => {
    const func = () => {
      if (isMobile) {
        setMode("mobile");
      }
    }
    func();
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">Face Scanner</h1>

      {/* Desktop start */}
      {!mode && (
        <button
          onClick={startFaceScan}
          className="bg-rose-500 text-white px-6 py-3 rounded-lg"
        >
          Start Face Scan
        </button>
      )}

      {/* Desktop camera */}
      {mode === "desktop-camera" && (
        <>
          {!cameraStarted && (
            <button
              onClick={startCamera}
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Start Camera
            </button>
          )}

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-80 rounded-lg shadow"
          />

          {cameraStarted && (
            <button
              onClick={captureFace}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Capture
            </button>
          )}
        </>
      )}

      {/* QR */}
      {mode === "qr" && (
        <div className="text-center">
          <p className="mb-4 font-medium">
            Desktop camera not found <br /> Scan with mobile
          </p>
          <QRCodeCanvas
            value={`${window.location.origin}/video-camera`}
            size={200}
          />
        </div>
      )}

      {/* Mobile camera */}
      {mode === "mobile" && (
        <>
          {!cameraStarted && (
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Start Mobile Camera
            </button>
          )}

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-80 rounded-lg shadow"
          />

          {cameraStarted && (
            <button
              onClick={captureFace}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Capture Face
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default VideoCamera;
