import { create_Saveditems, get_Saveditems, update_Saveditems, delete_Saveditems } from "../services/savedItems.service";
import { Request , Response  } from "express";
import { isValidObjectID } from "../utils/validateobejectID";


export const createSavedItems = async (req:Request , res: Response ) => {
    try{
        const {title , url , description , tags , folder} = req.body;
        const UserId = req.user?._id
        const item = await create_Saveditems(UserId , {title , url , description , tags , folder});
        res.status(201).json({ savedItem : item })
    }catch (err:unknown){
        if (err instanceof Error){
            res.status(500).json({message: err.message});
        }
    }
}
export const getSavedItems = async (req:Request , res: Response ) => {
    try{
        const UserId = req.user?._id
        const item = await get_Saveditems(UserId );
        res.status(201).json({ getItem : item })
    }catch (err:unknown){
        if (err instanceof Error){
            res.status(500).json({message: err.message});
        }
    }
}
export const updateSavedItems = async (req:Request , res: Response ) => {
    try{
        const data = req.body;
        const UserId = req.user?._id
        const { id } = req.params;
        if (!isValidObjectID(id)) {
            res.status(400).json({Message: "invalid Item ID"});
            return
        }
        const updated = await update_Saveditems(id , UserId , data );
        if(!updated){
            res.status(404).json({
                Message : "User not found "
            });
            return
        }
        res.status(201).json({ updatedItem : updated })
    }catch (err:unknown){
        if (err instanceof Error){
            res.status(500).json({message: err.message});
        }
    }
}
export const deleteSavedItems = async (req:Request , res: Response ) => {
    try{
        const UserId = req.user?._id
        const { id } = req.params;
        if (!isValidObjectID(id)){
            res.status(401).json({Message : "Not valid Item"});
            return
        }
        const deleted = await delete_Saveditems(id , UserId );
        if(deleted) {
            res.status(201).json({ Message: "Deleted successfully" })
            return
        }
        res.status(404).json({Message : "Item Not Found!!!!"});
        
    }catch (err:unknown){
        if (err instanceof Error){
            res.status(500).json({message: err.message});
        }
    }
}