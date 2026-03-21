import requests
import os

RESEND_API_KEY = os.getenv("RESEND_API_KEY")

def send_test_email():
    url = "https://api.resend.com/emails"

    payload = {
        "from": "Rota 7 <onboarding@resend.dev>",
        "to": ["SEU_EMAIL_AQUI"],
        "subject": "Teste de email 🚀",
        "html": "<h1>Email funcionando!</h1><p>Backend Python ok.</p>"
    }

    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    print(response.status_code, response.text)

    return response.json()