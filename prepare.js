import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

const filePath="./sample.pdf"
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});



const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
  apiKey: process.env.GOOGLE_API_KEY,
});


const pinecone = new PineconeClient();
// Will automatically read the PINECONE_API_KEY and PINECONE_ENVIRONMENT env vars
const pineconeIndex = pinecone.Index("rag");


export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
  maxConcurrency: 5,
  // You can pass a namespace here too
  // namespace: "foo",
});

async function main(){
    const loader = new PDFLoader(filePath);
    const docs = await loader.load()
    const doc=docs.map((doc)=>doc.pageContent).join("\n\n=====\n\n")
    const allSplits = await textSplitter.splitDocuments(docs);
    // console.log("Splitted docs:", allSplits.length);
    
    // await vectorStore.addDocuments( allSplits);
}

// main();