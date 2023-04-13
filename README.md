# INVENTORY APPLICATION

This project is part of <a href='https://www.theodinproject.com/lessons/nodejs-inventory-application'>TheOdinProject</a>.

In this project I need to create an inventory management app for an imaginary store. The inventory app should have categories and items, so when the user goes to the home-page they can choose a category to view, and then get a list of every item in that category. For this project I include all of the CRUD methods for both items and categories, so anybody that’s visiting the site can Create, Read, Update or Delete any Item or Category.

## Sport Equipment Store

An fake store where you can manage your sport equipments.

## Features

The web app has Inventory, Categories and Equipments. The web app allows you to use all the CRUD operations. Create, Read, Update and Delete.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development en testing purposes.

### Prerequisites

You will need to have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from the official website (https://nodejs.org/en/).

You will also need to have MongoDb as database, you can download and install mongoDb (atlas) from the official website (https://www.mongodb.com/).

### Installing

1. Clone the repository to your local machine

```sh
git clone https://github.com/Noliqe/inventory-application.git
```

2. Install NPM packages

```sh
npm install
```

3. Install Mongoose

```sh
npm install mongoose@6.9.0
```

3. Create a .env file in the root directory of the project and add the following:

mongoDBKey="Insert your mongodb url here"

4. Populate the database with data

```sh
npm run populate "Your mongodb url"
```

5. Run the app

```sh
npm start
```

The application will now be running on http://localhost:3000.