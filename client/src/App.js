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
      recipes[recipe.id] = recipe;
      recipe.ingredients.forEach((ingredient, index) => {
        ingredients.push(ingredient.basic);
      })
    })
    this.setState(prevState => ({
      ...prevState,
      recipes: recipes,
      ingredients: ingredients,
    }));
  }

  onFormCheckout = () => {
    this.ingredients = this.state.ingredients;
    this.pushIngredients()
  }

  getContainerDimensions = () => {
    if (this.container){
      return this.container.getBoundingClientRect();
    } 
  }

  pushIngredients() {
    //const krogerAuthentication = 'https://api.kroger.com/v1/connect/oauth2/authorize?scope=product.compact&response_type=code&client_id=recipes-953359d42ecb407753858da4391538868585293529240000182&redirect_uri=http://127.0.0.1:5500/index.html';
    const krogerGet = 'https://sheltered-fortress-21023.herokuapp.com/' + "https://api.kroger.com/v1/products?filter.term="
    const krogerKey = "&access_token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiIsImV4cCI6MTYwMzYzMzUzNCwiaWF0IjoxNjAzNjMxNzI5LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImU2ZDdmNjVkLWJjMjAtNTkzMi05NjNlLTRlNDQyOWM0NzBiMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjAzNjMxNzM0NzA0NjYzMTEzLCJwZmN4IjoidXJuOmtyb2dlcmNvOnByb2ZpbGU6c2hvcHBlcjoxOTczNDBkNy0wYTQ1LTQzY2ItOTA3ZS04NDQ1ZDgyODk0ODEiLCJhenAiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiJ9.o5Y-I96B8O0E4ZZNeNMt_EJ4bBAjfL1yz3-lXJ85D1NOjfq2tIyWqBpSjjw_J1en_Nx2kO29o5RNsQA9stgjTS1xJ0gdw3SPirf-fZaaLMNQAg0IiiHIbCkVhrOUf1NXMboG8Q4k0ifj1-iKC6SEHVIr40NWfxKNYXsx5q0kUkb8kd6_2Pry6KrZdRk4kRY5so9qZXOLhcBSizkLeQBQePiz4IzpZW9ZMMlOm8kzxaeMIMAl4mXhFUDSGXh8yODNuCAEoYOP-Pe-ho-UqoOeQ3zPpqpWKpehbdr3jtB08LWFK1yPAUtDqVNGEQj2h9FRo3Rlckov44QKDVqhMgNBrw";
    var ingredients = this.state.ingredients
    ingredients.forEach(element => {
        axios.get(krogerGet + element + krogerKey)
        .then(function (response) {
            var productId = response.data.data[0].productId;
            console.log(productId);
            var data = JSON.stringify({"items":[{"quantity":1,"upc":productId}]});
            var config = {
              method: 'put',
              url: 'https://sheltered-fortress-21023.herokuapp.com/' + 'https://api.kroger.com/v1/cart/add',
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJyZWNpcGVzLTk1MzM1OWQ0MmVjYjQwNzc1Mzg1OGRhNDM5MTUzODg2ODU4NTI5MzUyOTI0MDAwMDE4MiIsImV4cCI6MTYwMzYzMzgwOSwiaWF0IjoxNjAzNjMyMDA0LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImU2ZDdmNjVkLWJjMjAtNTkzMi05NjNlLTRlNDQyOWM0NzBiMSIsInNjb3BlIjoiY2FydC5iYXNpYzp3cml0ZSIsImF1dGhBdCI6MTYwMzYzMjAwOTIxNDQyODk1NSwicGZjeCI6InVybjprcm9nZXJjbzpwcm9maWxlOnNob3BwZXI6MTk3MzQwZDctMGE0NS00M2NiLTkwN2UtODQ0NWQ4Mjg5NDgxIiwiYXpwIjoicmVjaXBlcy05NTMzNTlkNDJlY2I0MDc3NTM4NThkYTQzOTE1Mzg4Njg1ODUyOTM1MjkyNDAwMDAxODIifQ.UR9oaOqlup23dnr_kgkbdmiHZjZVcBJR1eO-4veCDED6XuSP6QuFOrHf8ltXyOFFR6FilyXqHHM_m7yy3mMga4NiZDlXgJsgvSzOcm7wGn5cQeqHB8Ogw5lprekqv4gmVxudnO0_IEBUJPWXHdZQUASPU84pGfZx-tTFxpHqPpHlm9l_80yyPa0p_jhqFFjzBxjrNepRHgPIrywqJqyfDgAW5x5iEut-ZlvhlhRGCqR7QvpeRtd7HtcjwjzdUYyMFid1Mj8ln1_RqoSc8OyTyM_SHM42dieDTq7RbEE0WNsiKSouqIwPmsWDiqPEdXMWWZ8bYb9j2eki_BHsmLL7tQ', 
                'Cookie': '_gcl_au=1.1.2006088855.1603575799; rxVisitor=1603575845111TT5N6IV68MGRL1B5MC4MI3P8CH0ICPNU; DivisionID=025; StoreCode=00613; _pin_unauth=dWlkPU5qRm1NR1JqWW1JdE5EZ3lZaTAwTVRCakxUbGpaamd0WWpReE1USTJOR1UzT1RjNQ; RT="z=1&dm=kroger.com&si=gp9z3jo8j6b&ss=kgo7nl1g&sl=1&tt=0&nu=9da7d33a729e95e92719ecd580697b07&cl=pja&obo=1&ld=qys&r=9da7d33a729e95e92719ecd580697b07&ul=qyu&hd=rhb"; akaalb_Digital_ALB_API=~op=KT_Digital_API_KCVG_F5:api-kcvg|KT_Digital_API_Apigee:api-apigee|~rv=37~m=api-kcvg:0|api-apigee:0|~os=75b4a9ec926d2a9e67035451773cec6c~id=91501d3e41a0b7dcff31146f9a95ee0f; s_ips=578; AMCVS_371C27E253DB0F910A490D4E%40AdobeOrg=1; s_cc=true; bm_sz=AC9ECE72596360CACE12986F8D0F28C6~YAAQAzfVF4rvKVl1AQAANBCzXwkXDXbd43GXYposfnwgGh+d6NMYxY/IAoL3o7VSpmMUDBqPZQvTpHgwUiSX6z3x5rujoOORaPTozNacc9JVRy8m5fXQBpHxVTnw9V0/sX8AJ7/UNLNXj5GDIzxsVjh6PV6aEUNkvzkaYGUtJMDNL+tDbKdkY2gLSexF5a7F; AMCV_371C27E253DB0F910A490D4E%40AdobeOrg=-432600572%7CMCIDTS%7C18560%7CMCMID%7C36280152519877809193001074290303296431%7CMCAAMLH-1604233173%7C7%7CMCAAMB-1604233173%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1603635573s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18567%7CvVersion%7C4.5.2; s_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vMTI3LjAuMC4xOjU1MDAvaW5kZXguaHRtbCIsInNjb3BlIjoiY2FydC5iYXNpYzp3cml0ZSIsImF1ZCI6InJlY2lwZXMtOTUzMzU5ZDQyZWNiNDA3NzUzODU4ZGE0MzkxNTM4ODY4NTg1MjkzNTI5MjQwMDAwMTgyIiwiZXhwIjoxNjAzNjMyNjAxLCJpc3MiOiJLcm9nZXIiLCJzdWIiOiJlMDEzNDVjNC1jMTgyLTQ1MjEtYWJhMS04YTJmYjg3ZmZhZDUifQ.J4gW-hsEaHiXpw75m7UFGOEEvZ9FUl7oiT2WZU-CofA; pid=e01345c4-c182-4521-aba1-8a2fb87ffad5; s_tslv=1603632001850; _uetsid=ee2040f0164111ebbb72f399747a8f42; _uetvid=ee205d00164111eb9fafe9bb46652adc; s_tp=1172; s_ppv=bn%253Av1%253Aconnect%253Asignin%2C49%2C49%2C578%2C1%2C2; s_sq=krgrmobileprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dbn%25253Av1%25253Aconnect%25253Asignin%2526link%253DSign%252520In%2526region%253Dsignin_form%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dbn%25253Av1%25253Aconnect%25253Asignin%2526pidt%253D1%2526oid%253DSign%252520In%2526oidt%253D3%2526ot%253DSUBMIT; umid=72397ab2-d71f-4ef1-b146-5173fa7e0944; j_id=; _abck=138A8FB4A14A4FFFD0318F8C46124B27~-1~YAAQAzfVF0hIKll1AQAAcqbqXwSH3zvBU694ejFrtsmEZxUFTN7AI2X6oGx97qF8iV5iYLWUmMidZ6BA9IfIQ7HsIlXhP6QSIDQ7lXdJzlCbW20lV8wYP1yb8cMNOL9O5xGu2+n3hB2eyT7VW/2oLTJC1kL982qXjCHsdKLNrcX4q/C/r6cd6HHydSCb3Ehr9i9nqtZzGEzBD4Cg7h9ccfnqVphkaub6tf5H8reLb4JNocIOiGOs961vXvmEc109soAMvHGwUROcHckPoQE4unl4jlkuEA2ZyhAS+Ib6Z8i/QvIkIWk9jxFIAlDpzaygR3NkGHxfJp+gnjIDtbTd+vTgsgw=~0~-1~-1'
              },
              data : data
            };
            axios(config)
                .then(function (response) {console.log(JSON.stringify(response.data));})
                .catch(function (error) {console.log(error);});
        })
        .catch(function (error) {
            console.log(error);
        });
    });
  }

  render(){
    return(
      <Container style={{width: "80%", height: "100%"}}>
        <Image size="small" centered src={logo}></Image>
        <Divider horizontal/>
        <Grid columns={2} divided>
          <Grid.Column>
            <InputForm onFormSubmit={this.onFormSubmit} onFormCheckout={this.onFormCheckout} onFormChange={this.onFormChange}/>
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
