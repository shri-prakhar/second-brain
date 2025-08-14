import dotenv from "dotenv";


dotenv.config();

const { PORT  , URL , JWT_SECRET  } = process.env;
export { PORT, URL , JWT_SECRET }