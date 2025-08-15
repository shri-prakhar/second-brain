import { User } from "../../models/User"; // adjust import

declare global {
  namespace Express {
    export interface Request {
      user?: User ;
    }
  }
}

