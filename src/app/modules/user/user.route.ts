import { Router } from "express";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import { validateRequest } from "../../middlewares/vailidateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { createUserZodSchema, updateUserZodSchema } from "./user.Vaildation";


const router = Router()



router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser)
 
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUsers)

router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser)
// /api/v1/user/:id
export const UserRoutes = router