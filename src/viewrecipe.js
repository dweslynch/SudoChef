class RecipeView extends React.Component
{
    constructor(props)
    {
        super(props);

        this.backtrack = props.backtrack;
        this.returnPrompt = props.prompt;
        this.mine = props.mine;
        this.userRef = props.userRef;
        this.recipeRef = props.recipeRef;
        this.key = props.recipeKey;
        this.uid = props.user;

        this.state = {
            recipe: {}
        }

        this.addToInventory = this.addToInventory.bind(this);
        this.updateStateFromSnapshot = this.updateStateFromSnapshot.bind(this);
    }

    componentDidMount()
    {
        this.recipeRef.child(this.uid).child(this.key).once('value').then(this.updateStateFromSnapshot);
    }

    addToInventory(event)
    {
        const recipe = this.state.recipe;
        this.userRef.child('inventory').child(this.key).set({ name: recipe.name, author: recipe.author, authorid: recipe.authorid, description: recipe.description, tags: recipe.tags });
        this.backtrack(event);
    }

    updateStateFromSnapshot(snapshot)
    {
        console.log(this.key);
        console.log(snapshot.val());
        this.setState({
            recipe: snapshot.val()
        });
    }

    render()
    {
        if (this.state.recipe && this.state.recipe.ingredients)
        {
            const ingredients = Object.entries(this.state.recipe.ingredients);
            return <div>
              <h2>{this.state.recipe.name} by {this.state.recipe.author}</h2>
              <ul>
                {
                  ingredients.map(function(kvp)
                  {
                    let [key, ingredient] = kvp;
                    return <li>{ingredient.name}:&nbsp;&nbsp;{ingredient.quantity}&nbsp;{ingredient.units}</li>;
                  })
                }
              </ul>
              <h2>Description:</h2>
              <p>{this.state.recipe.description}</p>
              <h2>Instructions:</h2>
              <p>{this.state.recipe.instructions}</p>
              {(!this.mine) ? <input type="button" className="fullest dark-button" value="Add To My Recipes" onClick={this.addToInventory}/> : null}
              <h2 className="clickable" onClick={this.backtrack}>{this.returnPrompt}&nbsp;&rsaquo;</h2>
            </div>;
        }
        else
        {
            return null;
        }
    }

}

function renderRecipeView(user, key, backtrack, returnPrompt, container, mine, userRef, recipeRef)
{
  console.log(container);
  ReactDOM.render(<RecipeView user={user} recipeKey={key} key={key} prompt={returnPrompt} mine={mine} backtrack={backtrack} userRef={userRef} recipeRef={recipeRef}/>, container);
}
