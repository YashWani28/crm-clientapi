const HTML_TEMPLATE = (pin) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>RESET YOUR PASSWORD</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>Following is your reset pin</h1>
              </div>
              <div class="email-body">
                <p>Reset Pin: ${pin}</p>
                <p>This pin will expire in 10 minutes</p>
              </div>
              
            </div>
          </div>
        </body>
      </html>
    `;
  }

module.exports={HTML_TEMPLATE};