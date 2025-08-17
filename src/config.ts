import dotenv from "dotenv";


dotenv.config();

const { PORT  , URL , JWT_SECRET, GEN_SALT , GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET } = process.env;
export { PORT, URL , JWT_SECRET , GEN_SALT ,GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET  }