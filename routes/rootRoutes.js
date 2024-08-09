module.exports = (app) => {
  app.get("/", (req, res) => {
    if (req.isAuthenticated() && req.user) {
      const user = req.user;

      res.send(`
        <html>
          <head>
            <title>Welcome</title>
          </head>
          <body>
            <h1>Welcome, ${user.displayName}!</h1>
            <p>Email: ${user.email}</p>
            <p>Google ID: ${user.googleId}</p>
            <p><a href="/api/logout">Logout</a></p>
          </body>
        </html>
      `);
    } else {
      res.send(`
        <html>
          <head>
            <title>Login</title>
          </head>
          <body>
            <h1>Please log in</h1>
            <a href="/auth/google">Login with Google</a>
          </body>
        </html>
      `);
    }
  });
};
