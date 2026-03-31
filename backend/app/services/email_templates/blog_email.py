from .base_email import base_email_template
import re


def clean_html(text):
    return re.sub("<[^>]+>", "", text or "")


def blog_email_template(title, description, url):
    descricao_limpa = clean_html(description)[:160] + "..."

    content = f"""

    <!-- TÍTULO -->
    <h2 style="
      text-align: center;
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 16px;
    ">
      {title}
    </h2>

    <!-- TEXTO -->
    <p style="
      color: #cccccc;
      font-size: 15px;
      line-height: 1.7;
      text-align: left;
      max-width: 520px;
      margin: 0 auto;
    ">
      {descricao_limpa}
    </p>

    <!-- BOTÃO -->
    <div style="text-align: center; margin-top: 28px;">
      <a href="{url}" style="
        display: inline-block;
        padding: 14px 26px;
        background-color: #ff7a00;
        color: #000;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
      ">
        Ler blog
      </a>
    </div>

    """

    return base_email_template("", content)