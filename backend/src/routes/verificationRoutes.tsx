import { Router } from "express";
import { verifyListing } from "../controllers/verificationController.js";

const router = Router();

router.post("/", verifyListing);

export default router;
