const app = require("./app");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://qualityco-backend.herokuapp.com"
      : `https://localhost:${port}`;
  console.log(`Listening: ${baseUrl}`);
  /* eslint-enable no-console */
});
