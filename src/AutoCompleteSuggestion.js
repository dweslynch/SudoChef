class AutoCompleteSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.flowup = props.flowup;
    this.key = props.recipeKey;
    this.recipe = props.recipe;
    this.name = this.recipe.name;
    this.author = this.recipe.author;
    this.authorid = this.recipe.authorid;
  }

  render() {
    return (
      <div className="autocomplete-suggestion" onClick={(event) => this.flowup(this.authorid, this.key)}>
          {this.name} by {this.author}
      </div>
    );
  }
}
