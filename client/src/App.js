import axios from 'axios';
import { getRecipes }  from './recipes.js';
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
      recipes: [],
      items: [],
      numMeals: 12,
    }
    this.update = 0;
  }

  componentDidMount = () => {
    this.recipePool = getRecipes();
    var recipesDict = {}
    var recipes = this.recipePool.slice(0, 9)
    recipes.forEach((recipe)=>{
      const id = recipe.id
      recipesDict[id] = recipe 
    })
    this.setState(prevState => ({
      ...prevState,
      recipes: recipesDict
    }));
  }

  onFormChange = (state) => {
    this.setState(prevState => ({
      ...prevState,
      formState: state
    }));
  }

  onFormSubmit = () => {
    this.update += 1;
    var indexes = new Set()
    for(var i = 0; i < 10; i++){
      var rand = Math.floor(Math.random() * Math.floor(this.recipePool.length))
      indexes.add(rand)
    }
    var recipes = {}
    var ingredients = []
    indexes.forEach((number, index) => {
      var recipe = this.recipePool[number];
      console.log(recipe)
      recipes[recipe.id] = recipe;
      recipe.ingredients.forEach((ingredient, index) => {
        ingredients.push(ingredient.simple);
      })
    })
    this.setState(prevState => ({
      ...prevState,
      recipes: recipes,
      ingredients: ingredients,
      update: !prevState.update
    }));
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
              <Results meals={this.state.recipes} key={this.update} getDims={this.getContainerDimensions}/>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

}

export default App;
