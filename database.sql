CREATE DATABASE IF NOT EXISTS university_portal;
USE university_portal;

CREATE TABLE students (
    student_id VARCHAR(20) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cnic VARCHAR(15) NOT NULL UNIQUE,
    phone VARCHAR(11) NOT NULL,
    cgpa DECIMAL(3, 2) NOT NULL,
    department VARCHAR(50) NOT NULL,
    resume_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_cgpa CHECK (cgpa >= 0.00 AND cgpa <= 4.00),
    CONSTRAINT chk_cnic_length CHECK (CHAR_LENGTH(cnic) = 15),
    CONSTRAINT chk_phone_length CHECK (CHAR_LENGTH(phone) = 11)
);
