# 💰 Expense Tracker  
A full-stack expense tracking app built as part of a practicum project.  
It uses **NestJS + Prisma + PostgreSQL** for the backend and **Next.js + Tailwind CSS** for the frontend.  
The database runs inside a **Docker** container.

---

## 🚀 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![NestJS](https://img.shields.io/badge/NestJS-Backend-red?logo=nestjs)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-blue?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-blue?logo=tailwindcss)

---

## 📂 Project Structure
```bash  
expense-tracker/
├── api/ # NestJS backend (Prisma + CRUD endpoints for expenses & categories)
├── web/ # Next.js frontend (UI + Tailwind)
├── infra/ # Docker Compose setup for PostgreSQL
├── docs/ # Screenshots & documentation assets
│ ├── screenshot-dark.png
│ └── screenshot-light.png
└── README.md # Project documentation
```

---

## 📸 Screenshots

![Screenshot](docs/screenshot.png)

---

## ⚙️ Setup Instructions  

Clone the repo and run the following commands:

```bash
# clone repo
git clone https://github.com/Fivkas/expense-tracker.git
cd expense-tracker

# start database
cd infra
docker compose up -d

# backend (NestJS)
cd ../api
npm install
npm run start:dev

# frontend (Next.js)
cd ../web
npm install
npm run dev
```

# 👨‍💻 Author

**Fivos Kapsalis**
🔗 GitHub: [Fivkas](https://github.com/Fivkas)