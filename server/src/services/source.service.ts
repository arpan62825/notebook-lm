import { NotFoundError } from "../types/app-error.js";
import { getWorkspaceByIdForUser } from "./workspace.service.js";
import type { ListSourcesQuery } from "../validators/source.validator.js";
import { findSourcesByWorkspaceId } from "../repository/source.repository.js";

async function assertWorkspaceAccess(workspaceId: string, userId: string) {
  await getWorkspaceByIdForUser(workspaceId, userId);
}

export async function listSourcesForWorkspace(
  workspaceId: string,
  userId: string,
  filters: ListSourcesQuery = {},
) {
  await assertWorkspaceAccess(workspaceId, userId);
  return findSourcesByWorkspaceId(workspaceId, filters);
}
