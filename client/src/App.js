import axios from 'axios';
import logo from './logo.png';
import './App.css';
import {Component} from 'react';
import {Grid, Container, Image, Divider} from 'semantic-ui-react'
import InputForm from './components/InputForm'
import Results from './components/Results'

class App extends Component {
  constructor(){
    super()
    this.spoonKey = "f47145e1238d4cb89bf99a85fe1d18ab";
    this.state = {
      recipeIds: [],
      recipes: []
    }
  }

  idsCallback = (response) => {
    let recipes = response.data.results;
    this.setState(prevState => ({
      ...prevState, recipeIds: recipes.map(obj => obj.id)}), 
      () => this.getRecipesPrimaryData());
  }

  primaryDataCallback = (response) => {
    var recipes = []
    let recipeData = response.data;
    recipeData.forEach(recipe_data => {
      let recipe = {};
      recipe.id = recipe_data.id;
      recipe.name = recipe_data.title;
      recipe.image = recipe_data.image;
      recipe.sourceUrl = recipe_data.sourceUrl;
      recipe.steps = []
      var ingredients = [];
      recipe_data.extendedIngredients.forEach(ingredient => {
        ingredients.push(ingredient.original);
      });
      recipe.ingredients = ingredients;
      recipes.push(recipe)
    })
    this.setState(prevState => ({
      ...prevState,
      recipes: recipes
    }), () => console.log(this.state))
  }

  secondaryDataCallback = (response, recipes, index) => {
    let instructions_data = response.data
    let recipe = recipes[index];
    console.log(instructions_data)
    if(!instructions_data){
      recipe.steps = []
    } else {
      var steps = [];
      instructions_data.forEach(instruction => {
        steps.push(instruction.step);
      })
      recipe.steps = steps;
    }
    recipes[index] = recipe
    this.setState(prevState => ({
      ...prevState,
      recipes: recipes 
    }));           
  }

  getRecipeIds = () => {
    axios.get('https://api.spoonacular.com/recipes/complexSearch?&number=9&apiKey=' + this.spoonKey)
        .then(this.idsCallback)
        .catch(function (error) {
            console.log(error);
        });
  }

  getRecipesPrimaryData = () => {
    let bulkRequest = "https://api.spoonacular.com/recipes/informationBulk?ids=";
    const recipeIds = this.state.recipeIds;
    recipeIds.forEach(id => {
      bulkRequest += id + "," 
    })
    bulkRequest += '&apiKey=' + this.spoonKey;
    axios.get(bulkRequest)
      .then(this.primaryDataCallback)
      .catch(function (error) {
        console.log(error);
      });
  }

  getRecipesSecondaryData = () => {
    var recipes = this.state.recipes;
    recipes.forEach((recipe, index) => {
      axios.get("https://api.spoonacular.com/recipes/" + recipe.id + "/analyzedInstructions?&apiKey=" + this.spoonKey)
        .then(response => this.secondaryDataCallback(response, recipes, index))
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  onFormChange = (state) => {
    this.setState(prevState => ({
      ...prevState,
      formState: state
    }));
  }

  onFormSubmit = () => {
    this.getRecipeIds();
    setTimeout(this.getRecipesSecondaryData, 2000);
  }

  getContainerDimensions = () => {
    if (this.container){
      return this.container.getBoundingClientRect();
    } 
  }

  render(){
    return(
      <Container style={{width: "80%", height: "100%"}}>
        <Image size="small" centered src={logo}></Image>
        <Divider horizontal/>
        <Grid columns={2} divided>
          <Grid.Column>
            <InputForm onFormSubmit={this.onFormSubmit} onFormChange={this.onFormChange}/>
          </Grid.Column>
          <Grid.Column>
            <div ref={el => this.container = el} style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: 700}}>
              <Results meals={this.state.recipes} getDims={this.getContainerDimensions}/>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

}

export default App;
