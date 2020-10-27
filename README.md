[![Magikart](http://img.youtube.com/vi/rPkVlPrkrTs/0.jpg)](http://www.youtube.com/watch?v=rPkVlPrkrTs "")

## Inspiration

Working families, busy health care professionals, teachers and everyone else are pushed to the limit with time constraints. Take one thing off your plate by clicking a couple buttons to have meals planned and ingredients delivered to your door by a local grocer. 

## What it does

Based off of number of people, calorie requirements and days of food needed, magiKart will come up with 3 meals a day for your household. Submitting the meal plan to cart will push all of the ingredients to your Kroger cart for pickup or delivery.

## How we built it

React front end, with a JavaScript back-end and a SQL cloud.


## Challenges we ran into

Our first idea was to use the Amazon cart API, however local, fresh delivered ingredients are not available for adding to carts through the API. Next we tried the Amazon Fresh API, which no documentation is available for and would require assistance from AWS to implement. We were left with finding an API to a local grocer and settled on Kroger. 

## Accomplishments that we're proud of

Overcoming the significant API challenges and getting a working app that pulls from recipe and ingredients APIs and pushes to the Kroger cart API to successfully populate a shopping cart full of food.

## What we learned

We learned a significant amount about build react front ends and making API call with authentication tokens.

## What's next for magiKart

We envision magiKart being able to integrate more features. Key features would include:
- Daily options for tomorrow's meals, click of a button gets groceries on order and delivered.
- Tracking of recently ordered groceries such as spices and staples to keep from reordering too often.
- Integration with other grocery stores and Amazon Fresh.


# SQL IP Address </br>
Public IP Address: 35.202.15.44</br>
Connection Name: big-station-266218:us-central1:recipe</br>

# Requirements # 
Kroger Account<br>
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
