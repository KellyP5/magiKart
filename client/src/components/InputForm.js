import {Component} from 'react';
import {Form, Radio, Header, Divider} from 'semantic-ui-react';
//import Slider, {Range} from 'rc-slider';

class InputForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            budget: "200.00",
            numDays: "10",
            numPeople: "2",
            calPerPerson: "2000",
            inclBreakfast: false,
            inclLunch: false,
            inclDinner: true 
        }
    }

    toggleBreakfast = () => {
        this.setState((prevState) => ({ ...prevState, inclBreakfast: !prevState.inclBreakfast}))
    }

    toggleLunch = () => {
        this.setState((prevState) => ({ ...prevState, inclLunch: !prevState.inclLunch}))
    }

    toggleDinner = () => {
        this.setState((prevState) => ({ ...prevState, inclDinner: !prevState.inclDinner}))
    }

    inputOnChange = (event) => {
        console.log(event.target.name);
        this.setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }), () => this.props.onFormChange(this.state));
    }

    render(){
        return(
            <Form>
                <Form.Input name="budget" icon="dollar" iconPosition="left" label="Budget" value={this.state.budget} onChange={this.inputOnChange}></Form.Input>
                <Form.Input name="numDays" label="Number of Days" value={this.state.numDays} onChange={this.inputOnChange}></Form.Input>
                <Form.Input name="numPeople" label="Number of People" value={this.state.numPeople} onChange={this.inputOnChange}></Form.Input>
                <Form.Input name="calPerPerson" label="Calories Per Person" value={this.state.calPerPerson} onChange={this.inputOnChange}></Form.Input>
                <Header as="h5">Meal Times</Header>
                <Form.Group label="Meals">
                    <Form.Field>
                        <Radio toggle onChange={this.toggleBreakfast} checked={this.state.inclBreakfast} label="Breakfast"/>
                    </Form.Field>
                    <Form.Field>
                        <Radio toggle onChange={this.toggleLunch} checked={this.state.inclLunch} label="Lunch"/>
                    </Form.Field>
                    <Form.Field>
                        <Radio toggle onChange={this.toggleDinner} checked={this.state.inclDinner} label="Dinner"/>
                    </Form.Field>
                </Form.Group>
                <Divider horizontal></Divider>
                <Form.Group style={{margin: "auto", width: "50%"}}>
                    <Form.Button onClick={this.props.onFormSubmit}>
                        Submit
                    </Form.Button>
                    <Form.Button onClick={this.props.onFormCheckout}>
                        Checkout
                    </Form.Button>
                </Form.Group>
            </Form>
        );
    }
}

export default InputForm