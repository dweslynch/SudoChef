class RecipeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.dateNumber = props.dateNumber;

    this.day = props.day;
    this.meal = props.meal;
    this.userRef = props.userRef;
    this.slotClick = props.slotClick;

    this.state = {
      content: null,
      recipeKey: "",
      recipeName: "",
      recipeAuthorId: ""
    };

    this.updateRecipeFromSnapshot = this.updateRecipeFromSnapshot.bind(this);
  }

  componentDidMount()
  {
      this.userRef.child('calendar').child(this.day).child(this.meal).once('value').then(this.updateRecipeFromSnapshot);

      // Continuous updates
      this.userRef.child('calendar').child(this.day).child(this.meal).on('value', this.updateRecipeFromSnapshot);
  }

  updateRecipeFromSnapshot(snapshot)
  {
      if (snapshot.val())
      {
          const recipe = snapshot.val();
          this.setState({
              recipeKey: recipe.key,
              recipeName: recipe.name,
              recipeAuthorId: recipe.authorid
          });
      }
      else
      {
          this.setState({
              recipeKey: "",
          });
      }
  }

  clear() {
    this.state.recipeKey = null;
  }

  handleClick() {
    if(this.state.content == null) {
      //return;
    } else {
      setState({ content: null });
    }
  }

  render() {
    return (
      <div className = "slotWrapper" >
        <div className="slot" onClick={this.slotClick(this.day, this.meal)}></div>
        <button className="deleteButton" onClick={this.clear}/>

      </div>
    )
  }
}
