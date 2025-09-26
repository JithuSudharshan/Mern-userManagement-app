import express from "express"
import { test } from "../controllers/userControllers.js";
import { verifyuser } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', test)
router.post("/update/:id", verifyuser, updateUser)

export default router;