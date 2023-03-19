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
- Description: String
- Category: Category[1]
- Price: Number
- Number-in-stock: Number
- Url: String

*Category*
- Name: String
- Description: String
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

4. Fourth step

Download populatedb.js and edit it to the specifics of my models.

- Added functions equipment- and category create, which creates equipments and categories
- Added function categoryUpdate, to update an current category
- Created an function which makes a few items (equipments and categories)

When using the following code in terminal, it loads populatedb.js and loads a few items to mongoDB.

```
node populatedb <mongoDB api>
```

5. Fifth step

Set up the routes and controllers.

I need 4 routes:
- Home
- Category
- Equipment
- Inventory

And two controllers:
- Category
- Equipment

6. Sixt step

Create all of the 'Read' views.

- Create
- Delete 
- Detail
- List
- Update

7. Seventh step

Create all the forms and build out the controllers you need for the rest of the CRUD actions.
