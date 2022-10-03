# Website
https://user-images.githubusercontent.com/91191428/193604046-923fc6fb-97e1-418b-9f52-13c79e0299ae.mp4

### To make it work ###
- npm start on frontend terminal
- npm start on backend terminal
- Open http://localhost:4200/sauces
- And my MongoDB database password

### Short story ###
The first version is a “sauces gallery” allowing users to upload their favorite hot sauces and like or dislike sauces that others share. The front-end of the application was developed using Angular and was precompiled after internal testing, and we developed the back-end to build the API, while paying attention to the requirements for security (all user passwords collected by the application are protected).

### API Errors ###
Errors are returned as they are produced, without modification or addition.

### Routes API ###
All sauce routes for sauces have an authorization (the token is sent by the front-end with the authorization header: "Bearer <token>"). Before the user can make any changes to the sauce route, the code is checked to see if the current userId matches the sauce's userId. If the userId does not does not match, we have “403: unauthorized request. » This ensures that only the owner of the sauce can make changes to it.

# Steps

### Step 1 The following elements for the user ###
- User model
- User journey
- User controller
  
### The user is able to perform the following operations ###
- Create an account 
- Connect and have a valid token
  
### Step 2 Start the middleware ###
- Added multer for images
- Added authorize for token validation
- Authorize was added before starting to build the course for the sauces because authentication is necessary for a user to perform an action on the course of sauces.
  
### Step 3 For the route API sauce ###
- The Sauce Model
- The Sauce Route
- The Sauce Controller
- Authorizes all functions using Authorize middleware
- On the Devtools network tab for more information

### The user is able to perform the following operations ###
- Add new sauce
- Delete a sauce
- See all sauces
- The user can like or dislike a sauce (or
none)

# Security requirements 

● The user's password is hashed.

● Authentication is strengthened on all required sauce routes.

● Email addresses in the database are unique and one appropriate Mongoose plugin is used to ensure their uniqueness and report Errors.

● MongoDB database security (from a service such as MongoDB Atlas) does not prevent the application from launching on the a user's machine.

● A Mongoose plugin ensures the reporting of errors from the database of data.

● Latest versions of software are used with patches updated security.

# Skills
- Store data securely
- Implement a logical data model in accordance with the regulations
- Implement CRUD operations in a secure way

