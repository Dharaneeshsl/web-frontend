from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import BytesIO
import requests as req

app = Flask(__name__)
CORS(app)

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    # Get data from the request
    data = request.json.get('data')
    design_type = request.json.get('shape', 1)  # Default to 1 if not provided

    # Define the payloads for different designs
    payload1 = {"data": data, "config": {"body": "circle", "eye": "frame0", "eyeBall": "ball0", "bodyColor": "#FFFFFF", "bgColor": "#00000000", "eye1Color": "#FFFFFF", "eye2Color": "#FFFFFF", "eye3Color": "#FFFFFF", "eyeBall1Color": "#FFFFFF", "eyeBall2Color": "#FFFFFF", "eyeBall3Color": "#FFFFFF"}, "size": 1000, "download": "imageUrl", "file": "png"}
    payload2 = {"data": data, "config": {"body": "square", "eye": "frame0", "eyeBall": "ball0", "bodyColor": "#FFFFFF", "bgColor": "#00000000", "eye1Color": "#FFFFFF", "eye2Color": "#FFFFFF", "eye3Color": "#FFFFFF", "eyeBall1Color": "#FFFFFF", "eyeBall2Color": "#FFFFFF", "eyeBall3Color": "#FFFFFF"}, "size": 1000, "download": "imageUrl", "file": "png"}
    payload3 = {"data": data, "config": {"body": "circle-zebra-vertical", "eye": "frame0", "eyeBall": "ball0", "bodyColor": "#FFFFFF", "bgColor": "#00000000", "eye1Color": "#FFFFFF", "eye2Color": "#FFFFFF", "eye3Color": "#FFFFFF", "eyeBall1Color": "#FFFFFF", "eyeBall2Color": "#FFFFFF", "eyeBall3Color": "#FFFFFF"}, "size": 1000, "download": "imageUrl", "file": "png"}

    # Select the payload based on the design type
    if design_type == 1:
        payload = payload1
    elif design_type == 2:
        payload = payload2
    elif design_type == 3:
        payload = payload3
    else:
        return jsonify({"error": "Invalid design type"}), 400

    # Send the request to the QR code API
    url = "https://api.qrcode-monkey.com/qr/custom"
    resp = req.post(url, json=payload)

    if resp.status_code == 200:
        # Get the image URL from the response
        output = resp.json()
        image_url = output.get('imageUrl')
        if not image_url:
            return jsonify({"error": "Failed to retrieve image URL"}), 500

        # Download the image
        image_resp = req.get(f"http:{image_url}")
        if image_resp.status_code == 200:
            # Return the image as a response
            img_io = BytesIO()
            img_io.write(image_resp.content)
            img_io.seek(0)
            return send_file(img_io, mimetype='image/png')
        else:
            return jsonify({"error": "Failed to download image"}), 500
    else:
        return jsonify({"error": "Failed to generate QR code"}), resp.status_code


if __name__ == '__main__':
    app.run(debug=True)