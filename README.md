<h1>
  <a href="https://serendib-estates.onrender.com/"><p>Serendib Estates</p></a>
</h1>

<p><a href="https://github.com/kavindu-dilshan"><img src="https://skillicons.dev/icons?i=mongo,express,react,nodejs,vite,redux,tailwind,firebase,vscode,github" width=350></a></p>

This repository contains the source code for a Real Estate Marketplace web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. The project utilizes Vite as the local development server.<br>
### Live App: <a href="https://serendib-estates.onrender.com/">www.serendib-estates.onrender.com</a><br><br>
<img src="https://firebasestorage.googleapis.com/v0/b/images-for-projects.appspot.com/o/Serendib%20Estates%2FScreenshots%2FHome.jpg?alt=media&token=524d5818-88d3-4c14-92f8-5e4c44af4d39" alt="Home">

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Usage](#usage)
- [Redux State Management](#redux-state-management)
- [Authentication and OAuth](#authentication-and-oauth)
- [Deployment](#deployment)
- [License](#license)<br><br>

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/kavindu-dilshan/serendib-estates.git
```

2. Install dependencies for the frontend and backend:
```bash
cd serendib-estates/client
npm install

cd serendib-estates
npm install
```

3. Set up MongoDB:
- Create a MongoDB database and configure the connection in api/index.js.


4. Run the development server:
```bash
cd serendib-estates/client
npm run dev

cd serendib-estates
npm run dev
```
<br>

## Project Structure
The project structure is organized as follows:

- <b>client:</b> Frontend React application.
- <b>server:</b> Backend Express.js application.<br><br>

## Features
- User authentication with sign-up, sign-in, and OAuth options.
- Profile management with user details update, deletion, and sign-out.
- Listing management with create, update, delete functionalities.
- Search functionality with filters.
- Responsive design and user-friendly interface.
- Integration with Google OAuth for seamless authentication.
- Image upload functionality for user listings.<br><br>

<img src="https://firebasestorage.googleapis.com/v0/b/images-for-projects.appspot.com/o/Serendib%20Estates%2FScreenshots%2FSearch.jpg?alt=media&token=4bd9fc46-31af-4371-9c6e-8b8493b69b61" alt="Search">

## Usage
The application provides a comprehensive real estate marketplace experience. Users can sign up, create and manage listings, search for properties, and interact with landlords.<br>

## Redux State Management
The application uses Redux Toolkit and Redux Persist for efficient state management. Actions and reducers are organized in the client/src/redux directory.<br>

## Authentication and OAuth
User authentication is implemented using JWT tokens, and Google OAuth is integrated for a seamless login experience.<br>

## Deployment
The application is deployed on the Render platform. Visit <a href="https://serendib-estates.onrender.com/">here</a> to access the live application.<br>

## License
This project is licensed under the <a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a>.
