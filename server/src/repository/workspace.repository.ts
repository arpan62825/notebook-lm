import { prisma } from "../lib/db.ts";

import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../validators/workspace.validator.ts";

export const workspaceSelect = {
  id: true,
  title: true,
  description: true,
  icon: true,
  defaultModel: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type WorkspaceRecord = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  defaultModel: string;
  createdAt: Date;
  updatedAt: Date;
};

export const findWorkspacesByUserId = (userId: string) => {
  return prisma.workspace.findMany({
    where: { userId },
    select: workspaceSelect,
    orderBy: { updatedAt: "desc" },
  });
};

export const findWorkspaceByIdAndUserId = (
  workspaceId: string,
  userId: string,
) => {
  return prisma.workspace.findFirst({
    where: { id: workspaceId, userId },
    select: workspaceSelect,
  });
};

export const createWorkspaceRecord = (
  userId: string,
  data: CreateWorkspaceInput,
) => {
  return prisma.workspace.create({
    data: {
      userId,
      ...data,
    },
    select: workspaceSelect,
  });
};

export function updateWorkspaceRecord(
  workspaceId: string,
  data: UpdateWorkspaceInput,
) {
  return prisma.workspace.update({
    where: { id: workspaceId },
    data,
    select: workspaceSelect,
  });
}

export async function deleteWorkspaceRecord(workspaceId: string) {
  try {
    await prisma.workspace.delete({
      where: { id: workspaceId },
    });
  } catch (error) {
    console.error(`Failed to delete workspace record ${workspaceId}`, error);
    throw error;
  }
}
