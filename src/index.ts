import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import "colors";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import "./config/name-space/init.ns";
import useTenantDb from './config/database/database_switch.middleware';
import extractTenantId from './config/name-space/extract_tenant_id.middleware';
import { API_ROUTES } from './api/routes';



const app = express();

const port =  process.env.QB_PORT || 4400;


const whiteListOrigins: string[] = [
	  "http://localhost:4000"
];



const corsOptions: Record<string, any> = {
  origin: (origin: string, callback: (err: any, success?: boolean) => void) => {
    if (
      !origin ||
      origin.includes("localhost") ||
      whiteListOrigins.includes(
        origin
          .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
          .split(".")
          .slice(-2)
          .join(".")
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("Origin Not Allowed"));
    }
  },
};


app.use(cors(corsOptions));
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));



app.use(extractTenantId);

app.use(useTenantDb);




app.use("/api",API_ROUTES);



  
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
