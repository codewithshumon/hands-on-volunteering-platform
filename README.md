HandsOn Volunteer Platform
The HandsOn Volunteer Platform is a full-stack web application designed to connect volunteers with meaningful opportunities. Built with React.js, Node.js, Express.js, and MongoDB, the platform offers a seamless user experience with secure authentication, event management, and community engagement features.

Users can:
Sign up, verify their email, and log in securely.
Create, join, update, and delete events.
Earn event hours for completing events.
Search for events and community posts.
Create community help requests and offer help to others.
Manage their profile, events, and help requests with ease.

The platform also includes automated features like event status updates and volunteer hour tracking, making it a comprehensive solution for volunteer management and community engagement. 🚀

Technologies Used

Frontend
Vite: A fast and modern build tool for React applications, providing quick development server startup and optimized production builds.
React.js: A JavaScript library for building dynamic and interactive user interfaces.
React Router: For handling client-side routing and navigation within the application.
Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces.
Axios: A promise-based HTTP client for making API requests to the backend.
Redux Toolkit: A library for efficient state management in React applications.
React Icons: A collection of popular icons for React applications.
jwt-decode: A library for decoding JSON Web Tokens (JWT) on the client side, enabling access to user information stored in the token.
motion: A library for adding animations and transitions to React components, enhancing the user experience.

Backend
Node.js: A JavaScript runtime for building scalable and efficient server-side applications.
Express.js: A web framework for Node.js that simplifies API development and routing.
MongoDB: A NoSQL database for storing and managing application data.
Mongoose: An Object Data Modeling (ODM) library for MongoDB, providing a schema-based solution for managing data.
JSON Web Token (JWT): For secure user authentication and authorization.
Nodemailer: For sending email notifications, including verification and password reset emails.
Bcrypt.js: For securely hashing and verifying user passwords.
node-cron: A library for scheduling and automating tasks (e.g., updating event statuses).
multer: A middleware for handling file uploads, such as profile images and event media.
Cloudinary: A cloud-based service for managing and optimizing media files (e.g., images, videos).
CORS: Middleware for enabling Cross-Origin Resource Sharing in the backend.
dotenv: For managing environment variables and configuration settings.

Development Tools
Nodemon: A utility for automatically restarting the Node.js server during development.
Redux Persist: For persisting Redux state across page reloads.
JWT Decode: For decoding JWT tokens on the client side.
React Feather: A collection of lightweight and customizable icons for React.

1. User Authentication

Signup:
Users can create an account by providing their name, email, and password.
Email verification is required after signup.

Email Verification:
A 6-digit verification code is sent to the user's email.
Users are redirected to the verification page to enter the code.
The code expires after 3 minutes.
Resend Verification Code: Users can resend the verification code after 3 minutes if they don’t receive it.

Login:
Users can log in using their email and password.
If the email is not verified, users are redirected to the email verification page.

Password Reset:
Users can reset their password by verifying their email.
After verification, users can set a new password.
Upon successful reset, users are redirected to the login page.

2. Email Verification

A 6-digit verification code is sent to the user's email during:
Signup.
Password reset.
The code expires after 3 minutes.
Users can resend the verification code after 3 minutes.

3. Password Reset
   Users can click the "Forgot Password" button on the login page.
   They are redirected to a page to verify their email.
   After email verification, users can set a new password.
   Upon successful reset, users are redirected to the login page.

4. Dashboard

Protected Route:
Only accessible to authenticated users.

Profile Section:
Displays the user’s profile image (auto-generated on signup).
Shows user details: name, skills, causes supported, and volunteer hours.
Edit Profile: Users can edit their profile information, including profile image, and save changes.

Event Tabs:
Events: Displays all events created by the user.Users can edit or delete their events.
Upcoming Events: Displays upcoming events created by the user or events the user has joined.
Users can view event details.
Help Requests: Displays all help requests created by the user and offers to help.
History: Displays all expired or completed events and help requests.

5. Event Management

Create Events:
Users can create new events with details like title, description, date, time, location, and duration.
Edit Events: Users can edit event details (only for events they created).
Delete Events: Users can delete events they created.
Join Events: Users can join events (restrictions apply: cannot join expired events or events they created).
View Event Details: Users can view details of events they created or joined.

6. Help Requests

Create Help Requests:
Users can create help requests for assistance.
Offer Help: Users can offer to help with requests created by others.
History: Displays completed or expired help requests.

7. Volunteer Hours

Earn Hours:
Users earn volunteerHours for completing events.
Hours are automatically added to the user’s profile when an event status changes to completed.

8. Cron Job

Automatic Event Status Updates:
Updates event statuses based on the current time:
Upcoming → Ongoing: When the event start time is reached.
Ongoing → Completed: When the event end time is reached.
Adds eventHours to the user’s profile for completed events.

9. Profile Customization

Auto-Generated Profile Image:
A profile image is automatically generated for users during signup.

Edit Profile:
Users can update their profile information, including skills, causes, and profile image.

10. Protected Routes

Authentication Required:
Certain routes (e.g., dashboard, events) are protected and only accessible to authenticated users.

Visual Representation

User Collection
User
├── \_id: ObjectId
├── email: String
├── password: String
├── name: String
├── skills: [String]
├── causes: [String]
├── volunteerHours: Number
├── createdEvents: [ObjectId] → Event
├── isEmailVerified: Boolean
├── profileImage: String
├── volunteerHistory: [ObjectId] → Event
├── joinedEvents: [ObjectId] → Event
├── createdAt: Date
└── \_\_v: Number

Event Collection
Event
├── \_id: ObjectId
├── title: String
├── description: String
├── date: Date
├── startTime: Date
├── endTime: Date
├── location: String
├── category: String
├── volunteersNeeded: Number
├── createdBy: ObjectId → User
├── status: String
├── attendees: [ObjectId] → User
├── createdAt: Date
├── eventHours: Number
└── \_\_v: Number

API Documentation

1. Authentication Routes
   POST /api/v1/auth/signup
   Description: Allows users to create a new account by providing their name, email, and password. After signing up, a 6-digit verification code is sent to the user's email for verification.

POST /api/v1/auth/login
Description: Authenticates users by verifying their email and password. Returns a JWT token for accessing protected routes.

POST /api/v1/auth/verify-email
Description: Verifies the user's email using the 6-digit code sent to their email during signup or password reset.

POST /api/v1/auth/resend-verification-code
Description: Resends the 6-digit verification code to the user's email if they didn't receive it or if the code expired.

POST /api/v1/auth/reset-password
Description: Allows users to reset their password after verifying their email. Users can set a new password after verification.

2. User Routes
   GET /api/v1/user/single-user
   Description: Retrieves the authenticated user's details, including their name, email, profile image, skills, causes, and volunteer hours.

PUT /api/v1/user/update-user
Description: Updates the authenticated user's details, such as name, skills, causes, and profile image. Supports file uploads for profile images.

3. Event Routes
   GET /api/v1/event/get-all-events
   Description: Fetches all events available on the platform, including details like title, description, date, location, status, and attendees.

GET /api/v1/event/get-all-events?status=upcoming&userId=${user.\_id}
Description: Fetches all upcoming events for a specific user (based on userId). This includes events the user has created or joined that are still upcoming.

GET /api/v1/event/get-all-events?status=completed&userId=${user.\_id}
Description: Fetches all completed events for a specific user (based on userId). This includes events the user has created or joined that have been completed.

GET /api/v1/event/get-my-events/:userId
Description: Retrieves all events created by the authenticated user.

POST /api/v1/event/create-event
Description: Allows authenticated users to create a new event by providing details like title, description, date, location, and the number of volunteers needed.

POST /api/v1/event/join/:eventId
Description: Enables authenticated users to join an event by providing the event ID.

PUT /api/v1/event/update/:eventId
Description: Allows the event creator to update event details, such as title, description, date, and location.

DELETE /api/v1/event/delete/:eventId
Description: Allows the event creator to delete an event by providing the event ID.

Setup Instructions

Prerequisites
Before starting, ensure you have the following installed:
Node.js (v16 or higher)
MongoDB (local or cloud-based)
NPM or Yarn (Node.js package managers)

1. Clone the Repository
   Clone the project repository to your local machine:

git clone https://github.com/your-username/hands-on-volunteer-platform.git
cd hands-on-volunteer-platform

2. Backend Setup
   Navigate to the backend directory:
   cd backend

Install dependencies:
npm install
Create a .env file in the backend directory and add the following environment variables:

DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=port_number
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Replace the placeholders with your actual values:
<username> and <password>: Your MongoDB credentials.
your_jwt_secret_key: A secret key for JWT token generation.
your-email@gmail.com and your-gmail-app-password: Your Gmail credentials for sending emails.
your_cloudinary_cloud_name, your_cloudinary_api_key, and your_cloudinary_api_secret: Your Cloudinary credentials for handling file uploads.

Start the backend server:
npm start
The backend will run on http://localhost:PORT.

3. Frontend Setup
   Navigate to the frontend directory:
   cd ../frontend

Install dependencies:
npm install

Start the frontend development server:
npm run dev
The frontend will run on http://localhost:5173/.

4. Access the Application
   Open your browser and visit http://localhost:5173/.

You can now use the HandsOn Volunteer Platform locally.

5. Running in Production
   To deploy the application in production:

Backend:
Deploy the backend to a cloud platform (e.g., Heroku, AWS, or Render).
Update the .env file with production environment variables.

Frontend:
Build the frontend for production:
npm run build
Deploy the build folder to a static hosting service (e.g., Vercel, Netlify, or GitHub Pages).

6. Cron Job Setup
   The backend includes a cron job to automatically update event statuses (upcoming → ongoing → completed) and add eventHours to users. This runs automatically when the backend server starts.

7. Troubleshooting
   Backend not running: Ensure MongoDB is running and the .env file is correctly configured.
   Frontend not connecting to backend: Verify the backend server is running and update the API base URL in the frontend if necessary.

   Email not sending: Ensure the email credentials in .env are correct and enable "Less secure apps" in your Gmail account settings.

Contact
If you have any questions or suggestions, feel free to reach out:

Email: dev.shumonkhan@gmail.com
GitHub: github.com/codewithshumon

Thank you for checking out the HandsOn Volunteer Platform! 🚀
