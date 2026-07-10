import { Router } from "express";
import { getSearches } from "../controllers/searchController.js";

const router = Router();

router.get("/", getSearches);

export default router;
