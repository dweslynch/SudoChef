class NewRecipeForm extends React.Component
{
  constructor(props)
  {
    super(props);

    // Allows the form to submit groceries to the database
    this.flowup = props.flowup;
    this.backtrack = props.backtrack;
    this.recipeRef = props.recipeRef;
    this.user = props.user;

    this.state = { recipeName: "", ingredients: 1, ingredientlist: [], description: ""};

    // Bind event handlers
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRemoveIngredientButtonClick = this.handleRemoveIngredientButtonClick.bind(this);
    this.handleAddIngredientButtonClick = this.handleAddIngredientButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIngredientQuantityChange = this.handleIngredientQuantityChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  handleNameChange(event)
  {
    const val = event.target.value; // Have to grab value because the callback erases it
    this.setState({ recipeName: val });
  }

  handleDescriptionChange(event)
  {
    const val = event.target.value;
    this.setState({ description: val });
  }

  handleUnitChange(i, units)
  {
    this.setState(function(state) {
      // Grab list from state and change units of ingredient
      let _list = [...state.ingredientlist];

      if (_list[i])
      {
        _list[i].units = units;
      }
      else {
        // Don't set name, handleIngredientIChange will do that
        _list[i] = {
          units: units
        };
      }

      // Return new state
      let clone = {...state};
      clone.ingredientlist = _list;
      return clone;
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
      let clone = {...state};
      clone.ingredientlist = _list;
      return clone;
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
      let clone = {...state};
      clone.ingredientlist = _list;
      return clone;
    });
  }

  handleAddIngredientButtonClick(event)
  {
    // Add a new ingredient slot
    this.setState(function(state) {
      let clone = {...state};
      clone.ingredients = clone.ingredients + 1;
      return clone;
    });
  }

  handleRemoveIngredientButtonClick(i)
  {
    // Remove a specified ingredient slot
    this.setState(function(state) {
      let clone = {...state};
      clone.ingredients = clone.ingredients - 1;
      clone.ingredientlist.splice(i, 1);
      return clone;
    });
  }

  handleSubmit(event)
  {
    // Prevent reload
    event.preventDefault();

    let food = {
      name: this.state.recipeName,
      ingredients: this.state.ingredientlist,
      description: this.state.description,
      author: this.user.displayName,
      authorid: this.user.uid
    };

    // Send recipe back up to page to update database
    //this.flowup(food);

    // Get a key from Firebase for a new food
    let newDishKey = this.recipeRef.child(this.user.uid).push().key;

    // Push new recipe to database and rerender recipe finder
    this.recipeRef.child(this.user.uid).child(newDishKey).set(food).then(this.backtrack);
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
      <h2>Add New Recipe</h2>
      <label>Recipe Name:</label>
      <br/>
      <input type="text" value={this.state.recipeName} onChange={this.handleNameChange}/>
      <br/><br/>
      {
        arr.map(i =>
          <div>
            <label>Ingredient {i + 1}:&nbsp;&nbsp;</label>
            <input type="text" value={(this.state.ingredientlist[i]) ? this.state.ingredientlist[i].name : ""} onChange={(event) => this.handleIngredientIChange(i, event.target.value)}/>
            &nbsp;&nbsp;
            <input style={{"width": "50px"}} type="text" value={(this.state.ingredientlist[i]) ? this.state.ingredientlist[i].quantity : ""} onChange={(event) => this.handleIngredientQuantityChange(i, event.target.value)}/>
            &nbsp;&nbsp;
            <select value={(this.state.ingredientlist[i]) ? this.state.ingredientlist[i].units : ""} onChange={(event) => this.handleUnitChange(i, event.target.value)}>
              <option selected value=""> </option>
              <option value="tsp">tsp</option>
              <option value="Tbsp">Tbsp</option>
              <option value="cups">Cup(s)</option>
              <option value="oz">oz</option>
              <option value="mL">mL</option>
              <option value="L">Liter(s)</option>
            </select>
            <input style={{"background-color": "rgba(0,0,0,0)", border: "none"}} className="clickable" type="button" value="X" onClick={(event) => this.handleRemoveIngredientButtonClick(i)}/>
            <br/><br/>
          </div>
        )
      }
      <input type="button" value="Add Ingredient" onClick={this.handleAddIngredientButtonClick}/>
      <br/><br/>
      <label>Description and Instructions:</label>
      <br/>
      <textarea value={this.state.description} onChange={this.handleDescriptionChange}/>
      <br/><br/>
      <input type="submit" value="Submit"/>
      <h2 className="clickable" onClick={(event) => this.backtrack()}>Return to My Recipes&nbsp;&rsaquo;</h2>
    </form>;
  }
}

function renderNewRecipeForm(user, recipeRef, backtrack, container)
{
  ReactDOM.render(<NewRecipeForm user={user} recipeRef={recipeRef} backtrack={backtrack}/>, container);
}
