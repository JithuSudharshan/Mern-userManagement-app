import express from  "express"
import { signin, signup } from "../controllers/authController.js";

const router = express.Router()

router.post("/signup",signup)
router.get("/signin",signin)
router.post("/signin",signin)

export default router;