# CSIS 3380 - Fullstack Development - Final Project

Team Members:
- Andrea Olivares (300361840)
- Valentina Alvarez (300360015)
- Luis Miguel Miranda (300363277)

The coffeebeanswholesale frontend acts as the face of the website, simplifying the process for coffee businesses to purchase quality beans. Built with Node.js, it offers intuitive tools for cafes and shops.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Project Description

The project implements a Vite+React.js frontend with integration with our NodeJS Backend service.

![Project Architecture](assets/project_architecture.png)

## Features

- Login (Authentication)
- Admin features
    - User's registration: the admin user is the responsible to create new users (customers)
    - Product's visualization: the admin user can review the whole list of products available and update stock and prices.
    - Inquiries' visualization: the admin user can review the inquiries made by the customers.
    - User's visualization: the admin user can review the whole list of users registered and active/inactive them.
- User features
    - Product catalog: the user can view the product's detail as well as the reviews/ratings.
    - Add products to shopping cart
    - Review shopping cart
    - Remove items from shopping cart
    - Payment (stripe integration)
    - User profile: the user can view his/her profile
    - Add product's reviews/ratings: the user can add a product review based on a purchase order made.

## Prerequisites

- Node.js (version 20.9.0)
- MongoDB (version 7.0.8)

## Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Configure environment variables.
    - VITE_BACKEND_API_URL: the backend URL
    - VITE_STRIPE_PUBLISHABLE_KEY: the Stripe API key

## Usage

1. Run the server using `npm run dev` and explore the website with http://localhost:8081/

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.
