# IMS Pro - System Flowcharts & Diagrams
## Visual Representation of System Architecture and User Flows

---

## 📊 **SYSTEM OVERVIEW FLOWCHART**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           IMS PRO SYSTEM OVERVIEW                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    HTTP Requests/Responses    ┌─────────────┐             │
│  │             │◄─────────────────────────────►│             │             │
│  │   CLIENT    │                               │   SERVER    │             │
│  │  (Browser)  │                               │ (Spring Boot)│             │
│  │             │                               │             │             │
│  │ • HTML5     │                               │ • Java      │             │
│  │ • CSS3      │                               │ • Spring MVC│             │
│  │ • JavaScript│                               │ • Thymeleaf │             │
│  │ • Responsive│                               │ • JPA       │             │
│  └─────────────┘                               └─────┬───────┘             │
│                                                       │                     │
│                                                       │ Database            │
│                                                       │ Connection          │
│                                                       ▼                     │
│                                               ┌─────────────┐             │
│                                               │             │             │
│                                               │  DATABASE   │             │
│                                               │   (MySQL)   │             │
│                                               │             │             │
│                                               │ • Products  │             │
│                                               │ • Users     │             │
│                                               │ • Relations │             │
│                                               └─────────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 **APPLICATION STARTUP FLOW**

```
┌─────────────────┐
│ Application     │
│ Startup         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Spring Boot     │
│ Initialization  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Load            │
│ application.properties
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Connect to      │
│ MySQL Database  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ DataInitializer │
│ (CommandLineRunner)
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Check if users  │
│ exist in DB     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Create default  │
│ users if none   │
│ exist:          │
│ • admin/admin123│
│ • user/user123  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Create sample   │
│ products if     │
│ none exist      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Start embedded  │
│ Tomcat server   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Application     │
│ ready on        │
│ http://localhost:8080
└─────────────────┘
```

---

## 👤 **USER AUTHENTICATION FLOW**

```
┌─────────────────┐
│ User visits     │
│ /login          │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Display login   │
│ page with       │
│ Admin/User      │
│ options         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ User selects    │
│ user type and   │
│ enters          │
│ credentials     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ POST /login     │
│ to HomeController
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Validate        │
│ credentials     │
│ against User    │
│ table           │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Check if        │
│ userType matches│
│ user role       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Authentication  │
│ Successful?     │
└─────┬─────┬─────┘
      │     │
      │     │ NO
      │     ▼
      │ ┌─────────────────┐
      │ │ Show error      │
      │ │ message         │
      │ │ Stay on login   │
      │ │ page            │
      │ └─────────────────┘
      │
      │ YES
      ▼
┌─────────────────┐
│ Set session     │
│ attributes:     │
│ • user          │
│ • userId        │
│ • username      │
│ • userRole      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Update          │
│ lastLogin       │
│ timestamp       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Redirect to     │
│ /products       │
└─────────────────┘
```

---

## 📦 **PRODUCT MANAGEMENT FLOW**

### Add Product Flow
```
┌─────────────────┐
│ User clicks     │
│ "Add Product"   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ GET /products/add│
│ ProductController│
│ .showAddForm()  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Return          │
│ add.html        │
│ template        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ User fills      │
│ product form    │
│ with details    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ POST /products  │
│ Submit form     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductController│
│ .saveProduct()  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductService  │
│ .saveProduct()  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Set timestamps: │
│ • createdAt     │
│ • updatedAt     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductRepository│
│ .save()         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Save to         │
│ MySQL database  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Redirect to     │
│ /products with  │
│ success message │
└─────────────────┘
```

### Edit Product Flow
```
┌─────────────────┐
│ User clicks     │
│ "Edit" button   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ GET /products/  │
│ edit/{id}       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductController│
│ .showEditForm() │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Find product    │
│ by ID           │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Product found?  │
└─────┬─────┬─────┘
      │     │
      │     │ NO
      │     ▼
      │ ┌─────────────────┐
      │ │ Redirect to     │
      │ │ /products with  │
      │ │ error message   │
      │ └─────────────────┘
      │
      │ YES
      ▼
┌─────────────────┐
│ Return          │
│ edit.html with  │
│ product data    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ User modifies   │
│ product details │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ POST /products/ │
│ update          │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductController│
│ .updateProduct()│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Set updatedAt   │
│ timestamp       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Save updated    │
│ product to DB   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Redirect to     │
│ /products with  │
│ success message │
└─────────────────┘
```

### Delete Product Flow
```
┌─────────────────┐
│ User clicks     │
│ "Delete" button │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ JavaScript      │
│ confirmation    │
│ dialog          │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ User confirms   │
│ deletion?       │
└─────┬─────┬─────┘
      │     │
      │     │ NO
      │     ▼
      │ ┌─────────────────┐
      │ │ Cancel          │
      │ │ operation       │
      │ └─────────────────┘
      │
      │ YES
      ▼
┌─────────────────┐
│ GET /products/  │
│ delete/{id}     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductController│
│ .deleteProduct()│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Find product    │
│ by ID           │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Product found?  │
└─────┬─────┬─────┘
      │     │
      │     │ NO
      │     ▼
      │ ┌─────────────────┐
      │ │ Redirect with   │
      │ │ error message   │
      │ └─────────────────┘
      │
      │ YES
      ▼
┌─────────────────┐
│ Delete product  │
│ from database   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Redirect to     │
│ /products with  │
│ success message │
└─────────────────┘
```

---

## 🔍 **SEARCH & FILTER FLOW**

```
┌─────────────────┐
│ User types in   │
│ search box      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ JavaScript      │
│ captures input  │
│ (oninput event) │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Check if query  │
│ length >= 2     │
└─────┬─────┬─────┘
      │     │
      │     │ NO
      │     ▼
      │ ┌─────────────────┐
      │ │ Load all        │
      │ │ products        │
      │ └─────────────────┘
      │
      │ YES
      ▼
┌─────────────────┐
│ AJAX call to    │
│ /api/products/  │
│ search?q={query}│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductController│
│ .searchProducts()│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductService  │
│ .searchProducts()│
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ProductRepository│
│ .findByNameContaining│
│ .IgnoreCase()   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Query MySQL     │
│ database        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Return filtered │
│ results as JSON │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ JavaScript      │
│ updates table   │
│ display         │
└─────────────────┘
```

---

## 🗄️ **DATABASE INTERACTION FLOW**

```
┌─────────────────┐
│ Application     │
│ Layer           │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Repository      │
│ Layer           │
│ (JPA/Hibernate) │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Hibernate       │
│ Session         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Connection Pool │
│ (HikariCP)      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ MySQL Driver    │
│ (JDBC)          │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ MySQL Database  │
│ Server          │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Tables:         │
│ • products      │
│ • users         │
└─────────────────┘
```

---

## 🎨 **FRONTEND RENDERING FLOW**

```
┌─────────────────┐
│ User Request    │
│ (HTTP GET)      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Controller      │
│ processes       │
│ request         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Service layer   │
│ retrieves data  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Data added to   │
│ Model object    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Thymeleaf       │
│ template        │
│ processing      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ HTML generation │
│ with data       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ CSS styling     │
│ applied         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ JavaScript      │
│ initialization  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Final HTML      │
│ sent to browser │
└─────────────────┘
```

---

## 🔧 **ERROR HANDLING FLOW**

```
┌─────────────────┐
│ Exception       │
│ occurs          │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Exception type? │
└─────┬─────┬─────┘
      │     │
      │     │ Database
      │     │ Error
      │     ▼
      │ ┌─────────────────┐
      │ │ Log error       │
      │ │ Show user-      │
      │ │ friendly message│
      │ └─────────────────┘
      │
      │ Validation
      │ Error
      ▼
┌─────────────────┐
│ Log error       │
│ details         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Add error       │
│ message to      │
│ RedirectAttributes
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Redirect to     │
│ appropriate     │
│ page            │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Display error   │
│ message to user │
└─────────────────┘
```

---

## 📱 **RESPONSIVE DESIGN FLOW**

```
┌─────────────────┐
│ User accesses   │
│ application     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Browser detects │
│ screen size     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ CSS Media       │
│ Queries applied │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Screen size?    │
└─────┬─────┬─────┘
      │     │
      │     │ Mobile
      │     │ (< 768px)
      │     ▼
      │ ┌─────────────────┐
      │ │ Mobile layout   │
      │ │ • Stacked       │
      │ │ • Touch-friendly│
      │ │ • Simplified    │
      │ └─────────────────┘
      │
      │ Desktop
      │ (≥ 768px)
      ▼
┌─────────────────┐
│ Desktop layout  │
│ • Side-by-side  │
│ • Hover effects │
│ • Full features │
└─────────────────┘
```

---

## 🚀 **DEPLOYMENT FLOW**

```
┌─────────────────┐
│ Development     │
│ Complete        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Run tests       │
│ (Unit &         │
│ Integration)    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Build project   │
│ (mvn clean      │
│ package)        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Create JAR file │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Deploy to       │
│ target          │
│ environment     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Configure       │
│ environment     │
│ variables       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Start           │
│ application     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Monitor         │
│ application     │
│ health          │
└─────────────────┘
```

---

## 📊 **DATA FLOW SUMMARY**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───►│  Controller │───►│   Service   │───►│ Repository  │
│  Interface  │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       ▲                   │                   │                   │
       │                   │                   │                   │
       │                   ▼                   ▼                   ▼
       │            ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
       │            │ Thymeleaf   │    │ Business    │    │ Database    │
       │            │ Template    │    │ Logic       │    │ (MySQL)     │
       │            └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       └───────────────────┴───────────────────┴───────────────────┘
                              Response Flow
```

---

## 🎯 **KEY INTERACTION POINTS**

### 1. User → System
- **Login**: Authentication and authorization
- **Navigation**: Moving between pages
- **Data Entry**: Adding/editing products
- **Search**: Finding specific products

### 2. System → Database
- **CRUD Operations**: Create, Read, Update, Delete
- **Queries**: Search and filtering
- **Transactions**: Data consistency
- **Relationships**: User-product associations

### 3. Database → System
- **Data Retrieval**: Product and user information
- **Validation**: Data integrity checks
- **Performance**: Optimized queries
- **Security**: Access control

### 4. System → User
- **Responses**: Success/error messages
- **Rendering**: HTML pages with data
- **Validation**: Form validation feedback
- **Navigation**: Page redirects

---

*These flowcharts provide a visual understanding of how the IMS Pro system works, making it easier to explain the project to stakeholders, developers, and users.* 