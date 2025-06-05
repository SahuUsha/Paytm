import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { getUserInfo, TransferMoney } from "../controller/account.controller";


const router = Router();

router.route("/transfer").post(authMiddleware,TransferMoney);
router.route("/accountInfo").get(authMiddleware,getUserInfo)


export default router;