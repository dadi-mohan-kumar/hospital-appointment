# Hospital Management System - Backend

A comprehensive RESTful API for managing hospital operations including patient registration, doctor management, and appointment scheduling.

## 🚀 Features

- **Role-Based Authentication**: Admin, Doctor, and Patient roles
- **User Management**: Complete CRUD operations for users
- **Doctor Management**: Manage doctor profiles, specializations, and availability
- **Patient Management**: Patient records and medical history
- **Appointment System**: Book, update, and manage appointments
- **RESTful API**: Well-structured endpoints following REST principles

## 🛠️ Technology Stack

- **Java 17**
- **Spring Boot**
- **Spring Data JPA**
- **Spring Security**
- **MySQL Database**
- **Maven**

## 🔧 Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/dadi-mohan-kumar/hospital-backend.git
cd hospital-backend
```

### 2. Configure Database

Create a MySQL database:
```sql
CREATE DATABASE hospital_db;
```

Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=root
spring.datasource.password=12345678
```


The API will be available at `http://localhost:8080`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register/patient` | Register as patient |
| POST | `/api/auth/register/doctor` | Register as doctor |
| POST | `/api/auth/register/admin` | Register as admin |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/{id}` | Get doctor by ID |
| GET | `/api/doctors/user/{userId}` | Get doctor by user ID |
| GET | `/api/doctors/specialization/{spec}` | Get doctors by specialization |
| PUT | `/api/doctors/{id}` | Update doctor |
| DELETE | `/api/doctors/{id}` | Delete doctor |

### Patients

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{id}` | Get patient by ID |
| GET | `/api/patients/user/{userId}` | Get patient by user ID |
| PUT | `/api/patients/{id}` | Update patient |
| DELETE | `/api/patients/{id}` | Delete patient |

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/{id}` | Get appointment by ID |
| GET | `/api/appointments/patient/{id}` | Get patient appointments |
| GET | `/api/appointments/doctor/{id}` | Get doctor appointments |
| POST | `/api/appointments` | Create appointment |
| PUT | `/api/appointments/{id}` | Update appointment |
| PATCH | `/api/appointments/{id}/status` | Update appointment status |
| DELETE | `/api/appointments/{id}` | Delete appointment |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard/stats` | Get dashboard statistics |
| DELETE | `/api/admin/users/{userId}` | Delete user (admin only) |


### Deploy on Render

1. **Create MySQL Database** (Railway/Aiven)
   - Get connection details

2. **Push to GitHub**
```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
```

3. **Create Web Service on Render**
   - Connect GitHub repository
   - Set build command: `./mvnw clean install -DskipTests`
   - Set start command: `java -Dserver.port=$PORT -jar target/hospital-management-0.0.1-SNAPSHOT.jar`

4. **Add Environment Variables**
```
   DATABASE_URL=jdbc:mysql://host:port/database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   PORT=8080
```

5. Deploy and wait for completion

## 📁 Project Structure
```
hospital-management-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/hospital/
│   │   │       ├── config/          # Configuration classes
│   │   │       ├── controller/      # REST controllers
│   │   │       ├── entity/          # JPA entities
│   │   │       ├── repository/      # Data repositories
│   │   │       ├── request/         # Request DTOs
│   │   │       ├── response/        # Response DTOs
│   │   │       └── service/         # Business logic
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```


## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection URL | jdbc:mysql://localhost:3306/hospital_db |
| `DB_USERNAME` | Database username | root |
| `DB_PASSWORD` | Database password | - |
| `PORT` | Server port | 8080 |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👤 Author

Your Name - [GitHub](https://github.com/dadi-mohan-kumar)

## 🔗 Links

- **Frontend Repository**: [hospital-frontend](https://github.com/dadi-mohan-kumar/hospital-frontend)
- **Live API**: [https://hospital-backend.onrender.com](https://hospital-backend.onrender.com)
- **Documentation**: [API Docs](https://hospital-backend.onrender.com/swagger-ui.html)

## 📧 Support

For support, email mohankumardadi@gmail.com   

---

**Made with ❤️ using Spring Boot**