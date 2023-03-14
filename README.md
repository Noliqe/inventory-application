# INVENTORY APPLICATION

This project is part of <a href='https://www.theodinproject.com/lessons/nodejs-inventory-application'>TheOdinProject</a>.

In this project I need to create an inventory management app for an imaginary store. The inventory app should have categories and items, so when the user goes to the home-page they can choose a category to view, and then get a list of every item in that category. For this project I include all of the CRUD methods for both items and categories, so anybody that’s visiting the site can Create, Read, Update or Delete any Item or Category.

1. First step

Write down all the models I need and the fields that should go in them.

- Items should at least have: a name, description, category, price, number-in-stock and URL, though you should feel free to add more fields if it seems relevant to the type of business you’ve chosen.

- Categories should at least have a name, a description and a URL.

The model that I made for sport equipments:

**Equipment**
- Name: String
- Discription: String
- Category: Category[1]
- Price: Number
- Number-in-stock: Number
- Url: String

*Category*
- Name: String
- Discription: String
- Number-of-equipments: Number
- Equipments: Equipments[0..*]
- Url: String

2. Second step

Generate the boilerplate skeleton with express-generator. I've choosen *PUG* as templating language.

```
express inventory-application --view=pug
```

I've added nodemon to the project for quick debugging.

```
npm install --save-dev nodemon
```

3. Third step

Create a new Mongo Collection using the web-interface and then set up mine database schemas and models.

- Added mongoose connection
- Created an models folder within seperate files
- Added equipment model and category model
- Add schema's to each model
- Virtuals for each model, which returns the absolute URL required to get a particular instance of the model
