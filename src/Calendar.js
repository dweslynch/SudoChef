class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.userRef = props.userRef;
    this.flowup = props.flowup;

    this.state = {
      userRecipes: { },
      selectedRecipe: "",
      days: { },
      confirm: false
    };

    this.handleRecipeClick = this.handleRecipeClick.bind(this);
    this.updateUserRecipesFromSnapshot = this.updateUserRecipesFromSnapshot.bind(this);
    this.handleSlotClick = this.handleSlotClick.bind(this);
    this.clearDay = this.clearDay.bind(this);
    this.generateWeeklyListFromSnapshot = this.generateWeeklyListFromSnapshot.bind(this);
    this.compileWeeklyList = this.compileWeeklyList.bind(this);
    this.clearEntireCalendar = this.clearEntireCalendar.bind(this);
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

  generateWeeklyListFromSnapshot(snapshot)
  {
      let weeklyList = [];

      if (snapshot.val())
      {
          const calendar = snapshot.val();

          for (const day in calendar)
          {
              const _day = calendar[day];

              for (const meal in _day)
              {
                  const _meal = _day[meal];

                  const obj = { name: _meal.name, authorid: _meal.authorid };

                  weeklyList.push([_meal.key, obj]);
              }
          }
      }

      this.flowup(weeklyList);
  }

  compileWeeklyList()
  {
      this.userRef.child('calendar').once('value').then(this.generateWeeklyListFromSnapshot);
  }

  handleRecipeClick(key) {
      if (this.state.selectedRecipe == key)
      {
          this.setState({
              selectedRecipe: ""
          });
      }
      else
      {
          this.setState({
              selectedRecipe: key
          });
      }
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

  clearDay(day)
  {
      this.userRef.child('calendar').child(day).remove();
  }

  clearEntireCalendar()
  {
      if (this.state.confirm)
      {
          this.userRef.child('calendar').remove();

          this.setState({
              confirm: false
          });
      }
      else
      {
          this.setState({
              confirm: true
          });
      }
  }

  render() {
    let _handleRecipeClick = this.handleRecipeClick;
    let _selectedRecipe = this.state.selectedRecipe;
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
        <div className="left-calendar-float">
            <div className="card" style={{'marginRight': '25px'}}>
                <h2>My Recipes</h2>
                <p>Click a recipe then a calendar slot to assign a meal</p><br/>
                <div style={{'marginLeft': '0px'}}>
                    {
                        Object.entries(this.state.userRecipes).map(function(kvp) {
                            let [key, value] = kvp;
                            return <div>
                                <input type="button" value={value.name} className={(_selectedRecipe == key) ? "dark-button fullest" : "light-button fullest"} onClick={(event) => _handleRecipeClick(key)} />
                                <br/><br/>
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>

        <div className="right-calendar-float">
            <div className="" style={{'marginLeft': '25px'}}>

                <input type="button" className="dark-button fullest" onClick={(event) => this.compileWeeklyList()} value="Preview Weekly List" />
                <br/><br/>
                <input type="button" className="dark-button fullest" onClick={(event) => this.clearEntireCalendar()} value={(this.state.confirm) ? "Are you sure?" : "Clear Entire Calendar"} />
                <br/><br/>
                <div className = "sun">
                    <div className="card">
                        <table style={{'width': '100%'}}>
                            <tr>
                                <td style={{'textAlign': 'left'}}><h2>Sunday</h2></td>
                                <td style={{'textAlign': 'right'}}><input className="clickable circle-button" type="button" value="X" onClick={(event) => this.clearDay('sun')}/></td>
                            </tr>
                        </table>
                      <RecipeSlot dateNumber={null} day={"sun"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"sun"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"sun"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                    </div>
                </div>
                <br/>
                <div className = "mon">
                    <div className="card">
                        <table style={{'width': '100%'}}>
                            <tr>
                                <td style={{'textAlign': 'left'}}><h2>Monday</h2></td>
                                <td style={{'textAlign': 'right'}}><input className="clickable circle-button" type="button" value="X" onClick={(event) => this.clearDay('mon')}/></td>
                            </tr>
                        </table>
                      <RecipeSlot dateNumber={null} day={"mon"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"mon"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"mon"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                    </div>
                </div>
                <br/>
                <div className = "tue">
                    <div className="card">
                        <table style={{'width': '100%'}}>
                            <tr>
                                <td style={{'textAlign': 'left'}}><h2>Tuesday</h2></td>
                                <td style={{'textAlign': 'right'}}><input className="clickable circle-button" type="button" value="X" onClick={(event) => this.clearDay('tue')}/></td>
                            </tr>
                        </table>
                      <RecipeSlot dateNumber={null} day={"tue"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"tue"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"tue"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                    </div>
                </div>
                <br/>
                <div className = "wed">
                    <div className="card">
                        <table style={{'width': '100%'}}>
                            <tr>
                                <td style={{'textAlign': 'left'}}><h2>Wednesday</h2></td>
                                <td style={{'textAlign': 'right'}}><input className="clickable circle-button" type="button" value="X" onClick={(event) => this.clearDay('wed')}/></td>
                            </tr>
                        </table>
                      <RecipeSlot dateNumber={null} day={"wed"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"wed"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"wed"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                    </div>
                </div>
                <br/>
                <div className = "thu">
                    <div className="card">
                        <table style={{'width': '100%'}}>
                            <tr>
                                <td style={{'textAlign': 'left'}}><h2>Thursday</h2></td>
                                <td style={{'textAlign': 'right'}}><input className="clickable circle-button" type="button" value="X" onClick={(event) => this.clearDay('thu')}/></td>
                            </tr>
                        </table>
                      <RecipeSlot dateNumber={null} day={"thu"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"thu"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"thu"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                  </div>
                </div>
                <br/>
                <div className = "fri">
                    <div className="card">
                        <table style={{'width': '100%'}}>
                            <tr>
                                <td style={{'textAlign': 'left'}}><h2>Friday</h2></td>
                                <td style={{'textAlign': 'right'}}><input className="clickable circle-button" type="button" value="X" onClick={(event) => this.clearDay('fri')}/></td>
                            </tr>
                        </table>
                      <RecipeSlot dateNumber={null} day={"fri"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"fri"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"fri"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                  </div>
                </div>
                <br/>
                <div className = "sat">
                    <div className="card">
                        <table style={{'width': '100%'}}>
                            <tr>
                                <td style={{'textAlign': 'left'}}><h2>Saturday</h2></td>
                                <td style={{'textAlign': 'right'}}><input className="clickable circle-button" type="button" value="X" onClick={(event) => this.clearDay('sat')}/></td>
                            </tr>
                        </table>
                      <RecipeSlot dateNumber={null} day={"sat"} meal={"b"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"sat"} meal={"l"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                      <RecipeSlot dateNumber={null} day={"sat"} meal={"d"} userRef={this.userRef} slotClick={this.handleSlotClick}/>
                  </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

}

function renderCalendar(userRef, flowup, container)
{
    ReactDOM.render(<Calendar userRef={userRef} flowup={flowup}/>, container);
}
