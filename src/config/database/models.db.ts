import { Model, Schema } from "mongoose";
import { getMasterConnection, getTenantConnection } from "./database_switch.middleware";




export const MasterModel = ( name : string, schema : Schema ) => {
  const connection = getMasterConnection();
  return connection.model(name, schema);
}

export const TenantModel = ( name : string, schema : Schema ) => {
  const connection = getTenantConnection();
  return connection.model(name, schema);
}



export const DiscriminatorModel = <T extends Document>(Model : ()=> Model<any>, name : string, schema : Schema ) : Model<T> =>{

  const model = Model(); 

  if (model.discriminators && model.discriminators[name]) {
    return model.discriminators[name] as Model<T>; 
  }

  return model.discriminator<T>(name, schema);
}