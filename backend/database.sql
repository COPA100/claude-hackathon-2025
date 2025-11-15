-- Main users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('student', 'faculty') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_picture_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Student profiles
CREATE TABLE student_profiles (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    major VARCHAR(100),
    year_of_study INT,
    gpa DECIMAL(3,2),
    bio TEXT,
    interests TEXT,
    skills TEXT,  
    resume_url VARCHAR(500),
    available_hours_per_week INT,
    looking_for_research BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Faculty profiles
CREATE TABLE faculty_profiles (
    faculty_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    department VARCHAR(100),
    title VARCHAR(100), 
    office_location VARCHAR(255),
    bio TEXT,
    research_interests TEXT,
    lab_website_url VARCHAR(500),
    lab_name VARCHAR(255),
    currently_recruiting BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Student experiences
CREATE TABLE student_experiences (
    experience_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    position VARCHAR(150),
    company VARCHAR(150),
    description TEXT,
    skills TEXT,
    start_date DATE,
    end_date DATE DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Research postings
CREATE TABLE research_postings (
    posting_id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    research_areas TEXT, 
    requirements TEXT,
    time_commitment VARCHAR(100),
    duration VARCHAR(100),
    compensation_type ENUM('paid', 'credit', 'volunteer') NOT NULL,
    compensation_details VARCHAR(255),
    start_date DATE,
    application_deadline DATE,
    status ENUM('open', 'closed', 'filled') DEFAULT 'open',
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty_profiles(faculty_id) ON DELETE CASCADE
);

-- Applications
CREATE TABLE applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    posting_id INT NOT NULL,
    student_id INT NOT NULL,
    cover_letter TEXT,
    status ENUM('pending', 'reviewed', 'accepted', 'rejected', 'withdrawn') DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posting_id) REFERENCES research_postings(posting_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (posting_id, student_id)
);

-- Saved postings
CREATE TABLE saved_postings (
    user_id INT,
    posting_id INT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, posting_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (posting_id) REFERENCES research_postings(posting_id) ON DELETE CASCADE
);