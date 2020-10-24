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
var krogerGet = "https://api.kroger.com/v1/products?filter.term=fat%20free%20milk&access_token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiIsImV4cCI6MTYwMzU4MzkxNSwiaWF0IjoxNjAzNTgyMTEwLCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6IjNmYmE1MzVlLWM5OGItNTA5ZC1iMmQxLTJjMjI1N2EwNWM3YiIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjAzNTgyMTE1OTgwNTQwNzUxLCJhenAiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiJ9.BPJg-KyZJ9Uvw4YEv1tnfExrZ_EW2j5A0UeWC2uinmg9LrLjgJ6Utm0n-9HMBYMSiBWRE2R4tTw5fEtWpqqd2Ud5uKBub6kw3PA_Jbjbe44RuS-vRjeKh4Mj6bs7M5VQlo9ZibwdIXa5axV0dMVgr7K5sq4x-hrw-tcdlDZZMV8-uzOQDBHpyhJv2LmLK9Agn1Ck91Lyd7sOcP1C1Iy1WprXPY3Mz5qxZUpBY4TWZNrW5tDRrruqmjMLI5bEW4gd_TSnpqjkY9EMa5lWq94CxAd6D-MhhrLUxeAuzhH0KE5SWuUN8E2eEZqNyJ4za3Ap-6Sg54aNRrMxSHu6T5Z-dw"
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
        //console.log(element);
    });
    axios.get(krogerGet)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

//Uncomment to perform all of the API calls
//getRecipes();