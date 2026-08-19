import type { Express } from "express";
import { workspaceRoute } from "./workspace.route.js";
import { sourceRoute } from "./source.route.js";

export const registerRoutes = (app: Express) => {
  workspaceRoute.use("/:workspaceId/sources", sourceRoute);
  app.use("/api/workspaces", workspaceRoute);
};
