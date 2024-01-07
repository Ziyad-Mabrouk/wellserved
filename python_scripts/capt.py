import time
import cv2
import requests
import base64
from io import BytesIO

def capture_and_send(api_url):
    cap = cv2.VideoCapture(0)  #0 -> webcam par defaut

    while True:
        #capturer une image depuis la webcam
        ret, frame = cap.read()

        #Convertir l'image en bytes
        _, encoded_image = cv2.imencode('.png', frame)
        image_bytes = encoded_image.tobytes()

        #Encoder en Base64
        encoded_image = base64.b64encode(image_bytes).decode('utf-8')

        #Envoyer l'image à l'API
        data = {'image': encoded_image}
        response = requests.post(api_url, data=data)

        #Afficher la réponse
        print(response.text)

        #Temps d'attente avant de prendre la prochaine capture
        time.sleep(0.00000001)

    cap.release()  #liberer la webcam lorsque le programme se termine


api_url = "http://localhost:5000/upload"
capture_and_send(api_url)