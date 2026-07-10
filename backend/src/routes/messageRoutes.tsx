import { Router } from "express";
import { sendMessage } from "../controllers/messageController.js";

const router = Router();

router.post("/", sendMessage);

export default router;
