class UpdateForm extends React.Component
{
  constructor(props)
  {
    super(props);

    this.flowup = props.flowup;

    this.state = { recipeName: "", ingredients: 1, ingredientlist: []};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event)
  {
    const val = event.target.value;
    this.setState(function(state) { return { recipeName: val, ingredients: state.ingredients, ingredientlist: state.ingredientlist }});
  }

  handleIngredientIChange(i, name)
  {
    this.setState(function(state) {
      let rName = state.recipeName;
      let _ingredients = state.ingredients;
      let _list = [...state.ingredientlist];
      _list[i] = name;
      return { recipeName: rName, ingredients: _ingredients, ingredientlist: _list };
    });
  }

  handleButtonClick(event)
  {
    this.setState(function(state) {
      return { recipeName: state.recipeName, ingredients: state.ingredients + 1, ingredientlist: state.ingredientlist };
    });
  }

  handleSubmit(event)
  {
    event.preventDefault();
    let ingredients = {};
    for (let i = 0; i < this.state.ingredientlist.length; i++)
    {
      ingredients[this.state.ingredientlist[i]] = 1;
    }
    let obj = {};
    obj[this.state.recipeName] = ingredients;
    this.flowup(obj);
  }

  render()
  {
    let arr = [];
    for (let i = 0; i < this.state.ingredients; i++)
    {
      arr.push(i);
    }
    return <form onSubmit={this.handleSubmit}>
      Recipe Name:
      <input value={this.state.recipeName} onChange={this.handleNameChange}/>
      {
        arr.map(i =>
          <input type="text" value={this.state.ingredientlist[i]} onChange={(event) => this.handleIngredientIChange(i, event.target.value)}/>
        )
      }
      <input type="button" value="Add Ingredient" onClick={this.handleButtonClick}/>
      <input type="submit" value="Submit"/>
    </form>;
  }
}

function renderform(flowup, container)
{
  ReactDOM.render(<UpdateForm flowup={flowup} />, container);
}
