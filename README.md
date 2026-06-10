# Furnish - Apartment Furnishing Planner

Furnish is an apartment furnishing planner that helps users organize furniture purchases by room, manage budgets, and track planned versus purchased items.

Built as a capstone project for the McGill x Circuit Stream Software Development Bootcamp, the application focuses on solving a real-world problem faced by renters, homeowners, and anyone furnishing a new space.

---

## Project Overview

When I was furnishing my apartment, I had a hard time keeping track of furniture purchases across multiple websites, notes, spreadsheets, and bookmarks. Furnish centralizes that process into a single application.

Users can:

- Create rooms
- Set room budgets
- Add furniture items
- Save product links
- Track planned and purchased items
- View spending progress
- Monitor remaining budget
- Receive smart budget insights

The goal is to provide a simple and modern dashboard for managing furnishing projects from start to finish, while making smart financial decisions.

---

## Features

### Authentication

- User registration
- User login
- Protected routes
- User profile page
- Change password functionality
- Session persistence using localStorage

### Room Management

- Create custom rooms
- Prevent duplicate room names
- Set budgets by room
- View room-level budget summaries
- Delete empty rooms

### Furniture Management

- Add furniture items
- Assign items to rooms
- Save retailer information
- Save product URLs
- Edit existing items
- View item details
- Toggle items between:
  - Planned
  - Bought

### Budget Tracking

- Total budget calculation
- Total spent calculation
- Remaining budget calculation
- Planned purchase calculation
- Room-specific spending summaries

### Dashboard

- Total budget overview
- Amount spent
- Remaining budget
- Planned purchases
- Progress indicators
- Smart budget insight banner

### Responsive Design

- Desktop optimized layout
- Mobile responsive layout
- Stacked cards on mobile devices
- Responsive navigation tabs

---

## Technologies Used

### Front-End

- React
- Vite
- React Router

### State Management

- React Context API
- React Hooks

### Styling

- CSS
- Responsive Design
- CSS Grid
- Flexbox

### Data Persistence

- localStorage

---

## Installation

Clone the repository:

```bash
git clone https://github.com/nateasseraf/furnish-capstone.git
```

Navigate to the project folder:

```bash
cd furnish-capstone/furnish-client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:5173
```

---

## GitHub Repository

Repository:

https://github.com/nateasseraf/furnish-capstone

---
## Live Demo

https://furnish-capstone.vercel.app/
___

## Application Structure

```text
src
├── components
│   ├── Header.jsx
│   ├── NavTabs.jsx
│   └── ProtectedRoute.jsx
│
├── context
│   ├── AuthContext.jsx
│   └── FurnishContext.jsx
│
├── pages
│   ├── AddItem.jsx
│   ├── Budget.jsx
│   ├── ByRoom.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Register.jsx
│
├── utils
│   └── budgetUtils.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Key Design Decisions

### Context API

React Context was chosen to manage shared application data such as:

- Rooms
- Furniture items
- User authentication

This avoided unnecessary prop drilling and made state accessible throughout the application.

### Local Storage

Local Storage was used instead of a backend database to:

- Keep the project lightweight
- Demonstrate front-end state persistence

### Product Links

Instead of attempting unreliable web scraping, users manually save product links. This keeps the application simple while still providing quick access back to retailer product pages.

### Responsive Layout

The interface was designed with both desktop and mobile experiences in mind. Components automatically adapt to smaller screens using CSS Grid and Flexbox.

---

## Testing

The following functionality was tested during development:

### Authentication

- User registration
- User login
- User logout
- Protected route access

### Room Management

- Add room
- Duplicate room prevention
- Budget updates
- Room deletion validation

### Furniture Management

- Add item
- Edit item
- Mark item as purchased
- Mark item as planned
- Move items between rooms
- View saved product link

### Budget Calculations

- Total budget calculations
- Remaining budget calculations
- Planned purchase calculations
- Room summaries

### Responsive Design

- Desktop view
- Tablet view
- Mobile view

---

## Future Improvements

Potential future enhancements include:

- Backend integration using Node.js and Express
- MongoDB database storage
- Multi-user support
- Product image support
- Budget warning notifications
- Search functionality
- Filtering and sorting
- Shared furnishing projects
- Price tracker

---

## Development Reflection

This project allowed me to apply many concepts learned throughout the bootcamp, including React development, routing, state management, component architecture, responsive design, and user experience considerations.

One of the biggest lessons learned was balancing functionality with usability. While building the application, I continuously refined the interface based on testing and feedback to make it feel more like a real product rather than simply meeting technical requirements.

The final result is a practical application that solves a real-world problem while demonstrating modern front-end development practices and the skills developed throughout the bootcamp.
