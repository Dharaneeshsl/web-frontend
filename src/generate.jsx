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
  const [qrCode, setQrCode] = useState(null);
  const { triggerRefresh } = useContext(RefreshContext); // Access the context

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
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    }

    axios
      .post("http://localhost:5000/shorten/shorten", { longUrl: url })
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
          <div className="qr-output">
            {qrCode && (
              <img className="qrimg" src={qrCode} alt="Generated QR Code" />
            )}
          </div>
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
