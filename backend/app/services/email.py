import requests
import os

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RESEND_URL = "https://api.resend.com/emails"

HEADERS = {
    "Authorization": f"Bearer {RESEND_API_KEY}",
    "Content-Type": "application/json"
}

# EMAIL PADRÃO
FROM_EMAIL = "Rota 7 <onboarding@resend.dev>"  # depois trocamos pro seu domínio


# =========================
# FUNÇÃO BASE (REUTILIZÁVEL)
# =========================
def send_email(to, subject, html):
    payload = {
        "from": FROM_EMAIL,
        "to": [to],
        "subject": subject,
        "html": html
    }

    response = requests.post(RESEND_URL, json=payload, headers=HEADERS)

    print("EMAIL STATUS:", response.status_code)
    print("EMAIL RESPONSE:", response.text)

    return response.json()


# =========================
# NOVA NOTÍCIA
# =========================
def enviar_email_nova_noticia(to, noticia):
    html = f"""
    <div style="font-family: Arial; background:#0f0f0f; color:#fff; padding:20px">
        <h2 style="color:#ff7a00;">📰 Nova notícia</h2>

        <h1>{noticia.get("titulo")}</h1>

        <img src="{noticia.get("imagem")}" style="width:100%; border-radius:10px;" />

        <p style="color:#ccc; margin-top:15px;">
            {noticia.get("conteudo", "")[:150]}...
        </p>

        <a href="https://rota7lagoas.com.br/noticia/{noticia.get("id")}" 
           style="display:inline-block; margin-top:20px; padding:12px 20px; background:#ff7a00; color:#000; border-radius:8px; text-decoration:none;">
           Ler matéria completa
        </a>
    </div>
    """

    return send_email(to, "📰 Nova notícia no Rota 7 Lagoas", html)


# =========================
# NOVA DICA
# =========================
def enviar_email_nova_dica(to, dica):
    html = f"""
    <div style="font-family: Arial; background:#0f0f0f; color:#fff; padding:20px">
        <h2 style="color:#ff7a00;">💡 Nova dica</h2>

        <h1>{dica.get("titulo")}</h1>

        <img src="{dica.get("imagem")}" style="width:100%; border-radius:10px;" />

        <p style="color:#ccc; margin-top:15px;">
            {dica.get("conteudo", "")[:150]}...
        </p>

        <a href="https://rota7lagoas.com.br/dica/{dica.get("id")}" 
           style="display:inline-block; margin-top:20px; padding:12px 20px; background:#ff7a00; color:#000; border-radius:8px; text-decoration:none;">
           Ver dica
        </a>
    </div>
    """

    return send_email(to, "💡 Nova dica pra você", html)


# =========================
# NOVO BLOG
# =========================
def enviar_email_novo_blog(to, blog):
    html = f"""
    <div style="font-family: Arial; background:#0f0f0f; color:#fff; padding:20px">
        <h2 style="color:#ff7a00;">📘 Novo conteúdo no blog</h2>

        <h1>{blog.get("titulo")}</h1>

        <img src="{blog.get("imagem")}" style="width:100%; border-radius:10px;" />

        <p style="color:#ccc; margin-top:15px;">
            {blog.get("conteudo", "")[:150]}...
        </p>

        <a href="https://rota7lagoas.com.br/blog/{blog.get("id")}" 
           style="display:inline-block; margin-top:20px; padding:12px 20px; background:#ff7a00; color:#000; border-radius:8px; text-decoration:none;">
           Ler conteúdo
        </a>
    </div>
    """

    return send_email(to, "📘 Novo post no blog", html)


# =========================
# NOVO EVENTO
# =========================
def enviar_email_novo_evento(to, evento):
    html = f"""
    <div style="font-family: Arial; background:#0f0f0f; color:#fff; padding:20px">
        <h2 style="color:#ff7a00;">📍 Novo evento</h2>

        <h1>{evento.get("titulo")}</h1>

        <p><b>📅 Data:</b> {evento.get("data")}</p>
        <p><b>📍 Local:</b> {evento.get("local")}</p>

        <img src="{evento.get("imagem")}" style="width:100%; border-radius:10px;" />

        <p style="color:#ccc; margin-top:15px;">
            {evento.get("descricao", "")[:150]}...
        </p>

        <a href="https://rota7lagoas.com.br/evento/{evento.get("id")}" 
           style="display:inline-block; margin-top:20px; padding:12px 20px; background:#ff7a00; color:#000; border-radius:8px; text-decoration:none;">
           Ver evento
        </a>
    </div>
    """

    return send_email(to, "📍 Novo evento na região", html)