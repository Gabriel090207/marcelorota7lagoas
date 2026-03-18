import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

# 🔥 EVITA REINICIALIZAR
if not firebase_admin._apps:

    firebase_json = os.getenv("FIREBASE_CREDENTIALS")

    if firebase_json:
        # 🚀 PRODUÇÃO (Render)
        cred = credentials.Certificate(json.loads(firebase_json))
    else:
        # 💻 LOCAL
        cred = credentials.Certificate("./app/firebase_key.json")

    firebase_admin.initialize_app(cred)

db = firestore.client()