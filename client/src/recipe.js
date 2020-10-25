/**Spoontacular API Key: 274b0da100c3479bb8977f128718799f
Initial recipe search
https://api.spoonacular.com/recipes/complexSearch?query=dinner&number=100&apiKey=274b0da100c3479bb8977f128718799f

get Recipe information bulk
https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429
**/

import axios from 'axios';

const maleCalories = 1800;
const femaleCalories = 1200;
const childCalories = 1000;
let totalCalories;
let minCalories = 1000;

console.log('Hello');

function calcCalories(adultMale, adultFemale, child, days) {
    totalCalories = (maleCalories * days * adultMale) + 
    (femaleCalories * days * adultFemale) +
    (childCalories * days * child);
    console.log(totalCalories);
};

axios.get('https://api.spoonacular.com/recipes/complexSearch?query=dinner&apiKey=274b0da100c3479bb8977f128718799f')
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (error) {
        //handle error
        console.log(error);
    })
    .then(function () {
        //always executed
    });

calcCalories();