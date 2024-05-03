const express = require("express");
const app = express();
const path = require("path");
const Root = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (_, response) => {
  response.sendFile(path.join(Root, "index.html"));
});

app.use("/api/menu", require("./routes/menuRoutes.js"));
app.use("/api/events", require("./routes/eventsRoutes.js"));

const message = `Server running: http://localhost:${port}`;
app.listen(port, () => console.log(message));
