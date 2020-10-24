

const AWSKey = 'AKIAI3M53X4F3QN4WEAQ'

export function getCart(asins) {


  var list = {};

  list.ingredients = [];

  var items = buildCartItem('apples', 'COUNT', '1');

  list.ingredients = items;

  addListItem(items, 'kale', 'bunches', '2');


  var string = JSON.stringify(list);

  console.log(string);


   console.log('Button Clicked');

   console.log(getCartURL(list));
}

function buildCartItem(name, unit, quantity) {

  var item = [{"name":name, "unit":unit, "quantity":quantity}];

  return item;
}

function addListItem(items, name, unit, quantity){
  items.push({"name":name, "unit":unit, "quantity":quantity});
}

function getCartURL(listString){

  var cartUrl = 'https://www.amazon.com/afx/ingredients/landingencoded?encodedIngredients=H4sIAAAAAAAAA'
  var encodedString = atob(listString);
  console.log(listString);
  console.log(encodedString);
  return cartUrl.concat(encodedString);

}

// https://www.amazon.com/afx/ingredients/landingencoded?encodedIngredients=H4sIAAAAAAAAAeyJpbmdyZWRpZW50cyI6W3sibmFtZSI6ImFwcGxlcyIsInVuaXQiOiJDT1VOVCIsInF1YW50aXR5IjoiMSJ9LHsibmFtZSI6ImthbGUiLCJ1bml0IjoiYnVuY2hlcyIsInF1YW50aXR5IjoiMiJ9XX0=


// https://www.amazon.com/afx/ingredients/landingencoded?encodedIngredients=H4sIAAAAAAAAAKtWysxLL0pNyUzNKylWsoquVspLzE1VslJKLCjISS1W0lEqzcssAfKd_UP9QoDcwtLEvJLMkkqgkKFSrQ5cfXZiTipCdVJpXnIGWDuSeiOl2thaAF0gGbhxAAAA
