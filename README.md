# ⚡ 404 Project Not Found – A Modular 3-in-1 TypeScript Frontend Application

**404 Project Not Found** is a fully **TypeScript-based**, **responsive**, and **production-ready** frontend application that combines three major features into one project:  
✅ **Task Management (Kanban Board)**  
✅ **Data Visualization (Dashboard)**  
✅ **Image Annotation Tool**

🌐 Live Demo: [https://vairadiology-frontend-challenge.vercel.app](https://vairadiology-frontend-challenge.vercel.app)

---

## 🧭 Features Overview

### 1. 📌 Tasks (`/tasks`)
A powerful **Kanban Board** to organize and manage daily tasks:
- Columns: **To Do**, **In Progress**, **Done**
- **Drag-and-drop** support using `@hello-pangea/dnd`
- **Date filtering** to view tasks for a specific day
- Add, edit, and delete tasks through modals
- Each task contains: **title, priority, due date, tags**
- Data persisted per date using **LocalStorage**
- **Zustand store** for global state management

---

### 2. 📊 Dashboard (`/dashboard`)
A dynamic **data visualization** page built using `Recharts`:
- **Bar Chart:** Number of tasks by status
- **Line Chart:** Tasks completed per day
- **Pie Chart:** Tasks grouped by tags or priority
- Fully **responsive** and mobile-friendly
- **Reusable `<ChartCard />`** component for consistency

---

### 3. ✏️ Annotate (`/annotate`)
An interactive **image annotation tool**:
- **Image slider** to navigate multiple images stored in `/public/images`
- Ability to **draw polygons** on images
- **Delete specific polygons** by selecting them
- **Annotations are saved to LocalStorage** per image
- Designed with **mobile-first responsiveness**

---

## 💡 Challenges & Solutions

| Challenge                              | Solution |
|---------------------------------------|----------|
| Smooth drag-and-drop implementation   | Integrated `@hello-pangea/dnd` with Zustand state |
| Persistent task and annotation data   | Used **LocalStorage** with JSON serialization |
| Polygon drawing & deletion logic      | Built custom canvas-based polygon interaction |
| Cross-page state synchronization      | Centralized state using Zustand (`taskStore`, `dateStore`) |
| Full responsiveness                   | Tailwind CSS grid/flex layout with mobile-first breakpoints |

---

## 🛠 Tech Stack

- **React + Vite + TypeScript**
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **HTML5 Canvas API** for polygon drawing
- **LocalStorage API** for client-side persistence

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Node.js `v18.17.1` or higher
- npm `v9+`

### 📥 Installation & Run

```bash
git clone https://github.com/abu-musa-dev/vairadiology-frontend-challenge.git
cd vairadiology-frontend-challenge
npm install
npm run dev
