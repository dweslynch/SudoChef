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

    this.titles = {
        peanutFree: "Peanut free",
        treenutFree: "Treenut free",
        fishFree: "Safe for fish allergies",
        shellfishFree: "Safe for shellfish allergies",
        dairyFree: "Dairy Free",
        eggFree: "Egg Free",
        kosher: "Kosher",
        vegetarian: "Vegetarian",
        vegan: "Vegan"
    };

    this.state = {
        recipeName: "",
        ingredients: 1,
        ingredientlist: [],
        description: "",
        instructions: "",
        tags: {
            peanutFree: false,
            treenutFree: false,
            fishFree: false,
            shellfishFree: false,
            dairyFree: false,
            eggFree: false,
            kosher: false,
            vegetarian: false,
            vegan: false
        }
    };

    // Bind event handlers
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRemoveIngredientButtonClick = this.handleRemoveIngredientButtonClick.bind(this);
    this.handleAddIngredientButtonClick = this.handleAddIngredientButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIngredientQuantityChange = this.handleIngredientQuantityChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleTagChange(event)
  {
      const name = event.target.name;
      this.setState(function(state) {
          console.log(state.tags[name]);
          state.tags[name] = !state.tags[name];
          return state;
      });
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

  handleInstructionsChange(event)
  {
      const val = event.target.value;
      this.setState({ instructions: val });
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
      instructions: this.state.instructions,
      tags: this.state.tags,
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
      <h2>Create New Recipe</h2>
      <input type="text" className="full" value={this.state.recipeName} placeholder="Recipe Name" onChange={this.handleNameChange}/>
      <br/><br/>
      {
        arr.map(i =>
          <div>
            <input type="text" value={(this.state.ingredientlist[i]) ? this.state.ingredientlist[i].name : ""} placeholder={`Ingredient ${i + 1}`} onChange={(event) => this.handleIngredientIChange(i, event.target.value)}/>
            &nbsp;&nbsp;
            <input style={{"width": "75px"}} type="text" value={(this.state.ingredientlist[i]) ? this.state.ingredientlist[i].quantity : ""} placeholder="Quantity" onChange={(event) => this.handleIngredientQuantityChange(i, event.target.value)}/>
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
            <input style={{"backgroundColor": "rgba(0,0,0,0)", border: "none"}} className="clickable circle-button" type="button" value="X" onClick={(event) => this.handleRemoveIngredientButtonClick(i)}/>
            <br/><br/>
          </div>
        )
      }
      <input type="button" className="dark-button fullest" value="Add Ingredient" onClick={this.handleAddIngredientButtonClick}/>
      <br/><br/>
      {
          Object.entries(this.state.tags).map(kvp =>
            <span>
                <input type="button" className={(kvp[1]) ? "spaced dark-button" : "spaced light-button"} name={kvp[0]} value={this.titles[kvp[0]]} onClick={this.handleTagChange}/>
                &nbsp;&nbsp;
            </span>
          )
      }
      <br/><br/>
      <br/>
      <label>Description:</label>
      <br/>
      <textarea value={this.state.description} className="full" onChange={this.handleDescriptionChange}/>
      <br/><br/>
      <label>Instructions:</label>
      <br/>
      <textarea value={this.state.instructions} className="full" onChange={this.handleInstructionsChange}/>
      <br/><br/>
      <input type="submit" className="dark-button fullest" value="Submit"/>
      <h2 className="clickable" onClick={(event) => this.backtrack()}>Return to Find Recipes&nbsp;&rsaquo;</h2>
    </form>;
  }
}

function renderNewRecipeForm(user, recipeRef, backtrack, container)
{
  ReactDOM.render(<NewRecipeForm user={user} recipeRef={recipeRef} backtrack={backtrack}/>, container);
}
