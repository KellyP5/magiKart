# HackTX

# SQL IP Address </br>
Public IP Address: 35.202.15.44</br>
Connection Name: big-station-266218:us-central1:recipe</br>

# Requirements # 
Kroger Account
Local Hosting Server

# Spoontacular API
First API Call Documentation:
https://spoonacular.com/food-api/docs#Search-Recipes-Complex<br><br>
  <b>First API call, only extracts Recipe ID at the moment</b><br>
  axios.get('https://api.spoonacular.com/recipes/complexSearch?&number=2&apiKey=' + spoonKey)<br><br>

Second API Call Documentation: 
https://spoonacular.com/food-api/docs#Get-Recipe-Information-Bulk<br><br>
   <b>Second API call to get detailed recipe information</b><br>
   axios.get(informationBulk)<br>
   <i>information bulk = String of recipeID's from first API call</i><br>


# Kroger API
First API Call:
"https://api.kroger.com/v1/products?filter.term="

Second API Call:
"https://api.kroger.com/v1/cart/add"

# Heroku Issue - Need to host our own server
https://github.com/Rob--W/cors-anywhere
