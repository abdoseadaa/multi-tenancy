import mongoose from "mongoose"



const mongoOptions: mongoose.ConnectOptions = {
  autoIndex: true,
  maxPoolSize: 10,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const connect = (URI: string) =>
  mongoose.createConnection(URI, mongoOptions);



const connectToMongoDB =  () =>{

  const URI = process.env.URI!

  const MASTER = process.env.MASTER_DB_NAME!


  const db = connect(URI);


  db.on("open", () => {
    console.info(
      `db switched to ${MASTER}`.cyan
    );
  });
  db.on("error", (err) => {
    console.error(
      `Mongoose connection error: ${err} with connection info ${URI}`.red
    );
    process.exit(0);
  });
  return db;




}


// matermodelName => tenancy

const mongodb =  connectToMongoDB();

export default mongodb