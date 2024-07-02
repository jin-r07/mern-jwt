require("dotenv").config();
const express = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const authenticatedRoute = require("./routes/authenticated");
const cors = require("cors");
const { createAdmin } = require("./scripts/setup");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

createAdmin();

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api", authenticatedRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});