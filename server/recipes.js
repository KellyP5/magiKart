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
var productId;
var productIds;
var productIdArr = [""];
const krogerGet = "https://api.kroger.com/v1/products?filter.term="
const krogerKey = "&access_token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiIsImV4cCI6MTYwMzU5NDkyMiwiaWF0IjoxNjAzNTkzMTE3LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImU2ZDdmNjVkLWJjMjAtNTkzMi05NjNlLTRlNDQyOWM0NzBiMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjAzNTkzMTIyNDk5NjU4ODQ4LCJwZmN4IjoidXJuOmtyb2dlcmNvOnByb2ZpbGU6c2hvcHBlcjoxOTczNDBkNy0wYTQ1LTQzY2ItOTA3ZS04NDQ1ZDgyODk0ODEiLCJhenAiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiJ9.GY3e85qCZVYul59JScrUKUqJ5i_XrH_S4_qjoItkFm3Qz04XXtaRa2QKDUtps-Ut_zO7fjnCyJhbXc8R3A6nUEYBT18K8e1Row82CmiFoYWqlwWule1A9oRYoM7426fVSgAuIte2_F80_uxKYAcU0U1wcH4GyMXh0OSYCh2upHg4zESD1pxer_Yd3iSSothK-FakMMeYgLg5btTCR-lS1s9Kzbfs0bNjHhCIlzXWi2l0pWsf4bJ5HNElMAY-uwfHA9E2xEeo3r17rN3AFp-XFMDUE4_xCtwVxO9MZyq2zub6N8eXJvOSbXA-vv6C6p0b7xUMn0q7rKprlplO_7T5rA";
const krogerCart = "https://api.kroger.com/v1/cart/add";
const krogerCartKey = "";
const spoonKey = "274b0da100c3479bb8977f128718799f";
var informationBulk = "https://api.spoonacular.com/recipes/informationBulk?ids=";
var calorieSearch = "https://api.spoonacular.com/recipes/findByNutrients?minCalories=";
let totalCalories;

var data = JSON.stringify({"items":[{"quantity":1,"upc":"0001111060903"}]});
var config = {
  method: 'put',
  url: 'https://api.kroger.com/v1/cart/add',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJtYWdpY2thcnQtZmFiNzE4OGQ4YmUyNTAxZWIzOWQ3NDVjN2ZkNGM5ZDMyNzA3NjQ0NjEyOTkxNjA5NzM3IiwiZXhwIjoxNjAzNTk0MzI3LCJpYXQiOjE2MDM1OTI1MjIsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiZTZkN2Y2NWQtYmMyMC01OTMyLTk2M2UtNGU0NDI5YzQ3MGIxIiwic2NvcGUiOiJjYXJ0LmJhc2ljOndyaXRlIiwiYXV0aEF0IjoxNjAzNTkyNTI3NjY0MjIyNzQyLCJwZmN4IjoidXJuOmtyb2dlcmNvOnByb2ZpbGU6c2hvcHBlcjoxOTczNDBkNy0wYTQ1LTQzY2ItOTA3ZS04NDQ1ZDgyODk0ODEiLCJhenAiOiJtYWdpY2thcnQtZmFiNzE4OGQ4YmUyNTAxZWIzOWQ3NDVjN2ZkNGM5ZDMyNzA3NjQ0NjEyOTkxNjA5NzM3In0.Pl9t0piai5wQJnwbAz-q_Q3s74fx0194jCRfwNRLwO94nwEAlkB4KAlL8PIl2li6eF_W6axbfh7JRKy_5JfkpUOn7Y_3wmCe01HQJLqp3iHhH3Ea6rPfQohBEl8QPZFlcOn7HDSD3CG2GESdz08drL813SgjtnRCUvNDh-pzI5Ov8PEApvAdypkJcreaiHtaozxL25VuakQF7fkUHwf_xbbQDr2XbqGfbAIdg88o3GEREMin7Z2HMjq4ApyLm3GC74T1DBl6ENps1gIdJrk5oQUPXoGSTtO2HMC5N2miXDNsBNmWUNQ3HulAbVxoaRC3SBX-hX5DMr31VqBnqGwTiA', 
    'Cookie': 'bm_sz=05E85F6EF3B629E52F395A76CD260DC9~YAAQIivorHaDlll1AQAAa0+KXQnSxZeh9YFFv0FYubazXYRH9OCoz1ql1nc4kkBd0zCh/Lx3cl8w0DDYdHfqpskTDpMgUe1pBAdDYBemkUORu/MoJufF0j7R6nG7FBP/3kgfSYj/FJjXbgiUqVKnQqOwsKBHyZS4BwEggBIoo4sdytiqoUvAbev1zHnVMLLk; s_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vMTI3LjAuMC4xOjU1MDAvc2VydmVyL2luZGV4Lmh0bWwiLCJzY29wZSI6ImNhcnQuYmFzaWM6d3JpdGUiLCJhdWQiOiJtYWdpY2thcnQtZmFiNzE4OGQ4YmUyNTAxZWIzOWQ3NDVjN2ZkNGM5ZDMyNzA3NjQ0NjEyOTkxNjA5NzM3IiwiZXhwIjoxNjAzNTkzMTAxLCJpc3MiOiJLcm9nZXIiLCJzdWIiOiIyMzFjYjIyNC1hZGQ4LTQ1NGEtYjU1Yy0wMDk1MDgzNGE2YzMifQ.t6ZqyMJ34Znzy4Avjk5jTzvGr4pMSFBcN54LP7ejGhY; akaalb_Digital_ALB_API=~op=KT_Digital_API_KCVG_F5:api-kcvg|KT_Digital_API_Apigee:api-apigee|~rv=68~m=api-kcvg:0|api-apigee:0|~os=75b4a9ec926d2a9e67035451773cec6c~id=32fb16e70b8fbcf2b139943e3399c5a1; pid=231cb224-add8-454a-b55c-00950834a6c3; s_ips=575; s_tslv=1603592501717; AMCVS_371C27E253DB0F910A490D4E%40AdobeOrg=1; s_cc=true; _uetsid=d1df7dd0166811eb84aeabc726aa02de; _uetvid=d1dfaae0166811eb90e0896cc828d177; AMCV_371C27E253DB0F910A490D4E%40AdobeOrg=-432600572%7CMCIDTS%7C18561%7CMCMID%7C72025143155091291700140402671523222818%7CMCAAMLH-1604197301%7C7%7CMCAAMB-1604197301%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1603599701s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18568%7CvVersion%7C4.5.2; _gcl_au=1.1.116707699.1603592502; s_tp=1172; s_ppv=bn%253Av1%253Aconnect%253Asignin%2C49%2C49%2C575%2C1%2C2; s_sq=krgrmobileprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dbn%25253Av1%25253Aconnect%25253Asignin%2526link%253DSign%252520In%2526region%253Dsignin_form%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dbn%25253Av1%25253Aconnect%25253Asignin%2526pidt%253D1%2526oid%253DSign%252520In%2526oidt%253D3%2526ot%253DSUBMIT; umid=ee1801cb-f7d9-46ad-b174-20af4dff7b6d; j_id=; _abck=F7379DFDA22C678310CB45EFF2CB1514~-1~YAAQlivorJq2/VV1AQAA/i6QXQS12bmRq/wZfEI/b/U4DFgSNpWoZ2wCNAdH5Ae3Vrtwu19aiAxA0ognoPYX6NHjiEZvlnGT7FbSedeltD3gyXFAyYQcJXQ7/RK8qxGHu056dxF5O5YIoc1cqv1Am42DEuAtiUPjSASTHD2dHpTIQdElTu9BlMFGOXvcvVVUE4PkiPaRUgpOzJNEubBE9i8/oErVz7FI15joWVT0gv/TNbO20SID8Zk8QFstqfhZ9XHhtpsHVLhv2jrWeYpPyTvsyZC2XvkAgU3rXAZFTGjRSqjwZMEpVXqFomlsREoIaapiDJ99vUYOvIsCdlLaCoWoEaA=~0~-1~-1'
  },
  data : data
};

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
    axios.get('https://api.spoonacular.com/recipes/complexSearch?&number=2&apiKey=' + spoonKey)
        .then(function (response) {
            recipes = response.data.results;
            recipeIds = {id: recipes.map(obj => obj.id)};
            console.log(recipeIds);
            recipeIds.id.forEach(element => {
                informationBulk = informationBulk + element + ",";
            });
            informationBulk = informationBulk + '&apiKey=' + spoonKey;
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
                //console.log(element.name);
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
        //console.log(krogerGet + element + krogerKey);
        axios.get(krogerGet + element + krogerKey)
        .then(function (response) {
            productId = response.data.data[0].productId;
            productIdArr.push(productId);
            /**axios(config)
            .then(function (response) {
                console.count(response);
            });**/
            console.log(productId);
        })
        .catch(function (error) {
            console.log(error);
        });
    });
}

axios(config)
        .then(function (response) {
            console.count(response);
    });

//Uncomment to perform all of the API calls
//etRecipes();