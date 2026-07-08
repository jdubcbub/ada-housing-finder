import { Router } from "express";
import { getList, getDetail, postListing, updateListing } from "../controllers/listingController.js";

const router = Router();

router.get("/", getList);
router.get("/:id", getDetail);
router.post("/", postListing);
router.patch("/:id", updateListing);

export default router;
