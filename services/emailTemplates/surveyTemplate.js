module.exports = (survey) => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
          <h3 style="color: #555;">I'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p style="font-size: 16px; font-weight: bold;">${survey.body}</p>
          <div style="margin-top: 20px;">
            <a href="http://localhost:3000" style="text-decoration: none; color: white; background-color: green; padding: 10px 20px; border-radius: 5px;">Yes</a>
          </div>
          <div style="margin-top: 10px;">
            <a href="http://localhost:3000" style="text-decoration: none; color: white; background-color: red; padding: 10px 20px; border-radius: 5px;">No</a>
          </div>
        </div>
      </body>
    </html>
    `;
};
