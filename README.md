# ⚡ 404 Project Not Found - A 3-in-1 TypeScript Frontend App

Welcome to the "404 Project Not Found" — a powerful and clean TypeScript project combining **task management**, **data visualization**, and **image annotation** into one beautifully modular frontend application.

🌐 **Live Demo**: [https://vairadiology-frontend-challenge.vercel.app](https://vairadiology-frontend-challenge.vercel.app)  
📦 **GitHub Repo**: [https://github.com/abu-musa-dev/vairadiology-frontend-challenge](https://github.com/abu-musa-dev/vairadiology-frontend-challenge)

---

## 🧭 Pages You’ll Explore

### 📌 1. Nobody does the task (`/tasks`)
A fully interactive **Kanban Board** with drag-and-drop, date filtering, and persistent task storage.

- Columns: “To Do”, “In Progress”, “Done”
- Features:
  - `DateSelector` component to pick a date
  - Add/Edit/Delete tasks using modals
  - Drag and drop tasks between columns
  - Each task includes: `title`, `priority`, `due date`, `tags`
- All tasks saved in `localStorage` by selected date
- Managed globally via Zustand

---

### 📊 2. Because graphs make it look COOL! (`/dashboard`)
Visualizes task data from `/tasks` using responsive charts.

- 📊 Bar Chart: Tasks per status
- 📈 Line Chart: Tasks completed per day
- 🥧 Pie Chart: Tasks grouped by tag/priority
- All charts are mobile-friendly and built using Recharts
- Includes reusable `<ChartCard />` component

---

### ✏️ 3. A great annotation ahead! (`/annotate`)
Interactive polygon-based **image annotation** tool.

- View and slide through multiple images from `public/images`
- Draw polygons on images (click to create vertices)
- Remove specific polygons
- Persistent per-image annotation data saved to `localStorage`

---

## 🦹 Villains I Faced (Challenges & Solutions)

1. **Drag and Drop Integration**
   - Used `react-beautiful-dnd` with Zustand for reactive state control and column updates.

2. **Polygon Drawing on Canvas**
   - Separated polygon logic into `PolygonDrawer.tsx` and managed per-image state.

3. **Data Transformations for Charts**
   - Implemented helper functions in `utils/` to aggregate task data cleanly.

4. **Cross-component State Sync**
   - Zustand stores (`taskStore`, `dateStore`) handled date/task syncing globally.

5. **Fully Modular and Mobile Responsive Design**
   - Tailwind CSS + grid/flex layouts ensured seamless responsiveness across all devices.

🧠 Learned to divide concerns, isolate features, and reuse logic where necessary with the help of **ChatGPT**, **MDN**, and **official library docs**.

---

## 🧪 Tech Stack

- React + Vite + TypeScript
- Zustand (state management)
- Tailwind CSS (styling)
- Recharts (charting)
- HTML5 Canvas (annotation)
- LocalStorage API (persistence)

---

## 🚀 Getting Started

### 🔧 Requirements

- Node.js `v18.17.1` or higher
- npm `v9+`

### 🛠 Installation

```bash
git clone https://github.com/abu-musa-dev/vairadiology-frontend-challenge.git
cd vairadiology-frontend-challenge
npm install
npm run dev
