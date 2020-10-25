import logo from './logo.png';
import './App.css';
import {createRef, Component} from 'react';
import {Grid, Container, Image, Divider} from 'semantic-ui-react'
import InputForm from './components/InputForm'
import Results from './components/Results'

class App extends Component {
  constructor(){
    super()
  }

  onFormChange = (state) => {
    this.setState(prevState => ({
      ...prevState,
      formState: state
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
            <InputForm onFormChange={this.onFormChange}/>
          </Grid.Column>
          <Grid.Column>
            <div ref={el => this.container = el} style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: 700}}>
              <Results getDims={this.getContainerDimensions}/>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

}

export default App;
