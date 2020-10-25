/**Spoontacular API Key: 274b0da100c3479bb8977f128718799f
Initial recipe search
https://api.spoonacular.com/recipes/complexSearch?query=dinner&number=1000&apiKey=274b0da100c3479bb8977f128718799f

get Recipe information bulk
https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429
**/

const maleCalories = 1800;
const femaleCalories = 1200;
const childCalories = 1000;

var recipes;
var recipeIds;
var ingredients;
var ingredientList = [""];
var allIngredients;
const krogerGet = "https://api.kroger.com/v1/products?filter.term="
const krogerKey = "&access_token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiIsImV4cCI6MTYwMzU4NjIxMSwiaWF0IjoxNjAzNTg0NDA2LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6IjNmYmE1MzVlLWM5OGItNTA5ZC1iMmQxLTJjMjI1N2EwNWM3YiIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjAzNTg0NDExNzM3NjUyNzQzLCJhenAiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiJ9.VzoWKibUWc9oleHHGZ_Nfi8Du_s9LjdAGrAeFbuRgVocsLgd6iPTF2xxcNegPbSoG-bidB7wUq82xGoUvGGpMpPgnsQU3fYEuvxYUo8g1Yp4eIxOxXh2fIElsqGMPYBA8_lo-KUhLYWPvaTlz6kApOvcM7QNKuQKtgmYHCcwINFAn2wSkiiTeypPm-rLuBWdKX5x7vuwXyVTJeGKW0r_TXHYXZAJNel8H11m3UnhH9aO0rPe7J9XHv_GANwQzo2t_PlAjwVG280OaDWBKV7iV4dh6LQI0THL0ZEiaYmTYDy1AaB_2crd8brAqXQORIZtueUQEmx0NJqpOSM9oT76_A"
var informationBulk = "https://api.spoonacular.com/recipes/informationBulk?ids=";
var calorieSearch = "https://api.spoonacular.com/recipes/findByNutrients?minCalories=";
let totalCalories;

//calculates needed calories based on adults, children, and days
function calcCalories(adultMale, adultFemale, child, days) {
    totalCalories = (maleCalories * days * adultMale) + 
    (femaleCalories * days * adultFemale) +
    (childCalories * days * child);
    console.log(totalCalories);
};

//Spoontacular API call to grab Recipe ID's
// Calls getIngredients 
function getRecipes() {
    axios.get('https://api.spoonacular.com/recipes/complexSearch?&number=2&apiKey=274b0da100c3479bb8977f128718799f')
        .then(function (response) {
            recipes = response.data.results;
            recipeIds = {id: recipes.map(obj => obj.id)};
            console.log(recipeIds);
            recipeIds.id.forEach(element => {
                informationBulk = informationBulk + element + ",";
            });
            informationBulk = informationBulk + '&apiKey=274b0da100c3479bb8977f128718799f';
            console.log('information bulk = ' + informationBulk);
            getIngredients();
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Spoontacular EPI call to grab ingredients of getRecipes() ID's
function getIngredients() {
    axios.get(informationBulk)
    .then(function (response) {
        ingredients = response.data;
        ingredients.forEach(element =>{
            allIngredients = element.extendedIngredients;
            allIngredients.forEach(element =>{
                console.log(element.name);
                ingredientList.push(element.name);
            });
        });
        printAllIngredients();
    })
    .catch(function (error) {
        console.log(error);
    });
}


//Prints ingredients from getIngredients()
// Does kroger API call 
function printAllIngredients() {
    ingredientList.forEach(element => {
        console.log(krogerGet + element + krogerKey);
        axios.get(krogerGet + element + krogerKey)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    });
}

//Uncomment to perform all of the API calls
//getRecipes();