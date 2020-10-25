import {Card, Divider, Button, Icon, Portal, Item, List, Container, Image} from 'semantic-ui-react';
import {Component} from 'react';

class MealCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            type: this.props.meal.type,
            name: this.props.meal.name,
            description: this.props.meal.description,
            ingredients: this.props.meal.ingredients,
            image: this.props.meal.image,
            recipeSteps: ["Do stuff"]
        }
    }

    handleClose = () => this.setState(prevState => ({ ...prevState, open: false }))
    handleOpen = () => this.setState(prevState => ({ ...prevState, open: true}))

    render(){
        const ingredients = this.state.ingredients;
        var ingredientsListItems = [];
        ingredients.forEach((ingredient, index) => {
            ingredientsListItems.push(
                <List.Item>
                    {ingredient}
                </List.Item>    
            )
        })
        
        const steps = this.state.recipeSteps;
        var recipeInstructionsItems = [];
        steps.forEach((step, index) => {
            recipeInstructionsItems.push(
                <List.Item>
                    {step}
                </List.Item>    
            )
        })

        const expandDims = this.props.getContainerDims();

        return (
            <Container style={{height: "100%"}}>
                <Card style={{height: "100%"}}>
                    <Image src={this.state.image} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>{this.state.name}</Card.Header>
                        <Card.Meta>{this.state.type}</Card.Meta>
                        <Card.Description>{this.state.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button style={{float: "left"}} icon onClick={this.handleOpen}>
                            <Icon name="expand arrows alternate"/>
                        </Button>
                        <Button style={{float: "right"}} icon>
                            <Icon name="refresh"/>
                        </Button> 
                    </Card.Content>
                </Card>
                <Portal onClose={this.handleClose} open={this.state.open}>
                    <Container style={{left: expandDims.left, 
                                    top: expandDims.top, 
                                    position: "fixed",
                                    zIndex: 1000,
                                    width: expandDims.width,
                                    height: expandDims.height,
                                    }}>
                        <Container style={{width: "100%", height: "100%", backgroundColor:"white"}}>
                            <Card style={{width: "100%", height: "100%", overflowY: 'auto', overflowX: 'hidden'}}>
                                <Image size="medium" style={{margin: "auto", width: "50%"}} src={this.state.image} ui={false}/>
                                <Card.Content>
                                    <Card.Header>{this.state.name}</Card.Header>
                                    <Card.Meta>{this.state.type}</Card.Meta>
                                    <Card.Description>
                                        <Container>
                                            <Divider horizontal>Ingredients</Divider>
                                            <List>{ingredientsListItems}</List>
                                            <Divider horizontal>Instructions</Divider>
                                            <List ordered>{recipeInstructionsItems}</List>
                                        </Container>
                                    </Card.Description>
                                </Card.Content>

                                <Card.Content extra>
                                    <Button style={{float: "left"}} icon onClick={this.handleClose}>
                                        <Icon name="close"/>
                                    </Button>
                                    <Button style={{float: "right"}} icon>
                                        <Icon name="refresh"/>
                                    </Button> 
                                </Card.Content>
                            </Card>
                        </Container>
                    </Container>
                </Portal>
            </Container>
            
            )


    }
}

export default MealCard;