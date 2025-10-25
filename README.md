# 🧠 RAG Document Assistant

A **Retrieval-Augmented Generation (RAG)** system that allows querying documents intelligently using **LangChain**, **Google Gemini API**, and **Pinecone Vector Database**.

---

## 🚀 Tech Stack

- **Backend:** Node.js
- **AI Model:** Google Gemini (`@google/generative-ai`)
- **Vector Database:** Pinecone
- **Framework:** LangChain.js
- **File Parsing:** `pdf-parse`
- **Embedding Store:** LangChain’s `PineconeStore`

  ---

## 🔑 Environment Variables

Create `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
PINECONE_ENVIRONMENT=your_pinecone_environment

```
## 📁 Project Structure
```
RAG/
├── Prepare.js          # Creates embeddings from documents & stores them in Pinecone
├── chat.js             # Handles user queries using Gemini + vector retrieval
├── node_modules/       # Node.js dependencies
├── package.json        # Project metadata & dependencies
├── .env                # API keys & environment variables
└── README.md           # Project documentation

```
