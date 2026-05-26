USE steelplant;

CREATE TABLE employees (

id INT PRIMARY KEY AUTO_INCREMENT,

employee_id VARCHAR(20) UNIQUE,

full_name VARCHAR(100),

department VARCHAR(100),

phone VARCHAR(15),

email VARCHAR(100),

shift_name VARCHAR(20),

blood_group VARCHAR(10),

address TEXT,

emergency_contact VARCHAR(15),

joining_date DATE,

employee_status VARCHAR(20),

profile_photo VARCHAR(255),

password VARCHAR(100)

);

CREATE TABLE users(

employee_id VARCHAR(20) PRIMARY KEY,

password VARCHAR(255),

role VARCHAR(20)

);

CREATE TABLE attendance(

id INT PRIMARY KEY AUTO_INCREMENT,

employee_id VARCHAR(20),

attendance_date DATE,

status VARCHAR(20)

);

CREATE TABLE leave_requests(

id INT PRIMARY KEY AUTO_INCREMENT,

employee_id VARCHAR(20),

leave_type VARCHAR(50),

from_date DATE,

to_date DATE,

reason TEXT,

status VARCHAR(20)

);

INSERT INTO employees
(employee_id,full_name,department,phone,email,shift_name,blood_group,address,emergency_contact,joining_date,employee_status,profile_photo,password)

VALUES

('100100','Ravi Kumar','Blast Furnace','9876543210','ravi@gmail.com','Morning','O+','Vizag','9123456780','2023-06-12','Active','profile.png','12345'),

('100102','Priya Sharma','Rolling Mill','9876543211','priya@gmail.com','Evening','B+','Steel Colony','9123456781','2023-07-20','Active','profile.png','12321'),

('100103','Rahul Reddy','Maintenance','9876543212','rahul@gmail.com','Night','A+','Kurmannapalem','9123456782','2023-08-15','Active','profile.png','34543'),

('100104','Sneha Rao','Quality Control','9876543213','sneha@gmail.com','Morning','AB+','Gajuwaka','9123456783','2023-09-10','Active','profile.png','12345');

INSERT INTO users(employee_id,password,role)

VALUES

('100100','12345','employee'),
('100102','12321','employee'),
('100103','34543','employee'),
('100104','12345','employee'),
('200100','54321','hr');