Below is an updated README.md file that explains everything we’ve done for the frontend—integrating Google OAuth and implementing a pixel‑perfect login page per the Figma design. This README includes detailed instructions for cloning, setting up, and running the project, plus a demo video link.

# KittyCare Frontend

KittyCare Frontend is built using **React**, **TypeScript**, and **Vite**. In this project, we've added Google OAuth integration and reimplemented the Login page to match the provided Figma design exactly. As a beginner, I spent around 4–5 hours learning and implementing these changes.

## Table of Contents

- [Overview](#overview)
- [Features & Changes](#features--changes)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Cloning & Installation](#cloning--installation)
  - [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Authentication Flows](#authentication-flows)
  - [OTP Login](#otp-login)
  - [Google OAuth](#google-oauth)
- [ESLint & Styling](#eslint--styling)
- [Demo Video](#demo-video)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository contains the frontend code for KittyCare. The project has been updated to include:
- **Google OAuth** integration using `@react-oauth/google`.
- A **Login** page that follows the Figma design exactly, featuring a centered white card with rounded corners, a “Login” heading, a “Sign up for free” link, and social login buttons (Google and Apple).
- An existing **OTP-based** authentication flow for email verification.

## Features & Changes

- **Google OAuth Integration:**  
  Users can now sign in with Google. The Google OAuth button uses the latest `@react-oauth/google` package.
- **Figma-based Login UI:**  
  The Login page has been redesigned to match the Figma design with a clean, pixel‑perfect layout.
- **OTP Authentication:**  
  Users enter their email to receive an OTP and then use the OTP to log in.
- **Rive Animation (Desktop Only):**  
  A Rive-based animation (a “Pulse Kitty”) is shown above the login card on non-mobile screens.
- **Responsive Design:**  
  The login page is fully responsive and works on both mobile and desktop.

## Project Structure





kittycare_frontend/
├── public/
│   └── assets/                  # Contains images (google.png, apple.png, etc.)
├── src/
│   ├── components/
│   │   ├── Login/
│   │   │   ├── LoginForm.tsx    # Main login form (OTP + Google OAuth button)
│   │   │   ├── GoogleLoginButton.tsx
│   │   │   └── (optional) AppleLoginIconButton.tsx
│   │   └── Layout.tsx
│   ├── pages/
│   │   └── Login.tsx            # Login page with Rive animation and LoginForm
│   ├── main.tsx                 # Application entry
│   └── …
├── .env.example
├── README.md
├── package.json
└── vite.config.ts




## Installation

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**

### Cloning & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your_username/kittycare_frontend.git
   cd kittycare_frontend

	2.	Install dependencies:

npm install

or

yarn install



Environment Variables
	1.	Create a .env file in the root (refer to .env.example):

VITE_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>


	2.	Ensure your Google Cloud Console is set up with the correct OAuth credentials and that your Authorized JavaScript origins include your local dev URL (e.g., http://localhost:5173).

Running the Project

To start the development server, run:

npm run dev

or

yarn dev

Then open your browser at http://localhost:5173.

Authentication Flows

OTP Login
	•	Step 1: User enters their email and clicks Send Login Code.
	•	Step 2: An OTP is sent to the user’s email (via signInWithOTPAPI).
	•	Step 3: User enters the OTP, which is verified using loginUserWithOTPAsync.
	•	Redirection: Depending on user data (subscription, cat profile), the user is redirected to the appropriate page.

Google OAuth
	•	Google Sign-In:
The GoogleLoginButton.tsx component triggers Google OAuth using @react-oauth/google.
	•	On Success:
A token (or credential) is returned which can be sent to the backend for verification.
	•	Current Implementation:
For demonstration purposes, the token is logged to the console.

ESLint & Styling

The project uses ESLint with TypeScript and React plugins for type-aware linting. Tailwind CSS is used for styling to achieve a pixel‑perfect design as per the Figma mockup.

For example, our ESLint configuration includes:

// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});

Demo Video

A short demo video showcasing the login page running on my device can be viewed here:
Demo Video Link  ( https://drive.google.com/drive/folders/18bs2Z-4X1hu_wIFKj1bISlbweElP31E_?usp=sharing )

Contributing

Contributions are welcome! Please follow these steps:
	1.	Fork the repository.
	2.	Create a new branch:

git checkout -b feature/your-feature


	3.	Commit your changes:

git commit -m "Describe your feature"


	4.	Push to your branch:

git push origin feature/your-feature


	5.	Open a Pull Request with a description of your changes.

License


---

