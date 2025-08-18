import { savedItemsModel  } from "../models/db";
import  { Types } from "mongoose";

export const create_Saveditems = async (userId: Types.ObjectId | undefined , 
    data: { 
        title:string;
        url:string
        description:string;
        tags:string[];
        folder:string;
    })=>{
    const savedItem = await savedItemsModel.create({ user: userId , ...data });
    return savedItem
};
export const get_Saveditems = async (Userid: Types.ObjectId | undefined)=>{
    return await savedItemsModel.find({ user : Userid }).sort({createdAt: -1});
    //this statements finds all the items where the user is feild of UserID and then sort them bades on date created in descending order of creating 
}; 

export const update_Saveditems = async (
    ItemId:string , 
    UserId:Types.ObjectId | undefined,
    updates: Partial<{
        title:string;
        description:string;
        tags:string[];
        folder:string;
    }>
)=>{
    const updated = await savedItemsModel.findOneAndUpdate({
        _id:ItemId , user:UserId
    },updates,{new:true})
    return updated;
}

export const delete_Saveditems = async (ItemId:string , UserId:Types.ObjectId | undefined)=>{
    return await savedItemsModel.findOneAndDelete({_id:ItemId , user: UserId});
}
