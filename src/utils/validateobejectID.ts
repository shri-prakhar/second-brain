import mongoose from "mongoose";

export const isValidObjectID = (id:string):boolean => {
    return mongoose.Types.ObjectId.isValid(id);
}