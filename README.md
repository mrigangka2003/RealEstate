# LAMASTATE Project

This project is a full-stack web application called **LAMASTATE**. It consists of a React frontend and an Express + Prisma backend. The app allows users to interact with properties, manage listings, and perform other real-estate-related actions.

## Tech Stack

### Frontend:
- **ReactJS**
- **React Router DOM**
- **JavaScript**
- **Vite** (for frontend bundling)

### Backend:
- **Node.js**
- **Express.js**
- **Prisma** (ORM for database management)
- **MongoDB** (NoSql Database)
- **TypeScript**

## Folder Structure

```plaintext
LAMASTATE/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── lib/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── responsive.css
│   ├── .gitignore
│   ├── .prettierrc
│   ├── .eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vite.config.js
├── server/
│   ├── node_modules/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── public/
│   ├── src/
│   │   ├── controllers/
│   │   ├── core/
│   │   ├── helpers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── app.ts
│   │   ├── config.ts
│   │   ├── index.ts
│   │   └── types.d.ts
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
└── Socket
└── README.md

