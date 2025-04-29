# Project Title: SchoolCool - Backend

SchoolCool is an all-in-one school management web application that aims to streamline administrative processes, improve communication, and enhance the overall educational experience for students, teachers, and parents. The application will be built using a modern technology stack to provide a user-friendly, efficient, and secure platform.

The front-end will be designed with a responsive and intuitive user interface, ensuring a seamless experience across various devices. The back-end will consist of a robust API that handles all data transactions and supports role-based access control to protect sensitive information. The database will store and manage all relevant data, including student records, staff information, course schedules, attendance, and grades.

# Feature Set

The web-based application should provide the following feature set. Feel free to extend this to make the project more vibrant:

User Authentication: This feature supports the registration, login, and role-based access control for different user types, including administrators, teachers, students, and parents.
Student Management: This feature allows for the creation, modification, and deletion of student records, including personal information, enrolment status, and academic history.
Staff Management: This feature enables the administration to manage staff information, including personal details, employment status, and teaching assignments.
Course Scheduling: This feature facilitates the creation and management of course schedules, including class timings, room assignments, and instructor allocation.
Attendance Tracking: This feature allows teachers to record and track student attendance for each class, while administrators and parents can monitor overall attendance trends.
Grade Management: This feature enables teachers to input and manage student grades, as well as generate report cards and progress reports for parents.
Parent Portal: This feature provides parents with access to their children's academic information, including attendance, grades, and teacher feedback.
Communication Tools: This feature offers messaging functionality for direct communication between teachers, students, and parents, as well as group messaging for announcements and notifications.
Resource Management: This feature allows administrators to manage school resources, such as classrooms, labs, and equipment, and track their usage and availability.
Dashboard and Reporting: This feature provides users with personalized dashboards and generates various reports to help monitor performance and make data-driven decisions.

# API

1 - Post API for student Sigin and Faculty Sigin

- For Upload File Using Cloudinary, Multer , multer-storage-cloudinary
- Setting Image Format in cloudinary Like width hight size and many more
- Created Common Cloudinary and multer file
- Created Post Api For Faculty Signin Form Same as same Student Signin Api
- Solved One issue about cloudinary that when field validation is not perfect still image are uploading in cloudinary so make a validation if try catch catches a error then code will return from multer.js
  -Error When Pushing to vercel
- if data is not inserted into database because of any error but the image is uploaded so i solved this issue checking from controller if data is inserted into database then cloudinary function work and then upadted the student_profile cloudinary url into the field in the database
- after fighting all this error now i just make a login api so student or faculty ke easily login to the portal i have just make like first user have type their phone number or email id
  then he/she get otp code into email i also tried to get otp via sms with the help of twilio but unfortunately it doesn't work for unpaid so i decided to stick with email its doesn't matter user entering email or phone number otp will to their email only sending email functionality i used nodemailer it very famous easy to use.
- "solving nodmailer error not sending mail on vercel" this commit now the issue is solved now on deployment phase otp mail is coming now proper i just want add await before
  await senderService(user, otp, otpExpiry); without await code goes to second line that why mail is not coming properly

2 - Post API for login user as per their role

- when user enter his number or mail they got otp in his own mail only
- also created one token checking api for after login to ensure that login credetial that user enter is correct and that matched to the token part
- one api for getting single user with the help of token in token have id that id will help to find the user from the faculty or student database
- and the last i created logout api for clear all the token from backend and also frontend cookies

2 - patch API for Updated

- for this i have created to api one for all the field to updated and for specially image updated wheen the user click on choose file and after thet select which dp want to set after they dont want to do anything its automatically loading in 2 3 sec dp will be display on the frontend and also saved into the database during this process cloudinary function will automatically delete old image and put a new image
