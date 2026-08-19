import type { Request, Response } from "express";

import { ValidationError } from "../types/app-error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import {
  bulkDeleteSourcesSchema,
  createSourceSchema,
  listSourcesQuerySchema,
  sourceIdParamSchema,
  workspaceIdParamSchema,
} from "../validators/source.validator.js";

import { listSourcesForWorkspace } from "../services/source.service.js";

export const parseWorkspaceId = (params: Request["params"]) => {
  const parsed = workspaceIdParamSchema.safeParse(params);

  if (!parsed.success) {
    throw new ValidationError(
      "Invalid workspace id",
      getZodFieldErrors(parsed.error),
    );
  }

  return parsed.data;
};

export const parseSourceParam = (params: Request["params"]) => {
  const parsed = sourceIdParamSchema.safeParse(params);

  if (!parsed.success) {
    throw new ValidationError(
      "Invalid source id",
      getZodFieldErrors(parsed.error),
    );
  }

  return parsed.data;
};

export const parseListQuery = (query: Request["query"]) => {
  const parsed = listSourcesQuerySchema.safeParse("query");

  if (!parsed.success) {
    throw new ValidationError("Invalid query", getZodFieldErrors(parsed.error));
  }

  return parsed.data;
};

export const parseCreateBody = (body: unknown) => {
  const parsed = createSourceSchema.safeParse(body);

  if (!parsed.success) {
    throw new ValidationError(
      "Validation failed",
      getZodFieldErrors(parsed.error),
    );
  }

  return parsed.data;
};

export const parseBulkDeleteBody = (body: unknown) => {
  const parsed = bulkDeleteSourcesSchema.safeParse(body);

  if (!parsed.success) {
    throw new ValidationError(
      "Validation failed",
      getZodFieldErrors(parsed.error),
    );
  }

  return parsed.data;
};

export const listSources = async (req: Request, res: Response) => {
  const { workspaceId } = parseWorkspaceId(req.params);
  const query = parseListQuery(req.query);
  const sources = await listSourcesForWorkspace(
    workspaceId,
    query,
    req.session.user.id,
  );
  res.json(sources);
};
