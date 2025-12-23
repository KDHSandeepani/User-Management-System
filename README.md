📘 User Management System 

📌 Project Overview

	This project is a User Management System developed using React.js for the frontend, Node.js with Express for the backend, and MySQL as the database.

	The system allows to:

		•	Register new users
		•	View all users
		•	Search & filter users
		•	View detailed user information 
		•	Edit user details
		•	Delete users
		•	View dashboard with charts (Active / Inactive users)
		•	Login & Logout functionality


📌 Objectives of the Project

		The main objectives of this project are:

			•	To develop a full CRUD (Create, Read, Update, Delete) system
			•	To understand React component-based architecture
			•	To store and manage data efficiently using MySQL
			•	To design a user-friendly interface

🛠️ Technologies Used

		• Frontend
			React.js
			React Router DOM
			Axios
			HTML
			CSS

		• Backend
			Node.js
			Express.js

		• Database
			MySQL

📂 Project Structure

		User-Management/
		│
		├── backend/
		│   ├── server.js
		│   ├── db.js
		│   ├── routes/
		│   │   ├── usersRoutes.js
		│   │   ├── dashboardRoutes.js
		│
		├── frontend/
		│   ├── src/
		│   │   ├── components/
		│   │   │   └── Sidebar.jsx
		│   │   ├── pages/
		│   │   │   ├── Login.jsx
		│   │   │   ├── Register.jsx
		│   │   │   ├── Dashboard.jsx
		│   │   │   ├── Users.jsx
		│   │   │   ├── ViewUser.jsx
		│   │   │   └── EditUser.jsx
		│   │   ├── styles/
		│   │   │   ├── auth.css
		│   │   │   ├── dashboard.css
		│   │   │   ├── Login.css
		│   │   │   ├── users.css
		│   │   │   ├── viewuser.css
		│   │   │   ├── sidebar.css
		│   │   │   └── editUser.css
		│   │   └── App.js
		│
		└── README.md

⚙️ Setup Steps

	1️⃣ Extract ZIP File
	
			Extract the downloaded ZIP file and open the project folder in Visual Studio Code.
			
	2️⃣ Database Setup (MySQL)

			• Open phpMyAdmin or MySQL Workbench

			• Create a database:
				CREATE DATABASE user_management;

			• Create users table (example):
				CREATE TABLE users (
  					id INT(11) AUTO_INCREMENT PRIMARY KEY,
 					 first_name VARCHAR(50),
  					 last_name VARCHAR(50),
  					 dob DATE,
                     gender VARCHAR(10),
				     phone VARCHAR(15),
				     email VARCHAR(100),
				     address VARCHAR(100),
				     district VARCHAR(50),
				     parentName VARCHAR(50),
				     parentPhone VARCHAR(15),
				     relationship VARCHAR(15),
				     nic VARCHAR(20),
				     status VARCHAR(15),
				     password VARCHAR(30)
				);

▶️ Run Instructions

	🔹 Run Backend (Node.js)
			cd backend
			node server.js

	🔹 Run Frontend (React)
			cd frontend
			npm install
			npm start
	



