import { Router } from "express";
import { UserController } from "../controller/user.controller";



const router = Router();

router.route("/signup").post(UserController)

export default router;