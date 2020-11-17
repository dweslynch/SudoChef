class GroceryList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.userRef = props.userRef;
        this.recipeRef = props.recipeRef;
        this.container = props.container;

        this.state = {
            groceries: []
        }

        this.backtrack = this.backtrack.bind(this);
        this.updateStateFromSnapshot = this.updateStateFromSnapshot.bind(this);
        this.viewIndividualRecipe = this.viewIndividualRecipe.bind(this);
    }

    componentDidMount()
    {
        this.userRef.child('inventory').once('value').then(this.updateStateFromSnapshot);
        this.userRef.child('inventory').on('value', this.updateStateFromSnapshot);
    }

    backtrack(event)
    {
        renderList(this.userRef, this.recipeRef, this.container);
    }

    updateStateFromSnapshot(snapshot)
    {
        this.setState({
            groceries: Object.entries(snapshot.val())
        });
    }

    viewIndividualRecipe(user, key)
    {
        renderRecipeView(user, key, this.backtrack, "Return to My Recipes", this.container, true, this.userRef, this.recipeRef);
    }

    render()
    {
        console.log(this.state.groceries);
        if (this.state.groceries)
        {
            // Create a local reference to view individual recipe
            let _viewRecipe = this.viewIndividualRecipe;
            return this.state.groceries.map(function(kvp) {
                let [key, recipe] = kvp;
                return <div>
                    <h2 className="clickable" onClick={(event) => _viewRecipe(recipe.authorid, key)}>{recipe.name}&nbsp;&rsaquo;</h2>
                    <p style={{'margin-left': "15px"}}>{recipe.description}</p>
                </div>;
            });
        }
        else
        {
            return <h2>No Entries</h2>;
        }
    }
}

function renderList(userRef, recipeRef, container)
{
    console.log(container);
    ReactDOM.render(<GroceryList userRef={userRef} recipeRef={recipeRef} container={container}/>, container);
}
