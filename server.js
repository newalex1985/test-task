
const express = require('express');

const fs = require('fs');

const app = express();

const Emitter = require('events');

const propertyState = {
    readCategoriesState: false,
    readWorkshopsState: false,
    readProductsState: false,
    products: null,
    workshopsMap: null,
    categoriesMap: null
};

const boolenMap = new Map();
boolenMap.set(true, 'да');
boolenMap.set(false, 'нет');

let emitter = new Emitter();
let eventName = 'changeReadState';

emitter.on(eventName, (data) => {

    const { readCategoriesState, readWorkshopsState, readProductsState } = propertyState;

    if (readCategoriesState && readWorkshopsState && readProductsState) {

        const { products, workshopsMap, categoriesMap } = propertyState;
        const { response } = data;

        result = products.map((elem) => {
            const newElem = {};
            newElem.id = elem.id;
            newElem.active = boolenMap.get(elem.active);
            newElem.use_discounts = boolenMap.get(elem.use_discounts);
            newElem.name = elem.name;

            let value = '';
            if (elem.hasOwnProperty('category') && elem['category'].hasOwnProperty('id')) {

                let key = elem['category']['id'];
                if (categoriesMap.has(key)) {
                    value = categoriesMap.get(key);
                } else {
                    value = 'no value';
                }

            } else {
                value = 'no category for object';
            }

            newElem.category = value;

            newElem.measure = elem.measure;

            value = '';
            if (elem.hasOwnProperty('work_space') && elem['work_space'].hasOwnProperty('id')) {

                let key = elem['work_space']['id'];
                if (workshopsMap.has(key)) {
                    value = workshopsMap.get(key);
                } else {
                    value = 'no value';
                }

            } else {
                value = 'no work shop for object';
            }

            newElem.work_space = value;
            
            return newElem;
        });

        response.send(JSON.stringify(result));

        propertyState.readCategoriesState = false;
        propertyState.readWorkshopsState = false;
        propertyState.readProductsState = false;
        propertyState.products = null;
        propertyState.workshopsMap = null;
        propertyState.categoriesMap = null;

    }
});

app.use(express.static(__dirname + "/build"));

app.use("/categories/", function (request, response) {
    response.sendFile(__dirname + "/jsonDB/categories.json");
});

app.use("/products/", function (request, response) {
    response.sendFile(__dirname + "/jsonDB/products.json");
});

app.use("/workshops/", function (request, response) {
    response.sendFile(__dirname + "/jsonDB/workshops.json");
});

app.use("/all/", (request, response) => {

    const readProducts = (error, data) => {

        if (error) throw error;

        const products = JSON.parse(data).data;

        propertyState.products = products;
        propertyState.readProductsState = true;

        emitter.emit(eventName, { event: 'products', response });
    };

    const readWorkshops = (error, data) => {

        if (error) throw error;

        const workshops = JSON.parse(data).data;

        let workshopsMap = new Map();
        workshops.forEach((workshop) => {
            if (workshop.hasOwnProperty('id') && workshop.hasOwnProperty('name')) {
                workshopsMap.set(workshop.id, workshop.name);
            }
        });

        propertyState.workshopsMap = workshopsMap;
        propertyState.readWorkshopsState = true;

        emitter.emit(eventName, { event: 'workshop', response });
    };

    const readCategories = (error, data) => {

        if (error) throw error;

        const categories = JSON.parse(data).data;

        let categoriesMap = new Map();
        categories.forEach((category) => {
            if (category.hasOwnProperty('id') && category.hasOwnProperty('name')) {
                categoriesMap.set(category.id, category.name);
            }
        });

        propertyState.categoriesMap = categoriesMap;
        propertyState.readCategoriesState = true;

        emitter.emit(eventName, { event: 'category', response });
    };

    fs.readFile(`${__dirname}/jsonDB/products.json`, 'utf8', readProducts);
    fs.readFile(`${__dirname}/jsonDB/workshops.json`, 'utf8', readWorkshops);
    fs.readFile(`${__dirname}/jsonDB/categories.json`, 'utf8', readCategories);
    
});

app.listen(3000);