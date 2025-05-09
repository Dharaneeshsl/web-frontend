import { useState, useContext } from "react";
import axios from "axios";
import "./generate.css";
import model1 from "./assets/model1.png";
import model2 from "./assets/model2.png";
import model3 from "./assets/model3.png";
import { RefreshContext } from "./RefreshContext.jsx";

function Generate() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [localQrCode, setLocalQrCode] = useState(null); // State to store the Base64 string
  const { triggerRefresh, setQrCode, qrCode, shortCode } =
    useContext(RefreshContext); // Access the context
  async function convertImageToBase64(imageUrl) {
    try {
      // Fetch the image as a Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Convert the Blob to a Base64 string
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Base64 string
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      throw error;
    }
  }
  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  const handleUrlChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);

    try {
      new URL(inputUrl);
      setIsValidUrl(true);
    } catch (error) {
      setIsValidUrl(false);
    }
  };

  const handleDownload = async () => {
    try {
      if (!localQrCode) {
        alert("QR code not available for download. Please generate one first.");
        return;
      }
       
      const corsProxy = "https://cors-anywhere.herokuapp.com/";

      // Fetch the image as a Blob
      const response = await fetch(corsProxy+localQrCode);
      const blob = await response.blob();

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Create a Blob URL
      link.download = "qrcode.png"; // Set the default file name for the download
      document.body.appendChild(link);

      // Programmatically trigger the click event
      link.click();

      // Clean up the Blob URL and remove the anchor element
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handleGenerate = async () => {
    if (!url || !isValidUrl) {
      alert("Please enter a valid URL!");
      return;
    }
    if (!selectedModel) {
      alert("Please select a QR model!");
      return;
    }

    try {
      const corsProxy = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = "https://api.qrcode-monkey.com/qr/custom";
      const response = await axios.post(
        corsProxy + apiUrl,
        selectedModel === 1
          ? {
              data: url,
              config: {
                body: "circle",
                eye: "frame0",
                eyeBall: "ball0",
                bodyColor: "#FFFFFF",
                bgColor: "#00000000",
                eye1Color: "#FFFFFF",
                eye2Color: "#FFFFFF",
                eye3Color: "#FFFFFF",
                eyeBall1Color: "#FFFFFF",
                eyeBall2Color: "#FFFFFF",
                eyeBall3Color: "#FFFFFF",
              },
              size: 1000,
              download: "imageUrl",
              file: "png",
            }
          : selectedModel === 2
          ? {
              data: url,
              config: {
                body: "square",
                eye: "frame0",
                eyeBall: "ball0",
                bodyColor: "#FFFFFF",
                bgColor: "#00000000",
                eye1Color: "#FFFFFF",
                eye2Color: "#FFFFFF",
                eye3Color: "#FFFFFF",
                eyeBall1Color: "#FFFFFF",
                eyeBall2Color: "#FFFFFF",
                eyeBall3Color: "#FFFFFF",
              },
              size: 1000,
              download: "imageUrl",
              file: "png",
            }
          : {
              data: url,
              config: {
                body: "circle-zebra-vertical",
                eye: "frame0",
                eyeBall: "ball0",
                bodyColor: "#FFFFFF",
                bgColor: "#00000000",
                eye1Color: "#FFFFFF",
                eye2Color: "#FFFFFF",
                eye3Color: "#FFFFFF",
                eyeBall1Color: "#FFFFFF",
                eyeBall2Color: "#FFFFFF",
                eyeBall3Color: "#FFFFFF",
              },
              size: 1000,
              download: "imageUrl",
              file: "png",
            }
      );

      console.log("API Response:", response.data);

      const qrUrl = response.data.imageUrl;
      setQrCode(qrUrl);
      setLocalQrCode(qrUrl); // Store the QR code URL in state
      convertImageToBase64(corsProxy + qrUrl)
        .then((base64String) => {
          setQrCodeBase64(base64String); // Store the Base64 string in state
          // You can now store the base64String as needed
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    }

    axios
      .post("http://localhost:5000/shorten/shorten", {
        longUrl: url,
        qrCodeENC: qrCodeBase64,
      })
      .then((response) => {
        console.log("API Response:", response.data);
        triggerRefresh(); // Notify Recents to refresh
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  };

  return (
    <>
      <div className="generate" id="generate">
        <h1>Generate</h1>
        <div className="flexbox">
          {localQrCode ? (
            <div className="qr-output">
              <div className="qrgenerated">
                <img
                  className="qrimg"
                  src={localQrCode}
                  alt="Generated QR Code"
                />
              </div>
              <div className="response">
                <p>short/{shortCode}</p>
                <p>Expires : 24 AUG</p>
                <div className="clickable">
                  <button
                    className="copy-button"
                    aria-label="Copy link"
                    onClick={handleDownload}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.8335 8.33337L10.0002 12.5L14.1668 8.33337"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 12.5V2.5"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="copy-button" aria-label="Copy link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="url_input">
            <input
              type="url"
              placeholder="Enter your URL"
              id="url_input"
              value={url}
              onChange={handleUrlChange}
              required
            />
            {!isValidUrl && (
              <p
                style={{
                  color: "white",
                  fontSize: "12px",
                  position: "absolute",
                  bottom: "-50px",
                  left: "10px",
                }}
              >
                Please enter a valid URL.
              </p>
            )}
            <div className="genbtn">
              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={!isValidUrl || !url}
              >
                Generate
              </button>
            </div>
          </div>
          <div className="qrmodels">
            <div
              className={`model ${selectedModel === 1 ? "active" : ""}`}
              onClick={() => handleModelClick(1)}
            >
              <img src={model1} alt="Model 1" />
            </div>
            <div
              className={`model ${selectedModel === 2 ? "active" : ""}`}
              onClick={() => handleModelClick(2)}
            >
              <img src={model2} alt="Model 2" />
            </div>
            <div
              className={`model ${selectedModel === 3 ? "active" : ""}`}
              onClick={() => handleModelClick(3)}
            >
              <img src={model3} alt="Model 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Generate;
