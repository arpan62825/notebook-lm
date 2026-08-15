import type { Express } from "express";
import { workspaceRoute } from "./workspace.route.js";

export const registerRoutes = (app: Express) => {
  app.use("/api/workspaces", workspaceRoute);
};
