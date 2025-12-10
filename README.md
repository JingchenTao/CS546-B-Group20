# Project Name
 City Park Explorer

## 1. Overview
**City Park Explorer** is a web application that allows users to explore, review, and favorite parks in New York City.  
Users can read other users’ experiences, share their own reviews, and discover the best parks for recreation and relaxation.

## 2. Tech Stack
- Backend: Node.js, Express, MongoDB
- Frontend: Handlebars templates + client-side JavaScript, HTML, CSS
- API Testing: Postman

## 3. Features

### 3.1 Core Features

- **Home Page**
  - Shows a brief introduction to City Park Explorer and what the website does.
  - Provides navigation to the core site features (park directory, user profile, etc.).
  - Highlights **popular parks** on the homepage (e.g., parks with more reviews).（）

- **Park Directory**
  - Displays a list of all parks, including **name, short introduction, address, and average rating**.
  - Supports **search** by different criteria such as area, facility type, or tags.
  - Supports **rating-based filtering** so users can quickly find higher-rated parks.

- **Individual Park Page**
  - Shows detailed park information: basic info, facility details, and the full list of user reviews.
  - Allows users to **post reviews** for a park, including a numeric rating and detailed text content.

- **User Functionality**
  
  - **Registered users** can:
    - Write reviews for parks.
    - Mark parks as favorites (Mark parks as favorites. If a user marks the same park again, it will be removed from their favorites (toggling favorite on second click)).
    - View the list of parks they have reviewed.
    - Comment on other users’ reviews.
    - Delete the reviews or comments they posted
  
  - **Guests (unregistered users)** can:
    - Browse all public pages (home page, park directory, park details).
    - Read other users’ reviews, but cannot post or favorite parks.

- **Admin Page**
  - Administrators can **add, edit, or delete parks** from the park directory.
  - Administrators can **delete user comments or reviews** that violate rules or are inappropriate.

### 3.2 Optional Features

- **Browsing History**
  - Track and display parks that a user has recently viewed, making it easier to revisit them.

- **User Following**
  - Allow users to follow other users and see parks or reviews from people they care about.

- **Social Media Sharing**
  - Provide quick sharing buttons so users can share a park or a review to external social platforms.

- **Personalized Recommendations**
  - Recommend parks to users on their personal page based on:
    - Their ZIP code / location.
    - Themes or types of parks they have liked or reviewed before.



## 4. How to Run

- `npm install`
- `npm start`
-  The app will run at `http://localhost:3000`.

## 5. User Module Documentation
This section details the **User** implementation, including data models, authentication flow, and API endpoints. All user routes are prefixed with `/users`.

### 5.1 User Data Model

User data is stored in the `users` collection.

**Schema Example:**
```javascript
{
  _id: ObjectId("..."),
  first_name: "Alice",
  last_name: "Smith",
  email: "alice@example.com",
  passwordHash: "<bcrypt hash>",    // Never returned to frontend
  role: "user",                      // "user" or "admin"
  address_zip: "12345",              // Optional
  address_city: "Hoboken",           // Optional
  favorite_Parks: [                  // Array of Park ObjectIds
    ObjectId("..."),
    ObjectId("...")
  ],
  createdAt: ISODate("2025-01-01T00:00:00Z")
}
```

**Validation Rules:**
- **Name:** 2–50 characters; letters, spaces, apostrophes, and hyphens only.
- **Email:** Normalized to lowercase; must be valid and unique.
- **Password:** Min 8 chars; must contain 1 uppercase, 1 lowercase, 1 digit, 1 special char.
- **Role:** Defaults to "user".
- **Zip/City:** Optional. Zip must be valid US format (5 or 9 digits). City max 100 chars.

### 5.2 Server-Rendered Pages (Handlebars)

These routes serve the HTML shell. Dynamic data is loaded via client-side `fetch`.

| Method | Path                    | Description             | Access Control    |
|--------|-------------------------|-------------------------|-------------------|
| GET    | `/users/register`       | Registration form       | Guests only       |
| GET    | `/users/login`          | Login form              | Guests only       |
| GET    | `/users/userProfile`    | User profile page       | Logged-in Users   |
| GET    | `/users/adminProfile`   | Admin dashboard         | Admins only       |
| GET    | `/users/logout`         | Logout confirmation     | Logged-in Users   |


### 5.3 User JSON API Reference

These endpoints are used by the frontend to perform actions.

| Method | Path                            | Auth        | Description                                    |
|--------|---------------------------------|-------------|------------------------------------------------|
| POST   | `/users/register`               | No          | Register a new user                            |
| POST   | `/users/login`                  | No          | Log in, create session                         |
| POST   | `/users/logout`                 | Yes*        | Log out, destroy session                       |
| GET    | `/users/me`                     | Yes         | Get current logged-in user                     |
| GET    | `/users/:id`                    | Optional    | Get a user by ID                               |
| GET    | `/users/me/favorites`           | Yes         | Get current user's favorite parks              |
| POST   | `/users/me/favorites/:parkId`   | Yes         | Add park to favorites, Toggle park in favorites|
| DELETE | `/users/me/favorites/:parkId`   | Yes         | Remove park from favorites                     |
| POST   | `/users/admin/role`             | Admin only  | Promote a user to admin          

#### 1. Register User

**`POST /users/register`**

**Request Body:**
```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice@example.com",
  "password": "StrongP@ssw0rd!",
  "confirmPassword": "StrongP@ssw0rd!",
  "addressZip": "12345",
  "addressCity": "Hoboken"
}
```

**Response (200):** Returns created user object( without password). Note: Does not log user in automatically.
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "first_name": "Alice",
  "last_name": "Smith",
  "email": "alice@example.com",
  "role": "user",
  "address_zip": "12345",
  "address_city": "Hoboken",
  "favorite_Parks": [],
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Errors:** 
- `400` - Validation error
- `409` - Email already exists
- `500` - Internet error

---


#### 2. Login

**`POST /users/login`**

**Request Body:**
```json
{
  "email": "alice@example.com",
  "password": "StrongP@ssw0rd!"
}
```

**Response (200):** Returns user object (without the password) and sets session cookie.
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "first_name": "Alice",
  "last_name": "Smith",
  "email": "alice@example.com",
  "role": "user",
  "address_zip": "12345",
  "address_city": "Hoboken",
  "favorite_Parks": [],
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Errors:**
- `400` - Input error
- `401` - Invalid credentials
- `500` - Internet error
---


#### 3. Logout

**`POST /users/logout`**

**Auth:** Required (any logged-in user).

**Response:**
```json
{
  "loggedOut": true
}
```
**Description:** 
Destroys session and clears AuthCookie.
**Errors:**

- `500` - Internet error

---



#### 4. Get Current User

**`GET /users/me`**

**Auth:** Required.

**Response(200):**
```json
{
  "_id": "...",              
  "first_name": "Alice",   
  "last_name": "Smith",     
  "email": "alice@...",    
  "role": "user",          
  "address_zip": "12345",    
  "address_city": "Hoboken", 
  "favorite_Parks": [],   
  "createdAt": "..." 
}        
```

**Errors:**

- `401` - Not authenticated error
- `404` - User not found
- `400` - Validation failed
- `500` - Internet error

---

#### 5. Get User by ID

**`GET /users/:id`**

**Description:** Fetch public profile info of any user.
**Auth:** Optional (anyone can view public user profiles).
**Path Parameters:** id - User's MongoDB ObjectId (string)

**Response（200）:**
```json
{
  "_id": "...",              
  "first_name": "Alice",   
  "last_name": "Smith",     
  "email": "alice@...",    
  "role": "user",          
  "address_zip": "12345",    
  "address_city": "Hoboken", 
  "favorite_Parks": "[...]",   
  "createdAt": "..." 
}        
```
**Errors:**
- `401` - Not authenticated error
- `404` - User not found
- `400` - Validation failed
- `500` - Internet error
---


#### 6. Favorite Parks Management

  **Get Favorites**
  **`GET /users/me/favorites`**
  **Auth:** Required.
  **Response（200）:**
  ```json
  {
    "_id": "...",              
    "first_name": "Alice",   
    "last_name": "Smith",     
    "email": "alice@...",    
    "role": "user",          
    "address_zip": "12345",    
    "address_city": "Hoboken", 
    "favorite_Parks": "[...]",   
    "createdAt": "..." 
  }   
  ```     

  **Response(200):**
  ```json
  [
    {
      "_id": "PARK_ID_1",
      "park_name": "Central Park",
      "park_location": "Manhattan",
      "park_zip": "10024",
      "description": "Large public park in NYC",
      "park_type": "Urban Park",
      "rating": 4.8,
      "reviewCount": 1250
    },
    {
      "_id": "PARK_ID_2",
      "park_name": "Prospect Park",
      "park_location": "Brooklyn",
      "park_zip": "11215",
      "description": "Historic Brooklyn park",
      "park_type": "Urban Park",
      "rating": 4.7,
      "reviewCount": 890
    }
  ]     
  ```

  **Errors:**
  - `401` - Not authenticated error
  - `404` - User not found
  - `400` - Validation failed
  - `500` - Internet error
    
  ---

    

  **Add to Favorites (Toggle Park in Favorites)**
  **`POST /users/me/favorites/:parkId`**
  **Auth:** Required.
  **Path Parameters:** parkId - Park's MongoDB ObjectId (string)
  **Response(200):**
  ```json
  {
  "_id": "507f1f77bcf86cd799439011",
  "favorite_Parks": ["PARK_ID_1", "PARK_ID_2", "PARK_ID_3"]
  }
  ```
  **Errors:**
  - `401` - Not authenticated error
  - `404` - User not found
  - `400` - parkId parameter is required or validation failed
  - `500` - Internet error
  **Description:**
  Toggles park in user's favorites:
  -If park is not in favorites → adds it (The returned list having this parkID)
  -If park is already in favorites → removes it (The returned list without this parkID)


  **Remove from Favorites**
  **`DELETE /users/me/favorites/:parkId`**
  **Auth:** Required.
  **Path Parameters:** parkId - Park's MongoDB ObjectId (string)

  **Response(200):**
  ```json
  {
  "_id": "507f1f77bcf86cd799439011",
  "favorite_Parks": ["PARK_ID_1", "PARK_ID_2", "PARK_ID_3"]
  }
  ```

  **Errors:**
  - `401` - Not authenticated error
  - `404` - User not found
  - `400` - parkId parameter is required or validation failed
  - `500` - Internet error
    
  ---


#### 7. Promote to Admin

**`POST /users/admin/role`**

**Auth:** Admin only.

**Request Body:**
```json
{
"userId": "USER_ID_STRING"
}
```

**Response(200):** ()
```json

{
"_id": "507f1f77bcf86cd799439011",
"first_name": "Alice",
"last_name": "Smith",
"email": "alice@example.com",
"role": "admin",
"address_zip": "12345",
"address_city": "Hoboken",
"favorite_Parks": ["PARK_ID_1", "PARK_ID_2"],
"createdAt": "2025-01-01T00:00:00.000Z"
}
```
return updated user object with `role: "admin"`.


---


---

## 6. License

This project is for CS546 final group project purposes only.
