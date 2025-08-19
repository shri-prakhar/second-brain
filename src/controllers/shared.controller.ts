import { shared_Items } from "../services/shared.service";
import { Request , Response } from "express";

export const shareitems  =  async ( req:Request , res: Response )=>{
    try{
        const UserId = req.user?._id
        const {savedItemIDs , message } = req.body;
        console.log ( savedItemIDs , message)
        const expiresAt = new Date(Date.now() + 10*60*60*24*1000);

        if (!savedItemIDs || !Array.isArray(savedItemIDs)){
            res.status(400).json({Message:"Invalid Item Ids "});
            return;
        }
        const shareItem = await shared_Items(UserId , savedItemIDs , message, expiresAt);
        res.status(200).json({shareItem})
    }catch(err:unknown){
        if (err instanceof Error ){
            res.status(500).json({Message:err.message})
        }
    }
}