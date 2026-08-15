import { listWorkspaces } from "../controllers/workspace.controller.js";
import {
  findWorkspaceByIdAndUserId,
  findWorkspacesByUserId,
  createWorkspaceRecord,
  updateWorkspaceRecord,
  deleteWorkspaceRecord,
  type WorkspaceRecord,
} from "../repository/workspace.repository.js";
import { NotFoundError } from "../types/app-error.js";
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../validators/workspace.validator.js";

export const listWorkspacesByUser = async (userId: string) => {
  try {
    return await findWorkspacesByUserId(userId);
  } catch (error) {
    console.error(`Failed to list workspaces for user ${userId}`, error);
    throw error;
  }
};

export const getWorkspaceByIdForUser = async (
  userId: string,
  workspaceId: string,
) => {
  try {
    const workspace = await findWorkspaceByIdAndUserId(workspaceId, userId);

    if (!workspace) {
      throw new NotFoundError("Workspace not found");
    }

    return workspace;
  } catch (error) {
    console.error(
      `Failed to get workspace ${workspaceId} for user ${userId}`,
      error,
    );
    throw error;
  }
};

export const createWorkspaceForUser = async (
  userId: string,
  input: CreateWorkspaceInput,
) => {
  try {
    return await createWorkspaceRecord(userId, input);
  } catch (error) {
    console.error(`Failed to create workspace for user ${userId}`, error);
    throw error;
  }
};

export const updateWorkspaceForUser = async (
  userId: string,
  workspaceId: string,
  input: UpdateWorkspaceInput,
) => {
  try {
    await getWorkspaceByIdForUser(userId, workspaceId);
    return await updateWorkspaceRecord(workspaceId, input);
  } catch (error) {
    console.error(
      `Failed to update workspace ${workspaceId} for user ${userId}`,
      error,
    );
    throw error;
  }
};

export const deleteWorkspaceForUser = async (
  userId: string,
  workspaceId: string,
) => {
  try {
    await getWorkspaceByIdForUser(userId, workspaceId);
    await deleteWorkspaceRecord(workspaceId);
  } catch (error) {
    console.error(
      `Failed to delete workspace ${workspaceId} for user ${userId}`,
      error,
    );
    throw error;
  }
};
