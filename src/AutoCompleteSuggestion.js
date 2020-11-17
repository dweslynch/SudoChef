class AutoCompleteSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.flowup = props.flowup;
    this.recipe = props.recipe;
    this.name = this.recipe.name;
    this.author = this.recipe.author;
  }

  render() {
    return (
      <div className="autocomplete-suggestion" onClick={(event) => this.flowup(this.recipe, "Return to Find Recipes")}>
          {this.name} by {this.author}
      </div>
    );
  }
}
