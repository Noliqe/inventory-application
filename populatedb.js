#! /usr/bin/env node

console.log('This script populates some test equipments and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/Inventory?retryWrites=true&w=majority"');

// Get arguments passed on command line
// const userArgs = process.argv.slice(2);

const async = require('async')
const Equipment = require('./models/equipment')
const Category = require('./models/category')

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

// const mongoDB = userArgs[0];
const mongoDB = process.env.mongoDBKey;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const equipments = []
const categories = []

function equipmentCreate(name, description, category, price, stock, cb) {
  equipmentdetail = { 
    name: name,
    description: description,
    price: price,
    stock: stock,
    category: category
  }
    
  const equipment = new Equipment(equipmentdetail);    
  equipment.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Equipment: ' + equipment);
    equipments.push(equipment)
    cb(null, equipment)
  }  );
}


function categoryCreate(name, description, cb) {
  categorydetail = { 
    name: name,
    description: description,
  } 
    
  const category = new Category(categorydetail);    
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}


function categoryUpdate(category, equipment) {
    async.parallel(
        Category.updateOne(
            { "_id": category._id}, // Filter
            {$set: {"equipment": equipment}}, // Update
            {upsert: true}
        )
        .then((obj) => {
            console.log('Updated - ' + obj);
            
        })
        .catch((err) => {
            console.log('Error: ' + err);
       })
      );
}


function createCategoriesEquipment(cb) {
    async.series([
        function(callback) {
          categoryCreate('Boxing', 'A fighting sport', callback);
        },
        function(callback) {
          equipmentCreate('Gloves 101', 'Best gloves', categories[0], "33", "5",callback);
        },
        function(callback) {
            equipmentCreate('shoes 101', 'Best shoes', categories[0], "35", "4",callback);
          },
        ],
        // optional callback
        cb);
}

function updateCategories(cb) {
    async.parallel([
        function(callback) {
            categoryUpdate(categories[0], [equipments[0]._id,equipments[1]._id], callback)
        },
    ],
    cb);
}


async.series([
    createCategoriesEquipment,
    updateCategories,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('equipment: '+equipments);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});