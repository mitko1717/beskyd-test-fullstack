import { createConnection, ConnectionOptions } from "typeorm";
import { Record } from "./entity/Record";

const connectDB = async () => {
  try {
    const options: ConnectionOptions = {
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "1",
      database: process.env.DB_NAME || "records",
      entities: [Record],
      synchronize: true,
    };
    await createConnection(options);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
