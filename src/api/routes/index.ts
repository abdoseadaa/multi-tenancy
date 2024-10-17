import { Router } from "express";
import { UsersRoutes } from "./users";


const router = Router()


router.use('/users', UsersRoutes)



export {router as API_ROUTES}