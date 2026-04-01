from .base_email import base_email_template
import re


def clean_html(text):
    return re.sub("<[^>]+>", "", text or "")


def event_email_template(title, description, url, data, horario):
    descricao_limpa = clean_html(description)[:160] + "..."

    content = f"""

    <!-- TÍTULO -->
    <h2 style="
      text-align: center;
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 10px;
    ">
      {title}
    </h2>

    <!-- DATA + HORÁRIO -->
    <div style="
  text-align: center;
  margin-bottom: 18px;
  color: #ff7a00;
  font-weight: bold;
  font-size: 14px;
">
  {f"<span>{data.split(' ')[0]} &nbsp;•&nbsp; {data.split(' ')[1]}</span>" if ' ' in data else f"<span>{data}</span>"}
</div>

    <!-- DESCRIÇÃO -->
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
    <div style="
      text-align: center;
      margin-top: 28px;
    ">
      <a href="{url}" style="
        display: inline-block;
        padding: 14px 26px;
        background-color: #ff7a00;
        color: #000;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 15px;
      ">
        Ver evento
      </a>
    </div>

    """

    return base_email_template("", content)