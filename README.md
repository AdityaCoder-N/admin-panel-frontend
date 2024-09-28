# Admin Panel Frontend

This is the frontend for an Admin Panel application built using React and React Router. It provides a user interface for managing users and viewing analytics. 

## Features

- User management
- Analytics dashboard
- Admin authentication

## Routes

- **`/login`**: 
  - The login page where users can enter their credentials to access the admin panel.
  
- **`/users`**: 
  - This page displays a list of users. Here, you can manage user data (add, edit, delete users).
  
- **`/analytics`**: 
  - This page displays various analytics related to the application, such as user statistics and usage metrics.

## Admin Credentials

To access the admin panel, use the following credentials:

- **Email**: `admin@gmail.com`
- **Password**: `admin1234`

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/admin-panel-frontend.git
cd admin-panel-frontend
```

Install Dependencies
Install the required dependencies for the project:

```bash
npm install
```

Starting the Backend Server
To run the frontend application, you need to start the backend server as well. Ensure your backend server is set up properly. You can follow these steps:

Navigate to your backend directory.
Start the backend server 

```bash
node index.js
```

Starting the Frontend Application
Once your backend server is running, navigate back to your frontend project directory and start the development server:

```bash
npm run dev
```
The application should now be running at http://localhost:3000.

Accessing the Application
Open your web browser and navigate to http://localhost:3000/login to access the login page. Use the admin credentials provided above to log in.

Built With
React - JavaScript library for building user interfaces
React Router - Declarative routing for React.js
License
This project is licensed under the MIT License - see the LICENSE file for details.



