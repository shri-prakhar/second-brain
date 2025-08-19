

export const DetectLinkType = (url:string):"Youtube"|"Twitter"|"unknown"|"Article" =>{
    if(url.includes("youtube.com") || url.includes("youtu.be") ) return "Youtube";
    if(url.includes("twitter.com")) return "Twitter";
    if(url.startsWith("http")) return "Article";
    return "unknown" 
}