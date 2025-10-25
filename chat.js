import { vectorStore } from "./Prepare.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});


async function chat(){
    const query="What programming languages are mentioned in the document?";
    const results= await vectorStore.similaritySearch(query, 3);
    // console.log("Top 3 results:",results);
    const retrive=results.map(doc=>doc.pageContent).join("\n\n=====\n\n");
    const FinalQuery=`query=${query}\ncontext=${retrive}`;
    // console.log("Final Query to LLM:",FinalQuery);

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [
        {
            role: "user",
            parts: [{ text: FinalQuery }],
        },
    ],
    });
    console.log("Final response:",response.candidates[0].content.parts[0].text);
}

chat();