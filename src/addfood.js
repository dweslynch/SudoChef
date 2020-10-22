class AddRecipeForm extends React.Component
{
  constructor(props)
  {
    super(props);

    // Allows the form to submit groceries to the database
    this.flowup = props.flowup;
    this.recipes = props.recipes;
    this.backtrack = props.backtrack;
    console.log(this.recipes);

    this.state = { selectedvalue: "", selectedkey: ""};

    // Bind event handlers
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOptionClick(event)
  {
    console.log(event.target.value);
    const val = event.target.value; // Have to grab value because the callback erases it
    this.setState(function(state) {
      // Clone state
      let clone = {...state};

      // Change selected key and value
      clone.selectedkey = val;
      clone.selectedvalue = this.recipes[val].name;

      // Return new state
      return clone;
    });
  }

  handleSubmit(event)
  {
    // Prevent reload
    event.preventDefault();
    console.log(this.state.selectedkey);
    this.flowup(this.state.selectedkey);
  }

  render()
  {
    return <form onSubmit = {this.handleSubmit}>
      <h2>Add Recipe</h2>
      <br/>
      <label>Select Recipe:&nbsp;&nbsp;</label>
      <select value={this.state.selectedkey} onChange={this.handleOptionClick}>
        {
          Object.keys(this.recipes).map(k =>
            <option value={k}>{this.recipes[k].name} by {this.recipes[k].author}</option>
          )
        }
      </select>
      <br/><br/>
      <input type="submit" value="Submit"/>
      <h2 className="clickable" onClick={(event) => this.backtrack()}>Return to My Recipes&nbsp;&rsaquo;</h2>
    </form>;
  }
}

function renderAddRecipeForm(flowup, backtrack, recipes, container)
{
  ReactDOM.render(<AddRecipeForm flowup={flowup} recipes={recipes} backtrack={backtrack}/>, container);
}
