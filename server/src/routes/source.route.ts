import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";

export const sourceRoute = Router();

sourceRoute.get("/", asyncHandler(listSources));
sourceRoute.post("/", asyncHandler(createSource));
sourceRoute.get("/:sourceId", asyncHandler(getSource));
sourceRoute.put("/:sourceId", asyncHandler(deleteSources);
sourceRoute.delete("/bulk-delete", asyncHandler(bulkDeleteSource));
