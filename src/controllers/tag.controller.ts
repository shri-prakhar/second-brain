import { create_Tag , delete_Tag , getall_tags } from "../services/tag.service";
import { Request, Response } from "express";

export const createTag = async (req:Request , res: Response ) : Promise<void>=> {
    try{
        const UserId = req.user?._id;
        
        const { name }  = req.body;

        if (!name){  
            res.status(400).json({Message: "Tag name required !!!!!!!"})
            return
        }
        const tag = await create_Tag ( UserId , name );

        res.status(200).json(tag)
    }catch(err:unknown){
        if (err instanceof Error){
            res.status(500).json({Message: err.message})
        }
    }

}
export const getallTags = async (req:Request , res: Response )=> {
    try{
        const UserId = req.user?._id;

        const tags = await getall_tags( UserId );
        res.status(200).json({tags});
    }catch(err:unknown){
        if (err instanceof Error){
            res.status(500).json({Message: err.message})
        }
    }

}
export const deleteTag = async (req:Request , res: Response ):Promise<void>=> {
    try{
        const UserId = req.user?._id;
        const { name } = req.params;
        if (!name){ 
            res.status(400).json({Message: "Tag name required !!!!!!!"})
                return 
        }
        const deleted = await delete_Tag( UserId , name );
        if (deleted){
            res.status(200).json({Message: "Deleted successfully!!!!"});
            return
        }else{
           res.status(400).json({Message: "Tag not found"}); 
        }
    }catch(err:unknown){
        if (err instanceof Error){
            res.status(500).json({Message: err.message})
        }
    }

}