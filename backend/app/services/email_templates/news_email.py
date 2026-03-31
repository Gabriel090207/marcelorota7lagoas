from .base_email import base_email_template


def news_email_template(title, description, url):
    content = f"""
    
    <!-- TÍTULO PRINCIPAL -->
    <h2 style="
      margin-bottom: 12px;
      text-align: center;
      font-size: 24px;
      color: #ffffff;
      font-weight: bold;
    ">
      🚨 {title}
    </h2>

    <!-- DESCRIÇÃO -->
    <p style="
      color: #cccccc;
      font-size: 15px;
      line-height: 1.6;
      text-align: center;
      max-width: 480px;
      margin: 0 auto;
    ">
      {description}
    </p>

    <!-- TEXTO DE CURIOSIDADE -->
    <p style="
      color: #aaaaaa;
      margin-top: 15px;
      text-align: center;
      font-style: italic;
      font-size: 14px;
    ">
      Continue lendo para descobrir todos os detalhes 👇
    </p>

    <!-- BOTÃO -->
    <div style="text-align: center;">
      <a href="{url}" style="
        display: inline-block;
        margin-top: 22px;
        padding: 14px 26px;
        background-color: #ff7a00;
        color: #000;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 15px;
      ">
        Ler notícia completa
      </a>
    </div>

    """

    # 🔥 IMPORTANTE: título vazio pra não duplicar
    return base_email_template("", content)