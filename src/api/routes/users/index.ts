import { Router } from "express";
import { GetUserRoute } from "./get.users.route";
import { CreateUserRoute } from "./create_user.route";


const router = Router()


router.use(GetUserRoute)
router.use(CreateUserRoute)



export {router as UsersRoutes}