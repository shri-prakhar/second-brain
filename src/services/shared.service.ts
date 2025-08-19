import { Types } from "mongoose";
import { savedItemsModel , sharedItemsModel } from "../models/db";


export const shared_Items = async (
    UserId : Types.ObjectId | undefined,
    savedItems: Types.ObjectId[],
    message? : string,
    expiresAt?: Date
)=> {
    const shareIdd = new Types.ObjectId().toString(); //generates new id for each element 
    const sharedItem = await sharedItemsModel.create({
        User:UserId ,
        savedItems,
        shareId:shareIdd,
        message,
        expiresAt,
    })

    await savedItemsModel.updateMany(
        {_id: { $in : savedItems }},  //all the fileld on _id apply increament by +1
        {$inc : { sharedCount :1}}
    )
    return sharedItem;
}