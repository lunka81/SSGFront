import { useEffect, useRef, useState } from "react";

import CameraCapture from "./Camera";
import type { CameraHandle } from "./Camera";

type CameraModalProps = {
  onCapture: (image: string) => void;
  onClose: () => void;
};

function CameraModal({ onCapture, onClose }: CameraModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cameraRef = useRef<CameraHandle>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      dialog?.close();
    };
  }, []);

  function closeCamera() {
    cameraRef.current?.stopCamera();
    onClose();
  }

  function takePicture() {
    const image = cameraRef.current?.takeSnapshot();

    if (!image) {
      setError(
        "Ingen kamerabild finns ännu. Tillåt kameraåtkomst och försök igen."
      );
      return;
    }

    cameraRef.current?.stopCamera();
    onCapture(image);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="camera-title"
      onCancel={(event) => {
        event.preventDefault();
        closeCamera();
      }}
    >
      

      <div
        style={{
          width: "min(480px, 80vw)",
          height: "360px",
          background: "#111",
          marginBottom: "5px",
        }}
      >
        <CameraCapture ref={cameraRef} autoStart />
      </div>

      {error && <p role="alert">{error}</p>}

      <button
        type="button"
        className="login-button"
        onClick={takePicture}

        style={{
          marginRight: "5px"
        }}
          
      >
        Take Picture
      </button>

      <button type="button" 
        className="login-button"
        onClick={closeCamera}>
        Cancel
      </button>
    </dialog>
  );
}

export default CameraModal;