import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { getuserAcoount, getUserInfo, TransferMoney } from "../controller/account.controller";


const router = Router();

router.route("/transfer").post(authMiddleware,TransferMoney);
router.route("/accountInfo").get(authMiddleware,getUserInfo)
router.route("/useraccount").get(authMiddleware,getuserAcoount)


export default router;