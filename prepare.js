import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


const filePath="./sample.pdf"
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});

async function main(){
    const loader = new PDFLoader(filePath);
    const docs = await loader.load()
    const doc=docs.map((doc)=>doc.pageContent).join("\n\n=====\n\n")
    const allSplits = await textSplitter.splitDocuments(docs);
    console.log("Splitted docs:", allSplits.length);
}

main();