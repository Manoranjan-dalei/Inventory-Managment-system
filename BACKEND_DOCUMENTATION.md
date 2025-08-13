# IMS Backend Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Database Design](#database-design)
- [Security](#security)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Overview

The IMS (Inventory Management System) backend is a Spring Boot application that provides RESTful APIs for inventory management, user authentication, and data persistence. Built with Java 17 and Spring Boot 3.x, it features JWT authentication, role-based access control, and comprehensive product management capabilities.

## 🛠️ Tech Stack

- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Database**: H2 (Development) / MySQL (Production)
- **ORM**: Spring Data JPA with Hibernate
- **Security**: Spring Security with JWT
- **Build Tool**: Maven
- **Documentation**: Spring Boot Actuator
- **Testing**: JUnit 5, Mockito

## 📁 Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── Inventory/
│   │           └── demo/
│   │               ├── config/
│   │               │   ├── DataInitializer.java
│   │               │   ├── JwtAuthenticationFilter.java
│   │               │   └── SecurityConfig.java
│   │               ├── controller/
│   │               │   ├── AuthController.java
│   │               │   └── ProductController.java
│   │               ├── dto/
│   │               │   ├── AuthDto.java
│   │               │   └── ProductDto.java
│   │               ├── entity/
│   │               │   ├── Product.java
│   │               │   └── User.java
│   │               ├── repository/
│   │               │   ├── ProductRepository.java
│   │               │   └── UserRepository.java
│   │               ├── service/
│   │               │   ├── ProductService.java
│   │               │   └── UserService.java
│   │               ├── util/
│   │               │   └── JwtUtil.java
│   │               └── InventoryManagmentSystemApplication.java
│   └── resources/
│       ├── application.properties
│       ├── static/
│       └── templates/
└── test/
    └── java/
        └── com/
            └── Inventory/
                └── demo/
                    └── InventoryManagmentSystemApplicationTests.java
```

## 🏗️ Architecture

### Layered Architecture

1. **Controller Layer**: REST API endpoints
2. **Service Layer**: Business logic
3. **Repository Layer**: Data access
4. **Entity Layer**: Data models

### Design Patterns

- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data transfer objects
- **Singleton Pattern**: JWT utility
- **Filter Pattern**: JWT authentication filter

## 🔌 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/login`

- **Purpose**: User authentication
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here",
    "username": "admin",
    "role": "ADMIN",
    "fullName": "Administrator"
  }
  ```

### Product Endpoints

#### GET `/api/products`

- **Purpose**: Get all products
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of products

#### GET `/api/products/{id}`

- **Purpose**: Get product by ID
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Single product

#### POST `/api/products`

- **Purpose**: Create new product
- **Access**: Admin only
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "category": "Electronics",
    "sku": "SKU123",
    "supplier": "Supplier Name",
    "location": "Warehouse A",
    "price": 99.99,
    "quantity": 100
  }
  ```

#### PUT `/api/products/{id}`

- **Purpose**: Update product
- **Access**: Admin only
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: Same as POST

#### DELETE `/api/products/{id}`

- **Purpose**: Delete product
- **Access**: Admin only
- **Headers**: `Authorization: Bearer <token>`

## 🗄️ Database Design

### Entity Models

#### User Entity

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String fullName;
}
```

#### Product Entity

```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    private String category;
    private String sku;
    private String supplier;
    private String location;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### Enums

#### Role Enum

```java
public enum Role {
    ADMIN, USER
}
```

#### ProductStatus Enum

```java
public enum ProductStatus {
    IN_STOCK, LOW_STOCK, OUT_OF_STOCK
}
```

## 🔐 Security

### JWT Authentication

- **Token Type**: JWT (JSON Web Token)
- **Algorithm**: HS256
- **Expiration**: 24 hours
- **Secret Key**: Configurable in application.properties

### Spring Security Configuration

- **CORS**: Configured for React frontend
- **Authentication**: JWT-based
- **Authorization**: Role-based access control
- **Password Encoding**: BCrypt

### Security Features

- **JWT Filter**: Custom authentication filter
- **CORS Support**: Cross-origin resource sharing
- **Role-based Access**: Admin and User roles
- **Secure Headers**: Security headers configuration

## ⚙️ Configuration

### Application Properties

#### Database Configuration

```properties
# H2 Database (Development)
spring.datasource.url=jdbc:h2:mem:inventory_db
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# MySQL Database (Production)
# spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db
# spring.datasource.username=root
# spring.datasource.password=Happy@2003
# spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

#### JPA Configuration

```properties
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

#### Server Configuration

```properties
server.port=8080
```

#### CORS Configuration

```properties
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

#### JWT Configuration

```properties
jwt.secret=your-super-secret-jwt-key-must-be-at-least-256-bits-long-for-hs256-algorithm
jwt.expiration=86400000
```

## 🚀 Development

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- IDE (IntelliJ IDEA, Eclipse, VS Code)

### Local Development Setup

#### 1. Clone Repository

```bash
git clone <repository-url>
cd Inventory-Managment-system
```

#### 2. Build Project

```bash
mvn clean install
```

#### 3. Run Application

```bash
# Using Maven
mvn spring-boot:run

# Using Maven Wrapper
./mvnw spring-boot:run

# Using JAR file
java -jar target/InventoryManagmentSystem-0.0.1-SNAPSHOT.jar
```

#### 4. Access Application

- **API**: http://localhost:8080
- **H2 Console**: http://localhost:8080/h2-console

### Development Tools

#### H2 Database Console

- **URL**: http://localhost:8080/h2-console
- **JDBC URL**: `jdbc:h2:mem:inventory_db`
- **Username**: `sa`
- **Password**: (empty)

#### API Testing

- **Postman**: Import collection for API testing
- **cURL**: Command-line API testing
- **Swagger**: API documentation (if configured)

## 🧪 Testing

### Unit Tests

```bash
mvn test
```

### Integration Tests

```bash
mvn verify
```

### Test Coverage

```bash
mvn jacoco:report
```

## 📦 Deployment

### Production Setup

#### 1. Database Configuration

Update `application.properties` for MySQL:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
```

#### 2. Build JAR

```bash
mvn clean package -DskipTests
```

#### 3. Run Production

```bash
java -jar target/InventoryManagmentSystem-0.0.1-SNAPSHOT.jar
```

### Docker Deployment

#### Dockerfile

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/InventoryManagmentSystem-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### Docker Commands

```bash
# Build image
docker build -t ims-backend .

# Run container
docker run -p 8080:8080 ims-backend
```

## 🔧 Key Components

### Controllers

#### AuthController

- **Purpose**: Handle authentication requests
- **Endpoints**: Login
- **Features**: JWT token generation

#### ProductController

- **Purpose**: Handle product CRUD operations
- **Endpoints**: GET, POST, PUT, DELETE
- **Features**: Role-based access control

### Services

#### UserService

- **Purpose**: User business logic
- **Features**: Authentication, password encoding

#### ProductService

- **Purpose**: Product business logic
- **Features**: CRUD operations, status management

### Repositories

#### UserRepository

- **Purpose**: User data access
- **Features**: JPA repository methods

#### ProductRepository

- **Purpose**: Product data access
- **Features**: Custom queries, filtering

### Configuration

#### SecurityConfig

- **Purpose**: Spring Security configuration
- **Features**: JWT filter, CORS, role-based access

#### DataInitializer

- **Purpose**: Initialize demo data
- **Features**: Sample users and products

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Check port usage
netstat -ano | findstr :8080

# Kill process
taskkill /PID <process_id> /F
```

#### 2. Database Connection Issues

- Verify database is running
- Check connection properties
- Ensure database exists

#### 3. CORS Issues

- Verify CORS configuration
- Check frontend URL
- Ensure proper headers

#### 4. JWT Issues

- Check JWT secret configuration
- Verify token expiration
- Ensure proper token format

### Logging

```properties
logging.level.org.springframework.web=INFO
logging.level.com.Inventory.demo=DEBUG
logging.level.org.springframework.security=DEBUG
```

## 📈 Performance

### Optimization Tips

1. **Database Indexing**: Add indexes for frequently queried fields
2. **Connection Pooling**: Configure HikariCP settings
3. **Caching**: Implement Redis caching for frequently accessed data
4. **Pagination**: Implement pagination for large datasets

### Monitoring

- **Actuator**: Health checks and metrics
- **Logging**: Structured logging with SLF4J
- **Profiling**: JVM profiling tools

## 🔮 Future Enhancements

### Planned Features

- **Audit Logging**: Track all changes
- **File Upload**: Product image upload
- **Email Notifications**: Low stock alerts
- **Bulk Operations**: Import/export functionality
- **Advanced Search**: Full-text search with Elasticsearch

### Scalability

- **Microservices**: Break into smaller services
- **Load Balancing**: Multiple instances
- **Database Sharding**: Horizontal scaling
- **Caching Layer**: Redis implementation

## 📞 Support

For technical support or questions about the backend implementation, refer to:

- Spring Boot documentation
- Spring Security documentation
- JPA/Hibernate documentation
- Project README files

---

**Last Updated**: January 2024
**Version**: 1.0.0
