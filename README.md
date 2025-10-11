<!-- markdownlint-disable MD012 MD026 MD001 MD022 MD032 MD029 MD019 MD034 MD031 MD047 MD040 MD009 MD058 MD024  -->

<!-- markdownlint-disable MD012 MD026 MD001 MD022 MD032 MD029 MD019 MD034 MD031 MD047 MD040 MD009 MD058 MD024  -->

# 📚 LibraryHub

A modern, intuitive library management system built with React, TypeScript, and Redux Toolkit. LibraryHub streamlines library operations with powerful features for book management, borrowing tracking, and analytics—all in one elegant interface.

![LibraryHub](https://img.shields.io/badge/Built%20with-React-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)



#### 🌍 Live Demo  

👉 **Try the application here :** [🔗 Live Demo](https://minimal-library-management-ten.vercel.app)  



#### 🖥️ Frontend Repository  

📦 **Frontend GitHub Repo :** [🔗 Frontend Code](https://github.com/shagar619/Minimal-Library-Management-System-L2A4)  


**Built with:**  
- React + TypeScript  
- Redux Toolkit Query (RTK Query)  
- Tailwind CSS  
- Vite  


#### ⚙️ Backend Repository  

🗄️ **Backend GitHub Repo :** [🔗 Backend Code](https://github.com/shagar619/Minimal-Library-Management-System-L2A4-Backend) 


**Powered by:**  
- Node.js + Express  
- MongoDB + Mongoose  
- Zod for validation  
- RESTful API design  



#### 🧭 Project Overview  

The **Library Management System** is a lightweight client-side web application designed to manage books and borrowing records efficiently.  
It demonstrates **clean architecture**, **state management with RTK Query**, and **modular code organization** for scalability and maintainability.

 **Goal:** Build a functional library interface that interacts with a RESTful API — without authentication, filters, or payment integration.


#### ✨ Core Features  

1. **Public Routes** 🚀  
All routes in the project are publicly accessible — no login or authentication required.  
The focus is on **core library operations only**.

2. **Book Management** 🛠️  

**📖 Book List Table**  
Displays all books in a tabular format with the following columns:  
| Title | Author | Genre | ISBN | Copies | Availability | Actions |

#### 🧩 Action Buttons  
- **Edit Book** – Opens an edit form pre-filled with book data.  
  - Submits updates via API.  
  - Instantly reflects in the UI.  
  - **Business Logic:** If copies = `0`, the book becomes unavailable.  
- **Delete Book** – Opens a confirmation dialog before removal.  
- **Borrow Book** – Opens a simple form to borrow the selected book.

#### ➕ Add New Book  
- Opens a creation form with fields:  
  `Title`, `Author`, `Genre`, `ISBN`, `Description`, `Copies`, `Available` *(optional, defaults to true)*.  
- On submit, redirects back to the Book List and updates UI instantly.


3. **Borrow Book** 📅  

Accessible via the **Borrow** button on the Book List.

**Fields** 
- `Quantity` (number)  
- `Due Date` (date)

**Business Rules**  
- Quantity **cannot exceed available copies**.  
- If copies reach `0`, the book is automatically marked as unavailable.  
- On submit:
  - Calls `/borrows` API  
  - Displays a success message  
  - Redirects to the **Borrow Summary** page


4. **Borrow Summary** 📊  

A summary view showing all borrowed books and total borrowed quantities.  
- Retrieved via aggregation API endpoint `/borrows/summary`.  
- Displays in table format:  
  | Book Title | ISBN | Total Quantity Borrowed |


#### 🧩 UI & UX Design  

| Aspect | Description |
|--------|--------------|
| 🎨 **Style** | Minimal, modern, and accessible. Built with **Tailwind CSS** (or plain CSS). |
| 📱 **Responsive** | Fully responsive across desktop, tablet, and mobile. |
| 🧭 **Navigation** | Simple navbar linking to all main sections. |
| 🧠 **UX** | Clear actions, intuitive layouts, and lightweight forms. |
| ⚙️ **Performance** | Optimized RTK Query caching and instant UI updates. |



#### 🗂️ Page Structure  

| Route | Description |
|--------|--------------|
| `/books` | Displays all books with Edit/Delete/Borrow options |
| `/create-book` | Form to add a new book |
| `/books/:id` | Detailed book view |
| `/edit-book/:id` | Form to update an existing book |
| `/borrow/:bookId` | Borrow form for a specific book |
| `/borrow-summary` | Borrow summary and total borrowed quantities |


#### 🧱 Project Architecture  

**Frontend Stack:**
- ⚛️ **React** – UI library  
- 🧰 **Redux Toolkit Query (RTK Query)** – API state management  
- 🧩 **TypeScript** – Strongly typed components and interfaces  
- 💨 **Tailwind CSS** – UI styling  
- 📡 **REST API** – Communication with backend (Node.js + Express + MongoDB)

**Backend Stack:**
- 🟢 **Node.js + Express** – RESTful API  
- 🍃 **MongoDB + Mongoose** – Data persistence  
- 🧾 **Zod** – Input validation and schema enforcement  



#### 📁 Folder Structure  
```
src/
├── components/
│   ├── books/              # Book-related components
│   │   ├── BookForm.tsx    # Create/Edit book form
│   │   └── BookTable.tsx   # Books listing table
│   ├── layout/             # Layout components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── PageLayout.tsx
│   └── ui/                 # shadcn/ui components
├── pages/                  # Route pages
│   ├── Index.tsx           # Landing page
│   ├── BooksPage.tsx       # Browse all books
│   ├── CreateBookPage.tsx  # Add new book
│   ├── EditBookPage.tsx    # Edit existing book
│   ├── BookDetailPage.tsx  # Book details view
│   ├── BorrowBookPage.tsx  # Borrow workflow
│   ├── BorrowSummaryPage.tsx # Borrowing analytics
│   ├── ContactPage.tsx     # Contact form
│   └── NotFound.tsx        # 404 page
├── store/                  # Redux store
│   ├── api/
│   │   ├── booksApi.ts     # Books API endpoints
│   │   └── borrowsApi.ts   # Borrowing API endpoints
│   └── store.ts            # Store configuration
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── App.tsx                 # Root component
```

#### 🔗 API Endpoints Summary  

**📘 Book Routes**  
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/books` | Get all books |
| `GET` | `/books/:id` | Get single book |
| `POST` | `/books` | Create a new book |
| `PUT` | `/books/:id` | Update a book |
| `DELETE` | `/books/:id` | Delete a book |



**📗 Borrow Routes** 
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/borrows` | Borrow a book |
| `GET` | `/borrows` | Get all borrow records |
| `GET` | `/borrows/summary` | Get aggregated borrow summary |
| `PUT` | `/borrows/:id` | Update a borrow record |
| `DELETE` | `/borrows/:id` | Delete a borrow record |



#### 🧩 State Management  

The project uses **Redux Toolkit Query (RTK Query)** for managing all API-related state.

**Key Features**
- ⚡ Automatic caching and refetching  
- 🧩 Tag-based invalidation for real-time UI updates  
- 🔄 Optimistic updates for smooth user experience  
- 💬 Built-in loading and error handling  


#### 🧠 Key Design Principles  

| Principle | Description |
|------------|-------------|
| 🧩 **Modularity** | Code is structured into reusable components and organized by feature (Books, Borrows, etc.) for better maintainability. |
| 🔍 **Type Safety** | Every component, API call, and function uses strong **TypeScript** types to ensure reliability and prevent runtime errors. |
| ⚙️ **Separation of Concerns** | The UI layer, business logic, and API requests are cleanly separated, ensuring scalable and testable code. |
| 🧱 **Scalability** | The architecture allows easy extension for future modules like authentication, user roles, or pagination. |
| 🧠 **Declarative UI** | Built using functional React components and hooks for predictable, readable, and maintainable behavior. |
| ⚡ **Performance** | **RTK Query** handles caching, re-fetching, and state updates automatically — reducing unnecessary renders. |
| 🎨 **Minimalist UI** | Focused on clarity and simplicity using **Tailwind CSS**, ensuring a smooth and distraction-free user experience. |


#### 🚀 Deployment


**Deployment Options**

LibraryHub can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `dist` folder to S3 bucket


#### 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


#### 🧑‍💻 Author  

**Developed by:** *[Shagar Ahmed]*  
📧 **Email:** ashagar619@gmail.com  
🌐 **Portfolio:** [https://github.com/shagar619](#)  
🐙 **GitHub:** [https://github.com/shagar619](#)  
💼 **LinkedIn:** [https://www.linkedin.com/in/shagar619](#)

---------------------------------------------------------

<div align="center">
  <p>Made By ❤️ Shagar Ahmed</p>
  <p>
    <a href="https://minimal-library-management-ten.vercel.app">View Project</a>
    ·
    <a href="https://github.com/shagar619/Minimal-Library-Management-System-L2A4">Front-end</a>
    ·
    <a href="https://github.com/shagar619/Minimal-Library-Management-System-L2A4-Backend">Backend</a>
  </p>
</div>

---------------------------------------------------------