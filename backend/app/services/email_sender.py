import os
import httpx

RESEND_API_KEY = os.getenv("RESEND_API_KEY")


async def send_email(to: str, subject: str, html: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": "Rota 7 Lagoas <noreply@portal7lagoas.email>",  # depois trocamos
                "to": [to],
                "subject": subject,
                "html": html,
            },
        )

        print("EMAIL STATUS:", response.status_code)
        print("EMAIL RESPONSE:", response.text)