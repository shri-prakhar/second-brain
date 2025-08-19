import { DetectLinkType } from "../utils/utilHelpers";
import { fetchMetaData } from "../utils/fetchMetaData";
//import { openai } from "../config/openai.config";
import axios from "axios";

export const summaiseTheLink = async (url:string):Promise<string | undefined> => {
    const type =  DetectLinkType(url)
    let contentToSummarise:string | null = "";
    if (type === "Article" ){
         const content = await fetchMetaData(url);
         console.log(content)
         if (!content){
            throw new Error("Could not fetch Article content");
         }
         contentToSummarise = content 
    }
    if (type === "Twitter" || type === "Youtube"){
        contentToSummarise = `User added a ${type} link: ${url}`;
    }
    try{
        const Response = await axios.post('http://localhost:11434/api/chat', {
            messages:[
                {
                    role: "user",
                    content: `summarise thiw for my second brain dashbard:\n${contentToSummarise}`
                },
            ],
            model:"llama2",
            stream:false, // it means if true show the response getting generated 
        })
        return Response.data.message.content || "No Summary Available.";
    }catch (err:unknown){
        if (err instanceof Error){
            console.error("error in  connecting to llama3:" , err.message)
            return "falied"
    }}
}   
