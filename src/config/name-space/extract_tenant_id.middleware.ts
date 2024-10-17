// ns.middleware.ts
import { NextFunction, Request, Response } from "express";
import { setTenantId, tenantNamespace } from "./init.ns";

export default function extractTenantId(req: Request, res: Response, next: NextFunction) {

  let tenantId = req.headers["x-tenant-id"];


  if (!tenantId) {
    return res.status(400).json({ error: "tenantId isn't recognized" });
  }

 
  tenantNamespace.bindEmitter(req);
  tenantNamespace.bindEmitter(res);


  // setTenantId(tenantId as string);
  // next();
  tenantNamespace.run(() => {
    setTenantId(tenantId as string);
    next();
  });
}
