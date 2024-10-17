// custom.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface User {
      tenant_id: string;
    }

    interface Request {
      user: User;
    }
  }
}
