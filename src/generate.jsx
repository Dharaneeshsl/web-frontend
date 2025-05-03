import { useState } from "react";
import axios from "axios"; // Import Axios for API requests
import "./generate.css";
import model1 from "./assets/model1.png";
import model2 from "./assets/model2.png";
import model3 from "./assets/model3.png";
import { data } from "react-router-dom";

function Generate() {
  const [selectedModel, setSelectedModel] = useState(null); // State to store the selected model
  const [url, setUrl] = useState(""); // State to store the entered URL
  const [isValidUrl, setIsValidUrl] = useState(true); // State to track if the URL is valid
  const [qrCode, setQrCode] = useState(null); // State to store the generated QR code

  const handleModelClick = (model) => {
    setSelectedModel(model); // Update the selected model
  };

  // Validate URL on change
  const handleUrlChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);

    // Validate the URL using the URL constructor
    try {
      new URL(inputUrl); // If this succeeds, the URL is valid
      setIsValidUrl(true);
    } catch (error) {
      setIsValidUrl(false); // If it throws an error, the URL is invalid
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
      // Make an API request to send the URL and shape
      const response = await axios.post(
        "http://127.0.0.1:5000/generate_qr", // Replace with your backend API URL
        {
          data: url,
          shape: selectedModel, // Send the selected model as the shape
        },
        { responseType: "blob" } // Expecting an image blob as the response
      );

      // Convert the response blob to an image URL
      const qrBlob = new Blob([response.data], { type: "image/png" });
      const qrUrl = URL.createObjectURL(qrBlob);
      setQrCode(qrUrl); // Update the QR code state
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    }
  };

  return (
    <>
      <div className="generate" id="generate">
        <h1>Generate</h1>
        <div className="flexbox">
          <div className="qr-output">
            {qrCode && <img className="qrimg" src={qrCode} alt="Generated QR Code" />}
          </div>
          <div className="url_input">
            <input
              type="url"
              placeholder="Enter your URL"
              id="url_input"
              value={url}
              onChange={handleUrlChange} // Validate on change
              required
            />
            {!isValidUrl && (
              <p style={{ color: "white", fontSize: "12px",position: "absolute", bottom: "-50px", left: "10px" }}>
                Please enter a valid URL.
              </p>
            )}
            <div className="genbtn">
              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={!isValidUrl || !url} // Disable button if URL is invalid or empty
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
