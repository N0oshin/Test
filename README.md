# Client Management System (CMS)

A full-stack application for managing clients, products, and order placement, powered by an Advanced Role-Based Access Control (RBAC) system that ensures user permissions and secure data operations.

---

## Project Overview

The Client Management System (CMS) streamlines business operations by enabling users (e.g., Sales Representatives) to manage clients, products, and transactions efficiently.  
At its core, it implements granular authorization control, ensuring every user action aligns with their assigned role permissions.

| Feature | Implementation | 
|----------|----------------|
| **Core Feature** | Advanced RBAC / Authorization(Permission checks on every API route) |   
| **Orders** | Transactional Dual-Payment System | 
| **Data Entities** | Clients, Products, Comments (Full CRUD for all entities)|
| **Technology** | Full-Stack, RESTful API  (React + Node.js + PostgreSQL) , + Context API for State Management (alternative to Redux) |

---

##  Technology Stack

| Component | Technology | 
|------------|-------------|
| **Frontend** | React.js  (State managed via Context API (useReducer) instead of Redux. UI styled with React-Bootstrap.) |
| **Backend** | Node.js / Express|
| **Database** | PostgreSQL  |
| **Security** | JWT / bcrypt |

---

##  Advanced Role-Based Authorization (RBAC)

Authorization is enforced at the middleware level for every API endpoint, ensuring that only users with valid permissions can access specific features.




Context API for State Management (lightweight alternative to Redux)
