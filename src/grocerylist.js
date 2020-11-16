class GroceryList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.userRef = props.userRef;
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
        this.userRef.once('value').then(this.updateStateFromSnapshot);
        this.userRef.on('value', this.updateStateFromSnapshot);
    }

    backtrack(event)
    {
        renderList(this.userRef, this.container);
    }

    updateStateFromSnapshot(snapshot)
    {
        this.setState({
            groceries: Object.entries(snapshot.val())
        });
    }

    viewIndividualRecipe(recipe)
    {
        renderRecipeView(recipe, this.backtrack, "Return to My Recipes", this.container);
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
                let ingredients = Object.entries(recipe.ingredients);
                return <div>
                    <h2 className="clickable" onClick={(event) => _viewRecipe(recipe)}>{recipe.name}&nbsp;&rsaquo;</h2>
                    <ul>
                        {
                            ingredients.map(function(_kvp) {
                                let [_key, ingredient] = _kvp;
                                return <li>{ingredient.name}:&nbsp;&nbsp;{ingredient.quantity}&nbsp;{ingredient.units}</li>;
                            })
                        }
                    </ul>
                </div>;
            });
        }
        else
        {
            return <h2>No Entries</h2>;
        }
    }
}

function renderList(userRef, container)
{
    console.log(container);
    ReactDOM.render(<GroceryList userRef={userRef} container={container}/>, container);
}
