import type { Request, Response } from "express";
import {
  createWorkspaceForUser,
  deleteWorkspaceForUser,
  getWorkspaceByIdForUser,
  updateWorkspaceForUser,
  listWorkspacesByUser,
} from "../services/workspace.service.js";
import { ValidationError } from "../types/app-error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
  workspaceIdParamSchema,
} from "../validators/workspace.validator.js";

// Validate and normalize the workspace ID param.
const parseWorkspaceId = (params: Request["params"]) => {
  const parsed = workspaceIdParamSchema.safeParse(params);

  if (!parsed.success) {
    throw new ValidationError(
      "Invalid workspace id",
      getZodFieldErrors(parsed.error),
    );
  }

  return parsed.data;
};

// Validate payload before creating a workspace.
const parseCreateBody = (body: unknown) => {
  const parsed = createWorkspaceSchema.safeParse(body);

  if (!parsed.success) {
    throw new ValidationError(
      "Validation failed",
      getZodFieldErrors(parsed.error),
    );
  }

  return parsed.data;
};

// Validate payload before updating a workspace.
const parseUpdateBody = (body: unknown) => {
  const parsed = updateWorkspaceSchema.safeParse(body);

  if (!parsed.success) {
    throw new ValidationError(
      "Validation failed",
      getZodFieldErrors(parsed.error),
    );
  }

  return parsed.data;
};

// Fetch all workspaces for the authenticated user.
export const listWorkspaces = async (req: Request, res: Response) => {
  if (!req.session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const workspaces = await listWorkspacesByUser(req.session.user.id);
  res.json(workspaces);
};

// Fetch a single workspace for the authenticated user.
export const getWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = parseWorkspaceId(req.params);

  if (!req.session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const workspace = await getWorkspaceByIdForUser(
    workspaceId,
    req.session.user.id,
  );

  res.json(workspace);
};

// Create a new workspace using validated input.
export const createWorkspace = async (req: Request, res: Response) => {
  const input = parseCreateBody(req.body);

  if (!req.session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const workspace = await createWorkspaceForUser(req.session.user.id, input);
  res.status(201).json(workspace);
};

// Update an existing workspace after validating the request body.
export const updateWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = parseWorkspaceId(req.params);

  if (!req.session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const input = parseUpdateBody(req.body);
  const workspace = await updateWorkspaceForUser(
    workspaceId,
    req.session.user.id,
    input,
  );

  res.json(workspace);
};

// Delete a workspace belonging to the authenticated user.
export const deleteWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = parseWorkspaceId(req.params);

  if (!req.session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await deleteWorkspaceForUser(workspaceId, req.session.user.id);
  res.status(204).send();
};
