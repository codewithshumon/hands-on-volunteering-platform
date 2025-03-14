HandsOn Volunteer Platform
Welcome to the HandsOn Volunteer Platform! This is a full-stack web application built with React.js, Node.js, Express.js, and MongoDB. It provides a seamless user authentication system with email verification, password reset functionality, and a secure login system. Users can sign up, verify their email, log in, and reset their password if needed. After successful authentication, users are redirected to the dashboard.

Features

1. User Authentication
   Signup: Users can create an account by providing their name, email, and password.

Email Verification: After signing up, users receive a 6-digit verification code via email. They are redirected to the verification page to enter the code.

Resend Verification Code: Users can resend the verification code after 3 minutes if they don't receive it.

Login: Users can log in using their email and password. If the email is not verified, they will be prompted to verify it first.

Password Reset: Users can reset their password by verifying their email and setting a new password.

2. Email Verification
   A 6-digit verification code is sent to the user's email during signup and password reset.

The code expires after 3 minutes.

Users can resend the verification code after 3 minutes.

3. Password Reset
   Users can click the "Forgot Password" button on the login page.

They will be redirected to a page where they need to verify their email.

After email verification, users can set a new password.

Upon successful password reset, users are redirected to the login page.

4. Dashboard
   After successful login, users are redirected to the dashboard.

The dashboard is a protected route and can only be accessed by authenticated users.

Technologies Used
Frontend
React.js: A JavaScript library for building user interfaces.

React Router: For handling client-side routing.

Tailwind CSS: For styling the application.

Axios: For making HTTP requests to the backend.

React Toastify: For displaying toast notifications.

Backend
Node.js: A JavaScript runtime for building the server.

Express.js: A web framework for Node.js.

MongoDB: A NoSQL database for storing user data.

Mongoose: An ODM (Object Data Modeling) library for MongoDB.

JSON Web Token (JWT): For secure user authentication.

Nodemailer: For sending verification and password reset emails.

Bcrypt.js: For hashing passwords.

API Endpoints
Authentication
POST /api/v1/auth/signup: Create a new user account.

POST /api/v1/auth/verify-email: Verify the user's email using a 6-digit code.

POST /api/v1/auth/resend-verification-code: Resend the verification code.

POST /api/v1/auth/login: Log in a user.

POST /api/v1/auth/forgot-password: Initiate the password reset process.

POST /api/v1/auth/reset-password: Reset the user's password.

User
GET /api/v1/auth/verify-token: Verify the user's JWT token (used for protected routes).

Frontend Routes
/signup: Signup page.

/verify-email: Email verification page.

/login: Login page.

/forgot-password: Forgot password page.

/reset-password: Reset password page.

/dashboard: Dashboard page (protected route).

How to Run the Project
Prerequisites
Node.js (v16 or higher)

MongoDB (local or cloud)

NPM or Yarn

Backend Setup
Clone the repository:

bash
Copy
git clone https://github.com/your-username/hands-on-volunteer-platform.git
Navigate to the backend directory:

bash
Copy
cd backend
Install dependencies:

bash
Copy
npm install
Create a .env file in the backend directory and add the following environment variables:

env
Copy
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
Start the backend server:

bash
Copy
npm start
Frontend Setup
Navigate to the frontend directory:

bash
Copy
cd frontend
Install dependencies:

bash
Copy
npm install
Start the frontend development server:

bash
Copy
npm start
Open your browser and visit http://localhost:3000.

Project Structure
Backend
Copy
backend/
├── controllers/ # Route controllers
├── models/ # MongoDB models
├── routes/ # API routes
├── utils/ # Utility functions (e.g., email sender)
├── index.js # Entry point
└── .env # Environment variables
Frontend
Copy
frontend/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Page components
│ ├── store/ # Redux store and slices
│ ├── App.jsx # Main application component
│ └── index.js # Entry point
└── package.json # Frontend dependencies

Contact
If you have any questions or suggestions, feel free to reach out:

Email: dev.shumonkhan@gmail.com
GitHub: github.com/codewithshumon

Thank you for checking out the HandsOn Volunteer Platform! 🚀
