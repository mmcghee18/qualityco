const app = require("./app");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "http://qualityco-backend.herokuapp.com"
      : `http://localhost:${port}`;
  console.log(`Listening: ${baseUrl}`);
  /* eslint-enable no-console */
});
