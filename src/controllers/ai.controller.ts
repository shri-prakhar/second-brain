import { summaiseTheLink } from "../services/ai.service"; 
import { savedItemsModel } from "../models/db";
import { Request , Response } from "express";
import { isValidObjectID } from "../utils/validateobejectID";


export const aiSummary = async (req:Request , res:Response):Promise<void> => {
    try{
        const { id } = req.params;
        const UserId  = req.user?._id;
        if (!isValidObjectID(id)){
            res.status(400).json({Message:"Invalid Item"})
            return 
        }
        const item = await savedItemsModel.findOne({_id:id , user: UserId});
        if (!item){
             res.status(404).json({Message:"Item Not found"});
             return
        }
        const summary = await summaiseTheLink(item.url);
        item.aiSummary = summary;
        await item.save();
        res.status(200).json({Message:summary})
    }catch(err:unknown){
        if (err instanceof Error){
            res.status(500).json({Message : err.message})
        }
    }
}