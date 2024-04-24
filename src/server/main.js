import express from "express";
import ViteExpress from "vite-express";
// dotenv
import dotenv from "dotenv";
// custom path ../../.env
dotenv.config({ path: "../../.env" });

// routes
import AuthController from "./controllers/auth.js";
import TeamController from "./controllers/team.js";
import UserController from "./controllers/users.js";
import TemplateController from "./controllers/template.js";
import TicketController from "./controllers/ticket.js";
import DashboardController from "./controllers/dashboard.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
import authMiddleware from "./middleware/auth.js";

// routes
app.use("/api/dashboard", authMiddleware, DashboardController);
app.use("/api/auth", AuthController);
app.use("/api/teams", authMiddleware, TeamController);
app.use("/api/users", authMiddleware, UserController);
app.use("/api/template", authMiddleware, TemplateController);
app.use("/api/ticket", authMiddleware, TicketController);

app.get("/health", async (req, res) => {
  res.send("OK");
});

// error handler return 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on http://localhost:3000...")
);
