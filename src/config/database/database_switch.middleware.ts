// ns.middleware.ts
import { NextFunction, Request, Response } from "express";
import { getTenantId } from "../name-space/init.ns";
import mongodb from "./connect.db";


export const getTenantUri = () => {
  let tenantId = getTenantId();
  const master = process.env.MASTER_DB_NAME!;
  let tenantUri  = `${master}_${tenantId}`
  return tenantUri
}


export const getConnection = (isMaster = false) => {
  const uri = isMaster ? process.env.MASTER_DB_NAME! : getTenantUri() 
  return mongodb.useDb(uri , { useCache : true })
}

export const getTenantConnection = (isMaster = false) => {
  const uri = getTenantUri() 
  return mongodb.useDb(uri , { useCache : true })
}

export const getMasterConnection = () => {
  return mongodb.useDb(process.env.MASTER_DB_NAME! , { useCache : true })
}


export const switchToTenantDb = (connectionName : string) => {
  return mongodb.useDb(connectionName , { useCache : true })
}




export default  function useTenantDb(req: Request, res: Response, next: NextFunction) {

  const uri = getTenantUri()
  
  try {
    getConnection()
    console.info(`db switched to ${uri}`.cyan);
  } catch (error) {
    console.error(`connection to ${uri} error: ${error}`);
  }


  next()
}
