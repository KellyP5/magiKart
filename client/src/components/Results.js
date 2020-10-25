import React, {Component} from 'react';
import MealCard from './MealCard';
import {Grid} from 'semantic-ui-react';

class Results extends Component {
    constructor(props){
        super(props)
        this.state = {
            meals: this.props.meals
        }
    }

    componentDidMount = () => {
        this.setState({
            meals: [
                {type: "Dinner", 
                  name: "Chicken Parm", 
                  description: "Crispy parmesan and breadcrumb encrusted chicken smothered in marinara sauce",
                  ingredients: ["Chicken breast", "Parmesan Cheese", "Panko Bread Crumbs", "Olive Oil", "Tomato Sauce"],
                  image: "https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_2070_1452.JPEG",
                  steps: ["Do stuff"]},
                 {type: "Lunch",
                  name: "Ham Sandwhich",
                  description: "Toasted ham and swiss sandwhich with a delicious aioli spread",
                  steps: ["Do stuff"],
                  ingredients: ["Thin sliced ham", "Thin sliced Swiss cheese", "French Baguette", "Garlic Aioli"],
                  image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190322-ham-sandwich-horizontal-1553721016.png"},
                 {type: "Breakfast",
                  name: "Avocado Toast",
                  steps: ["Do stuff"],
                  description: "The avocado toast you know and love",
                  ingredients: ["Avocado", "Sourdough", "Salt", "Pepper"],
                  image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2018%2F07%2Fmain%2F1807w-avocado-toast-recipe.jpg%3Fitok%3D_dDi7ZQQ"
                 }
                ,
                {type: "Dinner", 
                  name: "Chicken Parm",
                  steps: ["Do stuff"], 
                  description: "Crispy parmesan and breadcrumb encrusted chicken smothered in marinara sauce",
                  ingredients: ["Chicken breast", "Parmesan Cheese", "Panko Bread Crumbs", "Olive Oil", "Tomato Sauce"],
                  image: "https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_2070_1452.JPEG"},
                 {type: "Lunch",
                  name: "Ham Sandwhich",
                  steps: ["Do stuff"],
                  description: "Toasted ham and swiss sandwhich with a delicious aioli spread",
                  ingredients: ["Thin sliced ham", "Thin sliced Swiss cheese", "French Baguette", "Garlic Aioli"],
                  image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190322-ham-sandwich-horizontal-1553721016.png"},
                 {type: "Breakfast",
                  name: "Avocado Toast",
                  steps: ["Do stuff"],
                  description: "The avocado toast you know and love",
                  ingredients: ["Avocado", "Sourdough", "Salt", "Pepper"],
                  image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2018%2F07%2Fmain%2F1807w-avocado-toast-recipe.jpg%3Fitok%3D_dDi7ZQQ"
                 }
                ,
                {type: "Dinner", 
                  name: "Chicken Parm",
                  steps: ["Do stuff"], 
                  description: "Crispy parmesan and breadcrumb encrusted chicken smothered in marinara sauce",
                  ingredients: ["Chicken breast", "Parmesan Cheese", "Panko Bread Crumbs", "Olive Oil", "Tomato Sauce"],
                  image: "https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_2070_1452.JPEG"},
                 {type: "Lunch",
                  name: "Ham Sandwhich",
                  steps: ["Do stuff"],
                  description: "Toasted ham and swiss sandwhich with a delicious aioli spread",
                  ingredients: ["Thin sliced ham", "Thin sliced Swiss cheese", "French Baguette", "Garlic Aioli"],
                  image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190322-ham-sandwich-horizontal-1553721016.png"},
                 {type: "Breakfast",
                  name: "Avocado Toast",
                  steps: ["Do stuff"],
                  description: "The avocado toast you know and love",
                  ingredients: ["Avocado", "Sourdough", "Salt", "Pepper"],
                  image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2018%2F07%2Fmain%2F1807w-avocado-toast-recipe.jpg%3Fitok%3D_dDi7ZQQ"
                 }
                
            ]
        })
    }

    render(){
        const meals = this.props.meals;
        const mealplan = [];
        while(meals.length) mealplan.push(meals.splice(0, 3));
        var rows = [];
        mealplan.forEach((day, row) => {
            var columns = [];
            day.forEach((meal, column) => {
                columns.push(<Grid.Column><MealCard getContainerDims={this.props.getDims} meal={meal}></MealCard></Grid.Column>);
            });    
            rows.push(<Grid.Row>{columns}</Grid.Row>);
        });

        return (
            <Grid columns="equal">
                {rows} 
            </Grid>
        )
    }
} 

export default Results;