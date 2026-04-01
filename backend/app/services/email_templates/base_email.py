def base_email_template(title, content):
    return f"""
    <html>
      <body style="
        margin: 0;
        padding: 0;
        background-color: #0f0f0f;
        font-family: Arial, sans-serif;
        color: #ffffff;
      ">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px;">
          <tr>
            <td align="center">
              
              <!-- CONTAINER -->
              <table width="600" cellpadding="0" cellspacing="0" style="
                background-color: #1a1a1a;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid #2a2a2a;
              ">

                <!-- HEADER -->
                <tr>
                  <td style="
                    padding: 20px;
                    text-align: center;
                    background-color: #0f0f0f;
                    border-bottom: 1px solid #2a2a2a;
                  ">

                    <!-- LOGO -->
                    <img 
                      src="https://www.rota7lagoas.com.br/images/logo.png"
                      alt="Rota 7 Lagoas"
                      style="
                        height: 50px;
                        margin-bottom: 10px;
                      "
                    />

                    <!-- NOME -->
                    <h1 style="
                      margin: 0;
                      color: #ff7a00;
                      font-size: 20px;
                    ">
                      Portal 7 Lagoas
                    </h1>

                  </td>
                </tr>

                <!-- TITLE -->
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="
                      margin: 0 0 10px 0;
                      color: #ffffff;
                      font-size: 20px;
                    ">
                      {title}
                    </h2>

                    <!-- CONTENT -->
                    <div style="
                      color: #cccccc;
                      font-size: 14px;
                      line-height: 1.6;
                    ">
                      {content}
                    </div>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="
                    padding: 15px;
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    border-top: 1px solid #2a2a2a;
                  ">
                    © Rota 7 Lagoas
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
    """