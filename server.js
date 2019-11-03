// console.log('Hello from Server');

// const http = require("http");
// http.createServer(function(request,response){

//     response.end("Hello NodeJS!");

// }).listen(3000, "127.0.0.1",function(){
//     console.log("Сервер начал прослушивание запросов на порту 3000");
// });

// // -------------------------------
// const http = require("http");
// const fs = require("fs");

// http.createServer(function(request, response){

//     console.log(`Запрошенный адрес: ${request.url}`);
//     // получаем путь после слеша
//     const filePath = request.url.substr(1);

//     // 
//     console.log('filePath: ', filePath);
//     console.log('request.url: ', request.url);
//     // 


//     // смотрим, есть ли такой файл
//     // fs.access(filePath, fs.constants.R_OK, err => {
//     fs.access('./build/index.html', fs.constants.R_OK, err => {
//     // fs.access('server.js', fs.constants.R_OK, err => {
//         // если произошла ошибка - отправляем статусный код 404
//         if(err){
//             response.statusCode = 404;
//             response.end("Resourse not found!");
//         }
//         else{
//             fs.createReadStream(filePath).pipe(response);
//         }
//       });
// }).listen(3000, function(){
//     console.log("Server started at 3000");
// });
// // ---------------------------

// const http = require("http");
// const fs = require("fs");

// http.createServer(function(request, response){

//     console.log(`Запрошенный адрес: ${request.url}`);
//     // получаем путь после слеша
//     const filePath = request.url.substr(1);
//     fs.readFile(filePath, function(error, data){

//         if(error){

//             response.statusCode = 404;
//             response.end("Resourse not found!");
//         }   
//         else{
//             response.end(data);
//         }
//     });
// }).listen(3000, function(){
//     console.log("Server started at 3000");
// });


const express = require("express");
const fs = require("fs");

const app = express();

const Emitter = require("events");
let emitter = new Emitter();
let eventName = "changeReadState";

emitter.on(eventName, (data) => {
    // console.log('event', data);
    const { readCategoriesState, readWorkshopsState, readProductsState } = propertyState;

    if (readCategoriesState && readWorkshopsState && readProductsState) {
        console.log('done');

        const { products, workshopsMap, categoriesMap } = propertyState;
        const { response } = data;

        result = products.map((elem) => {
            const newElem = {};
            newElem.id = elem.id;
            newElem.active = elem.active;
            newElem.use_discounts = elem.use_discounts;
            newElem.name = elem.name;

            // let key = elem.category.id;
            // let value = 'no value';
            // if (categoriesMap.has(key)) {
            //     value = categoriesMap.get(key); 
            // }
            // newElem.category = value;
            // console.log('test: ', elem.category.id);

            let value = 'no value';
            if (elem.hasOwnProperty('category')) {
                value = categoriesMap.get(elem.category.id);
                console.log('test +: ', elem.category.id);
                console.log('cat +: ', value);
            } else {
                console.log('test -: ', elem);
            }

            newElem.category = value;

            newElem.measure = elem.measure;

            key = elem.work_space.id;
            value = 'no value';
            if (workshopsMap.has(key)) {
                value = workshopsMap.get(key);
            }
            newElem.work_space = value;

            return newElem;
        });

        // console.log('----products------: ', result);

        response.send(JSON.stringify(result));
    }
});

const propertyState = {
    readCategoriesState: false,
    readWorkshopsState: false,
    readProductsState: false,
    products: null,
    workshopsMap: null,
    categoriesMap: null
};

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


    // // ----- work project
    // const fileProductsContent = fs.readFileSync(__dirname + "/jsonDB/products.json", "utf8");

    // const fileProductsContentOb = JSON.parse(fileProductsContent);

    // const products = fileProductsContentOb.data;

    // // console.log('----------------------------------------products: ', products);


    // const fileContentWorkshops = fs.readFileSync(__dirname + "/jsonDB/workshops.json", "utf8");

    // const fileContentWorkshopsOb = JSON.parse(fileContentWorkshops);

    // const workshops = fileContentWorkshopsOb.data;

    // let workshopsMap = new Map();
    // workshops.forEach((workshop) => {
    //     workshopsMap.set(workshop.id, workshop.name);
    // });


    // const fileContentCategories = fs.readFileSync(__dirname + "/jsonDB/categories.json", "utf8");

    // const fileContentCategoriesOb = JSON.parse(fileContentCategories);

    // const categories = fileContentCategoriesOb.data;

    // // think about check
    // let categoriesMap = new Map();
    // categories.forEach((category) => {
    //     categoriesMap.set(category.id, category.name);
    // });


    // // console.log('workshopsMap: ', workshopsMap);

    // result = products.map((elem) => {
    //     const newElem = {};
    //     newElem.id = elem.id;
    //     newElem.active = elem.active;
    //     newElem.use_discounts = elem.use_discounts;
    //     newElem.name = elem.name;

    //     // let key = elem.category.id;
    //     // let value = 'no value';
    //     // if (categoriesMap.has(key)) {
    //     //     value = categoriesMap.get(key); 
    //     // }
    //     // newElem.category = value;
    //     // console.log('test: ', elem.category.id);

    //     let value = 'no value';
    //     if (elem.hasOwnProperty('category')) {
    //         value = categoriesMap.get(elem.category.id);
    //         console.log('test +: ', elem.category.id);
    //         console.log('cat +: ', value);
    //     } else {
    //         console.log('test -: ', elem);
    //     }

    //     newElem.category = value;

    //     newElem.measure = elem.measure;

    //     key = elem.work_space.id;
    //     value = 'no value';
    //     if (workshopsMap.has(key)) {
    //         value = workshopsMap.get(key);
    //     }
    //     newElem.work_space = value;

    //     return newElem;
    // });

    // // console.log('----products------: ', result);

    // response.send(JSON.stringify(result));

    // // ----- work project

    //------------

    const readProducts = (error, data) => {
        //  response.send(JSON.stringify(result)); - error
        if (error) throw error;
        const products = JSON.parse(data).data;

        propertyState.products = products;
        propertyState.readProductsState = true;

        // console.log('read products - true', propertyState);

        emitter.emit(eventName, { event: 'products', response });
    };

    const readWorkshops = (error, data) => {

        //  response.send(JSON.stringify(result)); - error
        if (error) throw error;

        const workshops = JSON.parse(data).data;

        let workshopsMap = new Map();
        workshops.forEach((workshop) => {
            workshopsMap.set(workshop.id, workshop.name);
        });

        propertyState.workshopsMap = workshopsMap;
        propertyState.readWorkshopsState = true;

        // console.log('read workshops - true', propertyState);

        emitter.emit(eventName, { event: 'workshop', response });
    };

    const readCategories = (error, data) => {

        //  response.send(JSON.stringify(result)); - error
        if (error) throw error;

        const categories = JSON.parse(data).data;

        // think about check
        let categoriesMap = new Map();
        categories.forEach((category) => {
            categoriesMap.set(category.id, category.name);
        });

        propertyState.categoriesMap = categoriesMap;
        propertyState.readCategoriesState = true;

        // console.log('read categories - true', propertyState);

        emitter.emit(eventName, { event: 'category', response });
    };

    fs.readFile(__dirname + "/jsonDB/products.json", "utf8", readProducts);
    fs.readFile(__dirname + "/jsonDB/workshops.json", "utf8", readWorkshops);
    fs.readFile(__dirname + "/jsonDB/categories.json", "utf8", readCategories);


    // console.log('propertyState: ', propertyState);


});

app.listen(3000);