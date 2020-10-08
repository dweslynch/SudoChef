class UpdateForm extends React.Component
{
  constructor(props)
  {
    super(props);

    // Allows the form to submit groceries to the database
    this.flowup = props.flowup;

    this.state = { recipeName: "", ingredients: 1, ingredientlist: []};

    // Bind event handlers
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIngredientQuantityChange = this.handleIngredientQuantityChange.bind(this);
  }

  handleNameChange(event)
  {
    const val = event.target.value; // Have to grab value because the callback erases it
    this.setState(function(state) {
      return {
        recipeName: val,
        ingredients: state.ingredients,
        ingredientlist: state.ingredientlist };
    });
  }

  handleIngredientIChange(i, name)
  {
    this.setState(function(state) {
      // Grab list from state and change name of ingredient
      let _list = [...state.ingredientlist];

      // Update name if ingredient exists, otherwise create one
      if (_list[i])
      {
        _list[i].name = name;
      }
      else
      {
        // Don't set quantity, handleIngredientQuantityChange will do that
        _list[i] = {
          name: name
        };
      }

      // Return new state
      return {
        recipeName: state.recipeName,
        ingredients: state.ingredients,
        ingredientlist: _list };
    });
  }

  handleIngredientQuantityChange(i, quantity)
  {
    this.setState(function(state) {
      // Grab list from state and change quantity of ingredient
      let _list = [...state.ingredientlist];

      if (_list[i])
      {
        _list[i].quantity = quantity;
      }
      else {
        // Don't set name, handleIngredientIChange will do that
        _list[i] = {
          quantity: quantity
        };
      }

      // Return new state
      return {
        recipeName: state.recipeName,
        ingredients: state.ingredients,
        ingredientlist: _list };
    });
  }

  handleButtonClick(event)
  {
    // Add a new ingredient slot
    this.setState(function(state) {
      return {
        recipeName: state.recipeName,
        ingredients: state.ingredients + 1,
        ingredientlist: state.ingredientlist };
    });
  }

  handleSubmit(event)
  {
    // Prevent reload
    event.preventDefault();

    let food = {
      name: this.state.recipeName,
      ingredients: this.state.ingredientlist
    };

    // Send recipe back up to page to update database
    this.flowup(food);
  }

  render()
  {
    // let arr = [1..this.state.ingredients]
    let arr = [];
    for (let i = 0; i < this.state.ingredients; i++)
    {
      arr.push(i);
    }

    return <form onSubmit={this.handleSubmit}>
      <h2>Add Recipe</h2>
      <label>Recipe Name:</label>
      <br/>
      <input type="text" value={this.state.recipeName} onChange={this.handleNameChange}/>
      <br/><br/>
      {
        arr.map(i =>
          <div>
            <label>Ingredient {i + 1}:&nbsp;&nbsp;</label>
            <input type="text" value={(this.state.ingredientlist[i]) ? this.state.ingredientlist[i].name : ""} onChange={(event) => this.handleIngredientIChange(i, event.target.value)}/>
            <input type="text" value={(this.state.ingredientlist[i]) ? this.state.ingredientlist[i].quantity : ""} onChange={(event) => this.handleIngredientQuantityChange(i, event.target.value)}/>
            <br/><br/>
          </div>
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
