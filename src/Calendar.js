class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.userRef = props.userRef;

    this.state = {
      userRecipes: { },
      selectedRecipe: "",
      days: { },
    };

    this.handleRecipeClick = this.handleRecipeClick.bind(this);
    this.updateUserRecipesFromSnapshot = this.updateUserRecipesFromSnapshot.bind(this);
    this.handleSlotClick = this.handleSlotClick.bind(this);
  }

  componentDidMount()
  {
      this.userRef.child('inventory').once('value').then(this.updateUserRecipesFromSnapshot);
  }

  updateUserRecipesFromSnapshot(snapshot)
  {

      /*
        userRecipes: [
            [ $key, { name: $name, author: $author, etc} ],
            [ $key2, { name: $name2, etc} ]
        ]
      */

      if (snapshot.val())
      {
          this.setState({
              userRecipes: snapshot.val()
          });
      }
      else
      {
          this.setState({
              userRecipes: { },
          });
      }
  }

  handleRecipeClick(key) {
    this.setState({
        selectedRecipe: key
    });
  }

  handleSlotClick(day, meal)
  {
      if (this.state.selectedRecipe)
      {
          const _recipeKey = this.state.selectedRecipe;
          const _recipeName = this.state.userRecipes[_recipeKey].name;
          const _recipeAuthorId = this.state.userRecipes[_recipeKey].authorid;

          const _recipe = {
              key: _recipeKey,
              name: _recipeName,
              authorid: _recipeAuthorId
          };

          // This should autoupdate the relevant slot
          this.userRef.child('calendar').child(day).child(meal).set(_recipe);
      }
  }

  render() {
    let _handleRecipeClick = this.handleRecipeClick;
    return (

        /*
        // Left div goes here
        <div>
            let _copy = this.handleRecipeClick;
            recipes.map(function(kvp) {
                    let [key, value] = kvp;
                    return <RecipeItem recipeKey={key} key={key} onClick={(event) => _copy(key)}
                }
            )
        </div>
        */

      <div>

        <div>
            {
                Object.entries(this.state.userRecipes).map(function(kvp) {
                    let [key, value] = kvp;
                    return <div>
                        <h2 onClick={(event) => _handleRecipeClick(key)}>{value.name}</h2>
                    </div>;
                })
            }
        </div>

        <div className = "sun">
          <RecipeSlot dateNumber={null} day={"sun"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"sun"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"sun"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
        </div>
        <div className = "mon">
          <RecipeSlot dateNumber={null} day={"mon"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"mon"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"mon"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
        </div>
        <div className = "tue">
          <RecipeSlot dateNumber={null} day={"tue"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"tue"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"tue"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
        </div>
        <div className = "wed">
          <RecipeSlot dateNumber={null} day={"wed"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"wed"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"wed"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
        </div>
        <div className = "thu">
          <RecipeSlot dateNumber={null} day={"thu"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"thu"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"thu"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
        </div>
        <div className = "fri">
          <RecipeSlot dateNumber={null} day={"fri"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"fri"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"fri"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
        </div>
        <div className = "sat">
          <RecipeSlot dateNumber={null} day={"sat"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"sat"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
          <RecipeSlot dateNumber={null} day={"sat"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
        </div>
      </div>
    );
  }

}
