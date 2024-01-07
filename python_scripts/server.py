from flask import Flask, request, jsonify
import base64
from roboflow import Roboflow
from PIL import Image

app = Flask(__name__)

#accéder au model
rf = Roboflow(api_key="XSikEFil9SD9Y7b41lDw")
project = rf.workspace().project("restaurant-service-optimiser")
model = project.version(3).model

#stocker les resultats
global_predictions = None

@app.route('/upload', methods=['POST'])
def receive_and_save():
    global global_predictions

    try:
        #récupérer l'image encodée
        encoded_image = request.form['image']

        #decoder
        decoded_image = base64.b64decode(encoded_image)

        #sauvegarder l'image sur le bureau
        with open("image_received.png", "wb") as decoded_file:
            decoded_file.write(decoded_image)

        #effectuer des prédictions avec le model hebergé sur Roboflow
        predictions = model.predict("C:/Users/Ziyad Mabrouk/Desktop/image_received.png", confidence=40, overlap=30).json()

        if predictions['predictions']:
            #Stocker les prédictions sur la variable globale
            global_predictions = predictions

            return jsonify({'success': True, 'message': 'Image uploaded and predictions made.'})

        else:
            return jsonify({'success': False, 'message': 'No chair detected in the image.'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/get_image', methods=['GET'])
def get_image():
    global global_predictions

    try:
        if global_predictions:
            result = []
            for prediction in global_predictions['predictions']:
                #Afficher la classe prédite dans le terminal
                print(f"Predicted Class: {prediction['class']}")
                result.append({'class': prediction['class'], 'confidence': prediction['confidence']})

            #construire le chemin complet de l'image
            image_path = "C:/Users/Ziyad Mabrouk/Desktop/image_received.png"

            #ouvrir l'image et la lire en bytes
            with open(image_path, 'rb') as image_file:
                image_bytes = image_file.read()

            #encoder l'image en base64
            encoded_image = base64.b64encode(image_bytes).decode('utf-8')

            #retourner les données de l'image et le résultat de la prédiction sur le même json
            return jsonify({'imageData': encoded_image, 'predictions': result})
        else:
            return jsonify({'success': False, 'error': 'No predictions available.'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)