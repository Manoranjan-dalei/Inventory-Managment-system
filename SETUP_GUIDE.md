# IMS Project Setup Guide

## 🚀 Quick Start Guide

This guide will help you set up and run the Inventory Management System (IMS) project on your local machine after cloning the repository.

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your system:

### Required Software

- **Java 17** or higher
- **Node.js 16** or higher
- **npm** or **yarn**
- **Git** (for cloning)

### Optional Software

- **MySQL** (for production database)
- **IDE** (IntelliJ IDEA, Eclipse, VS Code)

## 🔧 Installation Steps

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Inventory-Managment-system
```

### Step 2: Set Up the Backend

#### 2.1 Navigate to Backend Directory

```bash
# You're already in the root directory
# The backend is in the root folder
```

#### 2.2 Build the Backend

```bash
# Using Maven Wrapper (recommended)
./mvnw clean install

# Or using Maven directly (if installed globally)
mvn clean install
```

#### 2.3 Run the Backend

```bash
# Using Maven Wrapper
./mvnw spring-boot:run

# Or using Maven directly
mvn spring-boot:run
```

**✅ Backend should now be running on:** `http://localhost:8080`

### Step 3: Set Up the Frontend

#### 3.1 Navigate to Frontend Directory

```bash
cd IMS-Frontend
```

#### 3.2 Install Dependencies

```bash
npm install
```

#### 3.3 Run the Frontend

```bash
npm run dev
```

**✅ Frontend should now be running on:** `http://localhost:5173`

## 🌐 Access the Application

### Frontend Application

- **URL**: http://localhost:5173
- **Landing Page**: http://localhost:5173/
- **Login Page**: http://localhost:5173/login

### Backend API

- **API Base URL**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console

## 🔐 Login Credentials

### Demo Users

#### Admin User

- **Username**: `admin`
- **Password**: `admin123`
- **Permissions**: Full access to all features

#### Regular User

- **Username**: `user`
- **Password**: `user123`
- **Permissions**: View-only access

## 🗄️ Database Configuration

### Current Setup (Development)

The project is currently configured to use **H2 in-memory database** for development.

### To Switch to MySQL (Production)

#### 1. Install MySQL

- Download and install MySQL Server
- Create a database named `inventory_db`

#### 2. Update Configuration

Edit `src/main/resources/application.properties`:

```properties
# Comment out H2 configuration
# spring.datasource.url=jdbc:h2:mem:inventory_db
# spring.datasource.driverClassName=org.h2.Driver
# spring.datasource.username=sa
# spring.datasource.password=
# spring.h2.console.enabled=true
# spring.h2.console.path=/h2-console

# Uncomment and configure MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Update JPA dialect
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
```

#### 3. Restart Backend

```bash
# Stop the current backend (Ctrl+C)
# Then restart
./mvnw spring-boot:run
```

## 🛠️ Development Commands

### Backend Commands

```bash
# Build project
./mvnw clean install

# Run in development mode
./mvnw spring-boot:run

# Run tests
./mvnw test

# Build JAR for production
./mvnw clean package -DskipTests

# Run production JAR
java -jar target/InventoryManagmentSystem-0.0.1-SNAPSHOT.jar
```

### Frontend Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

**Backend (Port 8080)**

```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <process_id> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

**Frontend (Port 5173)**

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <process_id> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

#### 2. Java Version Issues

```bash
# Check Java version
java -version

# Should show Java 17 or higher
```

#### 3. Node.js Version Issues

```bash
# Check Node.js version
node --version

# Should show v16 or higher
```

#### 4. Maven Issues

```bash
# Check Maven version
./mvnw --version

# Clean and rebuild
./mvnw clean install
```

#### 5. Frontend Build Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 6. CORS Issues

If you see CORS errors in the browser console:

- Ensure backend is running on port 8080
- Ensure frontend is running on port 5173
- Check that CORS is properly configured in `application.properties`

## 📁 Project Structure Overview

```
Inventory-Managment-system/
├── src/                          # Backend source code
│   ├── main/
│   │   ├── java/
│   │   │   └── com/Inventory/demo/
│   │   │       ├── config/       # Configuration classes
│   │   │       ├── controller/   # REST API controllers
│   │   │       ├── dto/          # Data Transfer Objects
│   │   │       ├── entity/       # Database entities
│   │   │       ├── repository/   # Data access layer
│   │   │       ├── service/      # Business logic
│   │   │       └── util/         # Utility classes
│   │   └── resources/
│   │       └── application.properties
├── IMS-Frontend/                 # Frontend React application
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── contexts/             # React contexts
│   │   ├── pages/                # Page components
│   │   └── ...
│   ├── package.json
│   └── ...
├── pom.xml                       # Maven configuration
├── mvnw                          # Maven wrapper
└── README.md
```

## 🔧 Configuration Files

### Backend Configuration

- **`application.properties`**: Database, JWT, CORS settings
- **`pom.xml`**: Maven dependencies and build configuration

### Frontend Configuration

- **`package.json`**: Node.js dependencies and scripts
- **`vite.config.js`**: Vite build configuration
- **`tailwind.config.js`**: Tailwind CSS configuration

## 🧪 Testing the Setup

### 1. Backend Health Check

- Visit: http://localhost:8080
- Should see Spring Boot welcome page or API response

### 2. H2 Database Console

- Visit: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:inventory_db`
- Username: `sa`
- Password: (leave empty)

### 3. Frontend Application

- Visit: http://localhost:5173
- Should see the IMS landing page

### 4. Login Test

- Go to: http://localhost:5173/login
- Try logging in with demo credentials:
  - Admin: `admin` / `admin123`
  - User: `user` / `user123`

## 📚 Additional Resources

### Documentation Files

- **`FRONTEND_DOCUMENTATION.md`**: Detailed frontend documentation
- **`BACKEND_DOCUMENTATION.md`**: Detailed backend documentation
- **`ROLE_DIFFERENCES.md`**: User role permissions guide

### Useful Links

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🚀 Production Deployment

### Backend Deployment

1. Build the JAR file: `./mvnw clean package -DskipTests`
2. Configure MySQL database
3. Update `application.properties` for production
4. Run: `java -jar target/InventoryManagmentSystem-0.0.1-SNAPSHOT.jar`

### Frontend Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your web server
3. Configure API base URL for production

## 📞 Support

If you encounter any issues during setup:

1. **Check the troubleshooting section above**
2. **Review the detailed documentation files**
3. **Check console logs for error messages**
4. **Verify all prerequisites are installed correctly**

### Common Support Questions

- **Q**: Why can't I access the application?

  - **A**: Ensure both backend (port 8080) and frontend (port 5173) are running

- **Q**: Login not working?

  - **A**: Use the demo credentials: admin/admin123 or user/user123

- **Q**: Database connection issues?
  - **A**: Check if MySQL is running and credentials are correct

---

**🎉 Congratulations!** You should now have the IMS application running successfully on your local machine.

**Next Steps:**

1. Explore the application features
2. Test different user roles
3. Add your own products
4. Customize the system for your needs

**Happy Coding! 🚀**
