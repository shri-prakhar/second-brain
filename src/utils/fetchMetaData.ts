import * as cheerio from "cheerio";
import axios from "axios";

export const fetchMetaData = async (url:string): Promise<string|null> =>{
    try{
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const text = $("body").text();
        const dataa = text.slice(0,4000);
        console.log(dataa)
        return dataa;
    }catch {
        return null;
    }

};
