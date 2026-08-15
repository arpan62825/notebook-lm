import { Router } from "express";
import {
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  listWorkspaces,
  getWorkspace,
} from "../controllers/workspace.controller.js";
import { requireAuth } from "../middleware/require-auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const workspaceRoute = Router();
workspaceRoute.use(requireAuth);
workspaceRoute.get("/", asyncHandler(listWorkspaces));
workspaceRoute.post("/", asyncHandler(createWorkspace));
workspaceRoute.get("/:workspaceId", asyncHandler(getWorkspace));
workspaceRoute.put("/:workspaceId", asyncHandler(updateWorkspace));
workspaceRoute.delete("/:workspaceId", asyncHandler(deleteWorkspace));
