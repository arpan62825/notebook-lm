import { NotFoundError } from "../types/app-error.js";
import { getWorkspaceByIdForUser } from "./workspace.service.js";
import type { ListSourcesQuery } from "../validators/source.validator.js";
import {
  createSourceRecord,
  findSourceByIdAndWorkspaceId,
  findSourcesByWorkspaceId,
  type SourceRecord,
} from "../repository/source.repository.js";

async function assertWorkspaceAccess(workspaceId: string, userId: string) {
  await getWorkspaceByIdForUser(workspaceId, userId);
}

export const listSourcesForWorkspace = async (
  workspaceId: string,
  userId: string,
  filters: ListSourcesQuery = {},
) => {
  await assertWorkspaceAccess(workspaceId, userId);
  return findSourcesByWorkspaceId(workspaceId, filters);
};

export const getSourceForWorkspace = async (
  workspaceId: string,
  sourceId: string,
  userId: string,
): Promise<SourceRecord> => {
  await assertWorkspaceAccess(workspaceId, userId);
  const source = await findSourceByIdAndWorkspaceId(sourceId, workspaceId);

  if (!source) {
    throw new NotFoundError("Source not found");
  }

  return source;
};

export const createAndProcessSources = async (
  data: Parameters<typeof createSourceRecord>[0],
) => {
  const source = await createSourceRecord(data)

  await enqueueSourceProcessing(source.id);

};
