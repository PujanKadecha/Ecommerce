# E-Commerce Backend

A robust RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB.

## Screenshot

![E-Commerce API Screenshot](./screenshot.png)

*(Note: Replace `screenshot.png` with an actual screenshot of your project in this folder.)*

## Features
- **User Authentication & Authorization** (JWT, bcrypt)
- **Product Management** (CRUD operations)
- **Cart & Order Processing** 
- **Payment Integration** (Stripe)
- **Image Uploads** (Cloudinary)
- **Caching** (Redis)

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Caching:** Redis & ioredis
- **Testing:** Jest & Supertest

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory and add your credentials (MongoDB URI, Stripe keys, JWT Secret, Cloudinary credentials, etc.).

3. **Run the server:**
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```
   - Run tests:
     ```bash
     npm test
     ```
