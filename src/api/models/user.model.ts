import { Schema } from "mongoose";
import { DiscriminatorModel, MasterModel, TenantModel } from "../../config/database/models.db";
import { Document } from 'mongoose';
interface ICustomer extends Document {
  name: string;
  email: string;
  type: string;
  user_id?: string;
}
interface IProfile extends ICustomer {
  age: number;
}
interface IUser extends Document {
  name: string;
  email: string;
  tenant_id: string;
  type: string;
}

interface IAdmin extends Document {
  role : string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tenant_id : { type: String, required: true },
}, { timestamps: true ,  discriminatorKey : "type" });


const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type : { type: String, required: true  , default : "customer"},
  user_id : { type: String, required: false },
}  , { timestamps: true,  discriminatorKey : "type" });



const profileSchema = new Schema<IProfile>({
  age : { type: Number, required: true },
})




const adminSchema = new Schema<IAdmin>({
    role : { type: String, required: true  , default : "admin"},
})






export const User = ()=> MasterModel("User", userSchema)

export const Customer = ()=> TenantModel("Customer", customerSchema)

export const Profile =  ()=> DiscriminatorModel(Customer, "Profile", profileSchema)

export const Admin = ()=> DiscriminatorModel(User, "Admin", adminSchema)