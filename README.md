# 🎥 Clario-AI

Clario-AI is a **full-stack AI-powered video call platform** built with modern web technologies.  
It enables **real-time video calls**, **custom AI meeting agents**, **searchable transcripts**, and a **post-call AI chat** that understands meeting context.

🚀 Designed for **remote teams, AI-assisted collaboration, and smarter meetings**.

---

## ✨ Features

- 🤖 **AI-powered video calls** with real-time meeting agents  
- 📞 **Stream Video SDK** for reliable video calls  
- 💬 **Stream Chat SDK** for contextual chat  
- 📝 Automatic **summaries, transcripts, and recordings**  
- 📂 Meeting **history & status tracking**  
- 🔍 **Searchable transcripts** for past conversations  
- 📺 **Video playback** of recorded calls  
- 💬 **AI Meeting Q&A** using OpenAI  
- 💳 Subscriptions & payments via **Polar**  
- 🔐 Authentication with **Better Auth**  
- 📱 Fully **mobile responsive**  
- ⚙️ Background jobs with **Inngest**  
- 🧑‍💻 AI-assisted PR reviews with **CodeRabbit**  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind v4, shadcn/ui  
- **Backend:** Node.js, tRPC, Inngest (for background jobs)  
- **Database:** Neon + Drizzle ORM  
- **Authentication:** Better Auth + OAuth for socials  
- **Subscriptions:** Polar  
- **Video & Chat:** Stream Video + Stream Chat SDKs  
- **AI Integration:** OpenAI  
- **DevOps:** GitHub + CodeRabbit (PR reviews)  

---

## 📺 Walkthrough

Clario-AI was built step by step, covering both backend and frontend development, real-time communication, and AI integration.  

1. **Setup & Project Structure**  
   The project was initialized with Next.js and a modern stack, ensuring scalability and developer productivity.  

2. **Database & ORM**  
   Neon (serverless Postgres) and Drizzle ORM were configured to handle data persistence for users, agents, and meetings.  

3. **Authentication**  
   Implemented Better Auth for secure login and social authentication, allowing role-based access and subscription gating.  

4. **Dashboard & UI Components**  
   A responsive dashboard with a sidebar and navbar was created using Tailwind v4 and shadcn/ui, ensuring a clean, modern design.  

5. **API Layer (tRPC)**  
   tRPC was set up to enable type-safe communication between client and server, reducing API overhead and boilerplate.  

6. **Agents Module**  
   Users can create, update, filter, and manage custom AI agents through responsive forms, tables, and filters.  

7. **Meetings Module**  
   Built CRUD functionality for scheduling meetings, managing statuses, and displaying historical data.  

8. **Real-time Video Calls**  
   Integrated Stream Video SDK for live meetings, including support for multiple participants and media handling.  

9. **AI Agent Integration**  
   Connected Stream SDK with OpenAI to enable real-time AI agents that actively participate in meetings.  

10. **Background Jobs**  
   Leveraged Inngest for asynchronous tasks such as generating transcripts, summaries, and recording processing.  

11. **Post-call Experience**  
   After meetings, users can review recordings, search transcripts, and interact with an AI-powered Q&A bot trained on meeting context.  

12. **Payments & Deployment**  
   Subscription management was handled via Polar, and the application was deployed with production-ready configurations.  


---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/RodrigueDaniel/Clario-AI.git
cd Clario-AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
Create a .env file in the root with:
```env
NEXT_PUBLIC_STREAM_KEY=your_stream_key
STREAM_SECRET=your_stream_secret
OPENAI_API_KEY=your_openai_key
DATABASE_URL=your_neon_connection
BETTER_AUTH_SECRET=your_auth_secret
POLAR_API_KEY=your_polar_key
```

### 4. Run the dev server
```bash
npm run dev
```
