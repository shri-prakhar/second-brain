import { Types } from "mongoose";
import { TagModel } from "../models/db";

export const create_Tag = async (UserId: Types.ObjectId | undefined, name: string) => {
    const existing = await TagModel.findOne({User:UserId});

    if (existing){
        return existing 
    }else{
        return await TagModel.create({
            name,
            User:UserId
            
        })
    }
} 

export const getall_tags  = async (UserId : Types.ObjectId | undefined)=>{
    return await TagModel.find({User:UserId})
}

export const delete_Tag = async ( UserId:Types.ObjectId | undefined, tagname:string)=>{
    return await TagModel.findOneAndDelete({name:tagname , User:UserId})
}