import { Request, Response, Router } from "express";
import { Admin, Customer, Profile, User } from "../../models/user.model";
import { getTenantId } from "../../../config/name-space/init.ns";


const router = Router()


const Controller = async (req : Request, res : Response) => {


  const type = req.query.type as "customer" | "user" | "profile" | "customer_user" | "admin"

  const tenantId = uuid()

  if(type === "user"){
    let user = new (User())({
      name : req.body.name,
      email : req.body.email,
      tenant_id : tenantId,
    })
  
    const saved = await user.save()

    // setTenantId(tenantId)

    // let newProfile = new (Profile())({
    //   name : req.body.name,
    //   email : req.body.email,
    //   tenant_id : tenantId
    // })

    // const savedProfile = await newProfile.save()
    
    res.status(200).json({data:  {
      user : saved,
      // profile : savedProfile
    } , message : "user created" })
  }

  if(type === "customer"){
    let customer = new (Customer())({
      name : req.body.name,
      email : req.body.email,
      tenant_id : getTenantId()
    })
    const saved = await customer.save()
    res.status(200).json({data:  saved , message : "customer created" })
  }



  if(type === "profile"){
    let profile =  new (Profile())({
      name : req.body.name,
      email : req.body.email,
      age : req.body.age
    })


    const saved = await profile.save()
    res.status(200).json({data:  saved , message : "profile created" })
  }

  if(type === "admin"){
    const tenantId = uuid()
    let profile =  new (Admin())({
      name : req.body.name,
      email : req.body.email,
      tenant_id : tenantId,
      role : req.body.role
    })


    console.log(profile);
    
    const saved = await profile.save()
    res.status(200).json({data:  saved , message : "profile created" })
  }



  if(type === "customer_user"){


    const customerUser = new (User())({
      name : req.body.name,
      email : req.body.email,
      tenant_id : getTenantId(),
      type : "customer",
    })

    const savedUser = await customerUser.save()


    const customer = new (Customer())({
      name : req.body.name,
      email : req.body.email,
      user_id : savedUser._id,
    })

    const savedCustomer = await customer.save()

    return res.status(200).json({data:  {
      user : savedUser,
      customer : savedCustomer,
      message : "user and customer created"
    }})


  }




}

router.post('/', Controller)

export {router as CreateUserRoute}


function uuid() {
  return 'yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
