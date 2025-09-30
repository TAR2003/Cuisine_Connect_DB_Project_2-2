# 🍽️ Cuisine Connect

**Cuisine Connect** is a comprehensive social networking and food ordering platform that connects food lovers, restaurants, and foodie pages. Developed as a database project for the 2nd year, 2nd semester CSE course, this full-stack application demonstrates advanced database design principles, complex SQL operations, and modern web development practices.

## 🏗️ Architecture Overview

### Technology Stack
- **Database**: Oracle Database 19c with PL/SQL functions, procedures, and triggers
- **Backend**: Node.js with Express.js framework
- **Frontend**: SvelteKit with modern component-based architecture
- **Development Tools**: Vite for build tooling, Prettier for code formatting

### System Components
- **Oracle Database Layer**: Comprehensive relational database with 19 interconnected tables
- **Express.js API Layer**: RESTful backend with Oracle DB integration
- **SvelteKit Frontend**: Responsive single-page application with component-based UI
- **File Management System**: Multer-based image upload and storage system

## 📊 Database Schema

### Core Entity Tables
- **USERS**: Central user management with authentication and profile data
- **CUSTOMER**: Customer-specific information and relationships
- **RESTAURANT**: Restaurant profiles with ratings and operational data
- **FOODIE_PAGE**: Social pages for food content creators
- **MENU**: Restaurant menu items with pricing and ratings
- **POSTS**: Social media posts with content, reactions, and engagement metrics

### Relationship Tables
- **FRIEND_REQUEST**: Customer friendship management
- **FOLLOW_LIST**: User-restaurant following relationships
- **PAGE_CONNECTION**: User connections to foodie pages
- **MESSAGES**: Direct messaging system between users
- **FOODORDER**: Food ordering and delivery tracking
- **RESERVATIONS**: Restaurant table reservation system

### Activity Tracking Tables
- **ADMIN_LOG**: Comprehensive system activity logging
- **NOTIFICATION**: User notification management
- **REACTS**: Post reaction tracking (likes, etc.)
- **COMMENTS**: Post comment system
- **REVIEW_POST**: Restaurant and menu item reviews

## 🔧 Database Features

### Sequences
- Auto-incrementing primary keys for all major entities
- Dedicated sequences: USER_ID_SEQ, CUSTOMER_ID_SEQ, RESTAURANT_ID_SEQ, etc.

### Functions
- **CHECK_PASS**: Password authentication with ORA_HASH encryption
- **GET_CUSTOMER**: Retrieve customer ID from user ID
- **GET_RESTAURANT**: Retrieve restaurant ID from user ID  
- **GET_PAGE**: Retrieve page ID from user ID
- **DELETE_POST**: Cascading post deletion with shared post handling

### Procedures
- **COUNT_TRANSACTION_FOR_ALL**: Calculate total system transactions
- Various data manipulation procedures for complex operations

### Triggers
- **INCREASE_REACT_COUNT**: Automatically update post reaction counts
- **INCREASE_COMMENT_COUNT**: Automatically update post comment counts
- **NEW_USER**: Log new user registrations
- **ADD_POST**: Log new post creation
- **ADD_ORDER**: Log food order placement
- **ADD_MENU**: Log new menu item additions

## 🌐 Backend API Architecture

### Core Dependencies
```json
{
  "express": "^4.18.2",
  "oracledb": "^6.0.3",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1"
}
```

### Database Configuration
- **Connection String**: localhost/ORCLPDB
- **User**: CuisineConnect
- **Connection Pooling**: Automatic connection management
- **Transaction Handling**: Auto-commit for data integrity

### API Endpoints
The backend provides comprehensive REST APIs for:
- User authentication and authorization
- Profile management and social connections
- Post creation, sharing, and interaction
- Restaurant menu management
- Food ordering and delivery tracking
- Real-time messaging system
- Administrative dashboard operations
- File upload and image management

### File Management
- **Image Upload**: Multer-based file handling
- **File Storage**: Organized directory structure for profile pictures, cover photos, and post images
- **File Naming**: Systematic naming convention with user/post IDs and extensions

## 🎨 Frontend Architecture

### SvelteKit Structure
```
frontend/src/
├── routes/
│   ├── +layout.svelte          # Root layout component
│   ├── +page.svelte            # Landing page
│   ├── login/                  # Authentication pages
│   ├── createaccount/          # User registration
│   ├── user/                   # Main user dashboard
│   └── Admin/                  # Administrative interface
├── lib/                        # Shared utilities and components
└── static/                     # Static assets
```

### Key Frontend Dependencies
```json
{
  "@sveltejs/kit": "^1.20.4",
  "svelte": "^4.0.5",
  "js-cookie": "^3.0.5",
  "leaflet": "^1.9.4"
}
```

### Component Architecture
- **Modular Design**: Reusable components for posts, menus, notifications
- **State Management**: Cookie-based session management
- **Responsive UI**: Mobile-first design approach
- **Interactive Maps**: Leaflet integration for location services

## 👤 User Types and Features

### 🧑‍💼 Customers (Type: 'C')
- **Social Features**: Friend requests, messaging, post sharing
- **Food Ordering**: Browse menus, place orders, track delivery
- **Restaurant Discovery**: Follow restaurants, view reviews
- **Content Creation**: Share food experiences, photos, reviews
- **Location Services**: Find nearby restaurants

### 🏪 Restaurant Owners (Type: 'R')
- **Menu Management**: Add, update, and manage menu items
- **Order Processing**: Receive and process customer orders
- **Profile Management**: Restaurant information and photos
- **Analytics**: View order history and customer engagement
- **Customer Interaction**: Respond to reviews and messages

### 📝 Foodie Pages (Type: 'P')
- **Content Publishing**: Share food-related content and experiences
- **Community Building**: Connect with food enthusiasts
- **Restaurant Partnerships**: Collaborate with restaurants
- **Social Engagement**: Build follower networks

### 👨‍💼 Administrators
- **System Monitoring**: Comprehensive activity logging and tracking
- **User Management**: View and manage all user accounts
- **Content Moderation**: Monitor posts and user interactions
- **Analytics Dashboard**: System-wide statistics and reporting
- **Database Operations**: Administrative database management

## 🚀 Installation and Setup

### Prerequisites
- **Oracle Database 19c** or compatible version
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager

### Database Setup
1. **Create Oracle Database Schema**:
   ```sql
   -- Execute the following files in order:
   -- 1. create table.sql
   -- 2. functions.sql  
   -- 3. functins and procedures and trigers.sql
   -- 4. add.sql (for sample data)
   ```

2. **Configure Database Connection**:
   ```javascript
   const dbConfig = {
     user: 'CuisineConnect',
     password: '12345',
     connectString: 'localhost/ORCLPDB'
   };
   ```

### Backend Setup
1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   node server.js
   ```
   Server will run on `http://localhost:3001`

### Frontend Setup
1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:5173`

## 📁 Project Structure

```
Cuisine_Connect_DB_Project_2-2/
├── backend/
│   ├── package.json
│   ├── server.js               # Main backend server
│   └── uploads/                # File upload directory
├── frontend/
│   ├── package.json
│   ├── svelte.config.js
│   ├── vite.config.js
│   └── src/
│       ├── routes/             # SvelteKit pages and layouts
│       ├── lib/                # Shared components and utilities
│       └── static/             # Static assets
├── create table.sql            # Database schema definition
├── functions.sql               # Database functions
├── functins and procedures and trigers.sql  # PL/SQL procedures and triggers
├── add.sql                     # Sample data and complex queries
├── ebnquery.sql               # Development and testing queries
├── drop tables - Copy.sql     # Table cleanup scripts
├── server.js                  # Alternative server entry point
├── index.html                 # Basic HTML interface
└── B1_05_ERD_Cuisine_Connect.pdf  # Entity Relationship Diagram
```

## 🔐 Security Features

### Authentication
- **Password Hashing**: ORA_HASH function for secure password storage
- **Session Management**: Cookie-based authentication
- **User Type Validation**: Role-based access control

### Data Protection
- **SQL Injection Prevention**: Parameterized queries throughout
- **Input Validation**: Frontend and backend validation layers
- **File Upload Security**: Controlled file types and storage locations

## 📊 Key Database Operations

### User Management
- User registration with automatic role assignment
- Password authentication with hashed storage
- Profile picture and cover photo management

### Social Features
- Friend request system with approval workflow
- Real-time messaging between users
- Post creation, sharing, and interaction tracking

### Restaurant Operations
- Menu item management with pricing and ratings
- Order processing with status tracking
- Restaurant following and review systems

### Administrative Functions
- Comprehensive activity logging
- System-wide analytics and reporting
- User and content management capabilities

## 🔄 Development Workflow

### Database Development
1. Schema modifications in `create table.sql`
2. Function/procedure updates in respective SQL files
3. Test queries in `ebnquery.sql`
4. Production deployment with proper backup procedures

### Frontend Development
1. Component development in SvelteKit
2. API integration with backend services
3. Responsive design implementation
4. User experience optimization

### Backend Development
1. Express.js route development
2. Oracle DB integration
3. File handling and storage management
4. Error handling and logging

## 📈 Performance Considerations

### Database Optimization
- **Indexing Strategy**: Optimized indexes on frequently queried columns
- **Connection Pooling**: Efficient database connection management
- **Query Optimization**: Efficient SQL queries with proper joins
- **Trigger Efficiency**: Minimal trigger overhead for data consistency

### Application Performance
- **Component Lazy Loading**: On-demand component loading
- **Image Optimization**: Proper image sizing and compression
- **API Response Caching**: Strategic caching for improved response times
- **Database Connection Management**: Proper connection lifecycle handling

## 🧪 Testing and Quality Assurance

### Database Testing
- **Query Performance**: Performance testing for complex queries
- **Data Integrity**: Constraint and trigger testing
- **Transaction Testing**: ACID compliance verification

### Application Testing
- **API Testing**: Endpoint functionality and error handling
- **UI Testing**: Component behavior and user interaction
- **Integration Testing**: End-to-end workflow validation

## 📚 Documentation

### Database Documentation
- **ERD**: Complete Entity Relationship Diagram (B1_05_ERD_Cuisine_Connect.pdf)
- **Schema Documentation**: Detailed table and relationship descriptions
- **Function Reference**: PL/SQL function and procedure documentation

### API Documentation
- **Endpoint Reference**: Complete API endpoint documentation
- **Request/Response Examples**: Sample API calls and responses
- **Error Code Reference**: Comprehensive error handling guide

## 🤝 Contributing

### Development Standards
- **Code Style**: Prettier configuration for consistent formatting
- **Naming Conventions**: Consistent naming across database and application layers
- **Documentation**: Comprehensive inline code documentation
- **Version Control**: Git workflow with meaningful commit messages

### Database Standards
- **Normalization**: Proper 3NF database design
- **Constraint Usage**: Appropriate use of foreign keys and check constraints
- **Index Strategy**: Performance-optimized indexing
- **Trigger Design**: Minimal and efficient trigger implementation

## 📄 License

This project is developed for educational purposes as part of a Computer Science and Engineering course curriculum.

## 🎯 Future Enhancements

### Planned Features
- **Real-time Notifications**: WebSocket-based live notifications
- **Mobile Application**: React Native or Flutter mobile app
- **Payment Integration**: Secure payment gateway integration
- **Advanced Analytics**: Machine learning-based recommendation system
- **Multi-language Support**: Internationalization and localization

### Scalability Improvements
- **Microservices Architecture**: Service decomposition for scalability
- **Containerization**: Docker-based deployment
- **Cloud Migration**: AWS/Azure cloud deployment
- **Performance Monitoring**: Application performance monitoring tools

---

**Project Status**: Active Development | **Version**: 1.0.0 | **Last Updated**: September 2025