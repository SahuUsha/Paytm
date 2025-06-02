import { Router } from "express";
import { signInController, UserController , getSearchUser,updateUser} from "../controller/user.controller";
import { authMiddleware } from "../middleware/middleware";



const router = Router();

router.route("/signup").post(UserController)
router.route("/signin").post(signInController)
router.route("/getUser").get(authMiddleware,getSearchUser)
router.route("/updateUser").put(authMiddleware,updateUser)

export default router;