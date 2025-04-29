from flask import Flask, request, jsonify, send_file
from io import BytesIO
from PIL import Image, ImageDraw
import qrcode
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

def generate_qr_with_shape(data, shape='square'):
    qr = qrcode.QRCode(border=1)
    qr.add_data(data)
    qr.make(fit=True)
    matrix = qr.get_matrix()

    size = 10
    img_size = len(matrix) * size
    img = Image.new('RGBA', (img_size, img_size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)

    for y, row in enumerate(matrix):
        for x, module in enumerate(row):
            if module:
                x_pos = x * size
                y_pos = y * size
                if shape == 'model1':
                    draw.ellipse((x_pos, y_pos, x_pos + size, y_pos + size), fill='white')
                elif shape == 'model2':
                    points = [
                        (x_pos + size // 2, y_pos),
                        (x_pos, y_pos + size),
                        (x_pos + size, y_pos + size)
                    ]
                    draw.polygon(points, fill='white')
                else:
                    draw.rectangle((x_pos, y_pos, x_pos + size, y_pos + size), fill='white')

    return img

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.json.get('url')
    shape = request.json.get('shape', 'square')

    if not data:
        return jsonify({'error': 'URL is required'}), 400

    qr_img = generate_qr_with_shape(data, shape)

    img_io = BytesIO()
    qr_img.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)