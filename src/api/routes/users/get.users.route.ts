import { Request, Response, Router } from "express";
import { Admin, Customer, Profile, User } from "../../models/user.model";


const router = Router()


const Controller = async (req : Request, res : Response) => {

  const type = req.query.type as "customer" | "user" | "profile" | "admin";

  if(type === "user" || !type){
    const data = await User().find({})
    return res.status(200).json({data:  data ,  total : data.length })
  }

  if(type === "customer"){
    const data = await Customer().find()
    return res.status(200).json({data:  data ,  total : data.length })
  }
  
  if(type === "profile"){
    const data = await Profile().find()
    return res.status(200).json({data:  data ,  total : data.length })
  }
  
  if(type === "admin"){
    const data = await Admin().find()
    return res.status(200).json({data:  data ,  total : data.length })
  }
  
}

router.get('/', Controller)




export {router as GetUserRoute}