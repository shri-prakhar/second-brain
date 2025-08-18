import { Types } from "mongoose";
import { User } from "../../models/User"; // adjust import
//import { Types } from "mongoose"

declare global {
  namespace Express {
    export interface Request {
      user?: User ;
      
    }
  }
}
declare global {
    namespace Express {
        interface User {
            id?: string | undefined;
            _id?:Types.ObjectId;
        }
    }
}



