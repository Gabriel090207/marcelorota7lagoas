from .base_email import base_email_template


def news_email_template(title, description, url):
    content = f"""
    
    <h2 style="
      margin-bottom: 10px;
      text-align: center;
      font-size: 22px;
    ">
      🚨 {title}
    </h2>

    <p style="
      color: #cccccc;
      line-height: 1.6;
      text-align: center;
      max-width: 480px;
      margin: 0 auto;
    ">
      {description}
    </p>

    <p style="
      color: #aaaaaa;
      margin-top: 15px;
      text-align: center;
      font-style: italic;
    ">
      Continue lendo para descobrir todos os detalhes 👇
    </p>

    <div style="text-align: center;">
      <a href="{url}" style="
        display: inline-block;
        margin-top: 20px;
        padding: 14px 24px;
        background-color: #ff7a00;
        color: #000;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
      ">
        Ler notícia completa
      </a>
    </div>

    """

    return base_email_template("Nova notícia publicada", content)