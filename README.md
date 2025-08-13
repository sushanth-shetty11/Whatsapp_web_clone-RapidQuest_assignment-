# 📱 RapidQuest WhatsApp Clone

A full-stack real-time chat application inspired by WhatsApp, built with:

- **Frontend:** React.js (hosted on Netlify)
- **Backend:** Node.js, Express.js, MongoDB, Socket.io (hosted on Render)
- **Database:** MongoDB Atlas
- **Real-Time Communication:** Socket.io
- **Styling:** CSS / Tailwind (if used)
- **Date Formatting:** date-fns

---

## 🚀 Live Demo

- **Frontend (Netlify):** [https://rapidquestproject.netlify.app/](https://rapidquestproject.netlify.app/)
- **Backend API (Render):** [https://rapidquest-backend-0rhj.onrender.com](https://rapidquest-backend-0rhj.onrender.com)

---

## 📌 Features

- Real-time messaging using **Socket.io**
- Persistent chat history using **MongoDB Atlas**
- View conversation list & open chats
- Send and receive messages instantly
- RESTful API for conversation and message data
- Modern, responsive UI

> If more time was available, additional features could include:  
> ✅ User authentication with JWT  
> ✅ Profile pictures & user settings  
> ✅ Typing indicators and online status  
> ✅ File & media sharing  
> ✅ Message search and filters

---

## 🛠️ Tech Stack

### **Frontend** (React)
- React.js
- Axios (HTTP requests)
- Environment variables for API URL (`REACT_APP_API_URL`)
- Hosted on **Netlify**

### **Backend** (Node.js)
- Express.js
- Socket.io
- Mongoose (MongoDB)
- dotenv (environment variable management)
- cors (Cross-Origin Resource Sharing)
- Hosted on **Render**

---

## 📂 Project Structure

RapidQuest/
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── services/api.js # API calls to backend
│ │ └── ... # Components, pages
│ ├── public/
│ └── package.json
│
└── backend/ # Node.js backend
├── src/
│ ├── app.js # Main server file
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ └── socket/ # Socket.io events
├── package.json

text

---

## ⚙️ Environment Variables

### **Backend** (Render → Environment Tab)
| Name                  | Example Value                                                                 |
|-----------------------|-------------------------------------------------------------------------------|
| `PORT`                | `5000` (Render usually provides this automatically)                          |
| `MONGO_URI`           | `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true`|
| `WHATSAPP_VERIFY_TOKEN`| `your_custom_token`                                                          |

### **Frontend** (Netlify → Site Settings → Build & Deploy → Environment)
| Name                 | Example Value                                             |
|----------------------|-----------------------------------------------------------|
| `REACT_APP_API_URL`  | `https://rapidquest-backend-0rhj.onrender.com/api/messages`|

---

## 💻 Local Development

### 1️⃣ Clone Repositories
Clone frontend
git clone https://github.com/yourusername/RapidQuest_frontend.git
cd RapidQuest_frontend
npm install

Clone backend
git clone https://github.com/yourusername/RapidQuest_backend.git
cd RapidQuest_backend
npm install

text

### 2️⃣ Set Environment Variables Locally

- **Frontend** → Create `frontend/.env`:
REACT_APP_API_URL=http://localhost:5000/api/messages

text

- **Backend** → Create `backend/.env`:
PORT=5000
MONGO_URI=your_local_or_atlas_connection_string
WHATSAPP_VERIFY_TOKEN=your_token

text

### 3️⃣ Run Locally

- Backend:
cd backend
npm run dev

text

- Frontend:
cd frontend
npm start

text

---

## 🌐 Deployment

### **Frontend on Netlify**
- Connect the `frontend` GitHub repo to Netlify
- Build command: `npm run build`
- Publish directory: `build`
- Add `REACT_APP_API_URL` in Netlify environment settings
- Deploy

### **Backend on Render**
- Connect the `backend` GitHub repo to Render
- Environment tab → Add `MONGO_URI`, `PORT`, `WHATSAPP_VERIFY_TOKEN`
- Build command: `npm install`
- Start command: `npm start`
- Deploy

---

## 🔍 Testing Connection

1. Open your [Netlify site](https://rapidquestproject.netlify.app/)
2. Press `F12` to open browser DevTools  
3. Go to **Network** tab  
4. Perform actions like sending a message  
5. Check that API requests are going to:  
https://rapidquest-backend-0rhj.onrender.com/...

text
and returning **Status 200** responses.

---

## 📜 License
This project is for educational purposes. Modify and extend as needed.

---

## ✨ Author
**Your Name** — Full Stack Developer
