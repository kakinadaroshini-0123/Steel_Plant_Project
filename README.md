# Steel Plant Employee Management System

This is a small web application made for managing employee-related work in a steel plant. It has separate login access for HR and employees.

Employees can check their profile, mark attendance, apply for leave, and see their leave status. HR can view employee details and approve or reject leave requests.

## What the project can do

- HR and Employee login
- Employee profile management
- Attendance marking using location
- Leave request form
- Leave approval and rejection by HR
- Employee leave-status page
- Password change option

## Technologies used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js and Express.js
- **Database:** MySQL
- **Password security:** bcrypt
- **Icons:** Font Awesome

## Folder details

```text
Steel_Plant_Project/
|-- frontend/       # All HTML, CSS and JavaScript files for the screens
|-- backend/        # Server, API routes, database connection and controllers
|-- index.html      # Redirects to the main portal page
`-- README.md
```

## How to run the project

1. Install Node.js and MySQL on your computer.
2. Open the project in VS Code or a terminal.
3. Go inside the backend folder:

   ```powershell
   cd backend
   ```

4. Install the required packages:

   ```powershell
   npm install
   ```

5. Create a `.env` file inside the `backend` folder and add your MySQL details:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=steel_plant_db
   PORT=5000
   ```

6. Start the server:

   ```powershell
   node server.js
   ```

7. Open `http://localhost:5000` in the browser.

## Login details

First select the role you want to use: **HR** or **Employee**. Then enter the Employee ID or email address and the password for that account.

The selected role should match the role saved for that user in the database:

- `hr` for an HR account
- `employee` for an employee account

The application checks the login details from the `users` table in MySQL.

## About passwords

Passwords are not saved as normal text. They are saved as bcrypt hashes for security. Because of this, the project does not contain a list of real passwords or demo passwords.

To create a password hash for a new user, run this command from the `backend` folder:

```powershell
node hashPassword.js
```

Type a password when asked. Copy the generated hash and save it in the `password` column of the `users` table. The user can then log in using the original password.

For every user, the `users` table should have at least:

- Employee ID
- Employee name
- Email
- Role (`hr` or `employee`)
- Hashed password

## Database tables used

- `users` - stores employee and HR account details
- `employee_attendance` - stores attendance records
- `leave_requests` - stores leave applications and their status

## API routes used

- `POST /auth/login` - login
- `GET /auth/status` - checks backend and database connection
- `GET /employee/:id` - gets employee profile details
- `PUT /employee/:id` - updates employee profile details
- `POST /self-attendance` - marks attendance
- `POST /leave` - submits a leave request
- `GET /leave-status/:id` - gets leave status for an employee
- `GET /employees` - gets employee list for HR
- `GET /leaves` - gets leave requests for HR
- `PUT /approve/:id` - approves a leave request
- `PUT /reject/:id` - rejects a leave request

## Important note

Do not upload your `.env` file or real database passwords to GitHub. Before using this project for real users, add stronger access control and server-side security checks for HR features.
