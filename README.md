⭐ Secure Multi-Level Form Validation and Data Integrity System

A Secure Online Internship Registration Portal developed using PHP, MySQL, JavaScript, and AJAX.
This project demonstrates multi-level validation and secure web application practices to protect against common vulnerabilities such as SQL Injection, Cross-Site Scripting (XSS), duplicate registrations, and malicious file uploads.

📌 Project Scenario

A university requires a secure internship registration portal where students can submit their internship applications.

Students must provide the following information:

* Student ID

* Full Name

* Email
 
* Password

* Confirm Password

* CNIC

* Phone Number

* CGPA

* Department


Resume Upload (PDF only)

The system ensures secure validation and data integrity before storing information in the database.


🚀 Key Features

✔ Client-Side Validation using JavaScript

✔ Server-Side Validation using PHP

✔ Database Integrity Constraints using MySQL

✔ AJAX Email Availability Check

✔ Secure Password Hashing

✔ Duplicate Registration Prevention

✔ Secure Resume Upload System

✔ Protection Against Common Web Attacks


🧾 Validation Rules

* Student ID: FA21-BCS-001

* Email: Must follow valid email format

 Password must contain:

* Minimum 8 characters

* 1 uppercase letter

* 1 lowercase letter

* 1 number

* 1 special character

* CNIC: 12345-1234567-1

* Phone Number: 03XXXXXXXXX

* CGPA: Range 0.00 – 4.00


Resume Upload:

* PDF only

* Maximum 2MB


🛠 Technologies Used

* HTML5 – Form structure

* CSS3 – UI styling

* JavaScript – Client-side validation

* AJAX – Email availability checking

* PHP – Server-side processing

* MySQL – Database management

```
📂 Project Structure
Secure-Internship-Portal
│
├── index.html
├── register.php
├── check_email.php
├── db_connect.php
│
├── css
│   └── style.css
│
├── js
│   ├── validation.js
│   └── ajax_email.js
│
├── uploads
│
└── README.md
```

🔐 Security Implementations

🛡 SQL Injection Protection

* Database queries use prepared statements.

* User input cannot modify SQL commands.


🛡 Cross-Site Scripting (XSS) Protection

* All outputs are sanitized using:

* htmlspecialchars()

Prevents execution of malicious scripts.


🛡 Duplicate Registration Prevention

Implemented using:

* Database UNIQUE constraints

* Server-side validation


🛡 Secure File Upload Handling

* Resume uploads are validated using:

* File extension check (PDF only)

* File size limit (2MB maximum)

* MIME type verification

* Safe storage inside uploads folder


🧪 Security Testing

1️⃣ If JavaScript is Disabled

The system remains secure because all validations are re-checked on the server using PHP.

2️⃣ SQL Injection Attempt

Prepared statements prevent attackers from injecting SQL commands.

3️⃣ XSS Attack

Output escaping using htmlspecialchars() prevents execution of malicious scripts.

4️⃣ Uploading .php File Renamed as .pdf

* The server verifies the actual file type.

* The upload is rejected if it is not a valid PDF.

⚙️ Setup Instructions

1️⃣ Install Local Server

Install XAMPP or WAMP.

2️⃣ Clone the Repository
git clone https://github.com/yourusername/project-name.git

3️⃣ Move Project Folder

Place the project inside:

htdocs/

4️⃣ Configure Database

Update database credentials inside:

db_connect.php

5️⃣ Run the Project

Open in browser: [http://localhost/project-folder](https://musfiraahmed31.github.io/secure_online_internship_registration_portal./)

🎯 Learning Outcomes

This project demonstrates:

✔ Secure web form validation

✔ Full-stack validation architecture

✔ Secure database interaction

✔ Protection against common web attacks

✔ Safe file upload implementation


👨‍💻 Author

Musfira Ahmed
BS Software Engineering Student
