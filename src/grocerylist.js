function RestrictionMatchIndicator(props)
{
    if (props.restrictions.length > 0)
    {
        let tagTrue = false;

        for (const kvp of Object.entries(props.tags))
        {
            if (kvp[1])
            {
                tagTrue = true;
            }
        }

        let violates = false;
        for (const _kvp of props.restrictions)
        {
            console.log(`restriction ${_kvp[0]}: ${_kvp[1]} and tag: ${props.tags[_kvp[0]]}`);
            //if (kvp[1] == "true" && this.tags[kvp[0]] == "false")
            if (_kvp[1] && !props.tags[_kvp[0]])
            {
                violates = true;
            }
        }
        if (tagTrue && violates)
        {
            return <span style={{"color": "red"}}>&#x02717; This recipe may not meet your dietary restrictions</span>;
        }
        else if (tagTrue && !violates)
        {
            return <span style={{"color" : "green"}}>&#x02713; This recipe meets all your dietary restrictions</span>;
        }
        else
        {
            return <span style={{"color": "orange"}}>&#x0229B; This recipe does not include dietary restriction information</span>;
        }
    }
    else return null;
}

/*
class RestrictionMatchIndicator extends React.Component {
    constructor(props)
    {
        super(props);

        this.restrictions = props.restrictions;
        this.tags = props.tags;

        this.matchesRestrictions = this.matchesRestrictions.bind(this);
        this.matchesSomeRestrictions = this.matchesSomeRestrictions.bind(this);
        this.doesNotHaveRestrictions = this.doesNotHaveRestrictions.bind(this);
    }

    // Returns true if restrictions are met, returns false if not or if there are none
    matchesRestrictions()
    {
        if (this.restrictions.length > 0)
        {
            for (const kvp of this.restrictions)
            {
                console.log(`restriction ${kvp[0]}: ${kvp[1]} and tag: ${this.tags[kvp[0]]}`);
                //if (kvp[1] == "true" && this.tags[kvp[0]] == "false")
                if (kvp[1] && !this.tags[kvp[0]])
                {
                    return false;
                }
            }
            return true;
        }
        else return false;
    }

    // Returns true if the user has restrictions, the recipe has tags, but not all restrictions are met
    matchesSomeRestrictions()
    {
        if (this.restrictions.length > 0)
        {
            let hasTags = false;
            const _tags = Object.entries(this.tags);
            for (const kvp of _tags)
            {
                if (kvp[1])
                    hasTags = true;
            }

            if (!hasTags)
                return false;

            for (const kvp of this.restrictions)
            {
                if (kvp[1] && !this.tags[kvp[0]])
                    return true;
            }
            return false;
        }
        else return false
    }

    // Returns true if the user has dietary restrictions and there are no tags on the recipe
    doesNotHaveRestrictions()
    {
        if (this.restrictions.length > 0)
        {
            const _tags = Object.entries(this.tags);
            for (const kvp of _tags)
            {
                if (kvp[1])
                    return false;
            }
            return true;
        }
        else return false;
    }

    render()
    {
        if (this.restrictions.length > 0)
        {
            if (this.matchesRestrictions())
            {
                return <span style={{"color" : "green"}}>&#x02713; This recipe meets all your dietary restrictions</span>;
            }
            else if (this.matchesSomeRestrictions())
            {
                return <span style={{"color": "red"}}>&#x02717; This recipe may not meet your dietary restrictions</span>;
            }
            else if (this.doesNotHaveRestrictions())
            {
                return <span style={{"color": "orange"}}>&#x025CA; This recipe does not include dietary restriction information</span>;
            }
        }
        else
        {
            return null;
        }
    }
}
*/

class GroceryList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.userRef = props.userRef;
        this.recipeRef = props.recipeRef;
        this.container = props.container;

        this.state = {
            groceries: [],
            restrictions: [],
            ready: false
        }

        this.backtrack = this.backtrack.bind(this);
        this.updateGroceriesFromSnapshot = this.updateGroceriesFromSnapshot.bind(this);
        this.updateRestrictionsFromSnapshot = this.updateRestrictionsFromSnapshot.bind(this);
        this.viewIndividualRecipe = this.viewIndividualRecipe.bind(this);
        this.userHasDietaryRestrictions = this.userHasDietaryRestrictions.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.renderDisplayFromSnapshot = this.renderDisplayFromSnapshot.bind(this);
        this.handleRemoveRecipeClick = this.handleRemoveRecipeClick.bind(this);
        this.ready = this.ready.bind(this);
    }

    componentDidMount()
    {
        this.userRef.child('inventory').once('value').then(this.updateGroceriesFromSnapshot);
        this.userRef.child('restrictions').once('value').then(this.updateRestrictionsFromSnapshot);

        this.userRef.child('inventory').on('value', this.updateGroceriesFromSnapshot);
        this.userRef.child('restrictions').on('value', this.updateRestrictionsFromSnapshot);
    }

    componentWillUnmount()
    {
        this.userRef.child('inventory').off('value', this.updateGroceriesFromSnapshot);
        this.userRef.child('restrictions').off('value', this.updateRestrictionsFromSnapshot);
    }

    ready()
    {
        this.setState({
            ready: true
        });
    }

    renderDisplayFromSnapshot(snapshot)
    {
        let lst = [];
        if (snapshot.val())
        {
            const _snapshot = snapshot.val();

            for (const key of _snapshot)
            {
                lst.push([key, _snapshot[key]]);
            }
        }

        renderGroceryListDisplay(this.userRef, this.recipeRef, lst, this.container);
    }

    renderDisplay()
    {
        this.userRef.child('inventory').once('value').then(this.renderDisplayFromSnapshot);
    }

    userHasDietaryRestrictions()
    {
        console.log(this.state.restrictions);
        return this.state.restrictions.length > 0;
    }

    backtrack(event)
    {
        renderList(this.userRef, this.recipeRef, this.container);
    }

    handleRemoveRecipeClick(key)
    {
        this.userRef.child('inventory').child(key).remove();
    }

    updateRestrictionsFromSnapshot(snapshot)
    {
        if (snapshot.val())
        {
            this.setState({
                restrictions: Object.entries(snapshot.val())
            });
        }
    }

    updateGroceriesFromSnapshot(snapshot)
    {
        if (snapshot.val())
        {
            this.setState({
                groceries: Object.entries(snapshot.val())
            });
        }
        else
        {
            this.setState({
                groceries: []
            });
        }

        this.ready();
    }

    viewIndividualRecipe(user, key)
    {
        renderRecipeView(user, key, this.backtrack, "Return to My Recipes", this.container, true, this.userRef, this.recipeRef);
    }

    render()
    {
        if (this.state.ready)
        {
            console.log(this.state.groceries);

            // Create local copy so can call from within the map callback
            let _hasRestrictions = this.userHasDietaryRestrictions;
            const restrictions = this.state.restrictions;
            let _renderDisplay = this.renderDisplay;
            let _removeRecipe = this.handleRemoveRecipeClick;
            if (this.state.groceries)
            {
                // Create a local reference to view individual recipe
                let _viewRecipe = this.viewIndividualRecipe;
                return <div>
                    <h2>My Recipes</h2>
                    {
                        this.state.groceries.map(function(kvp) {
                            let [key, recipe] = kvp;
                            return <div>
                                <input style={{"backgroundColor": "rgba(0,0,0,0)", border: "none"}} className="clickable circle-button" type="button" value="X" onClick={(event) => _removeRecipe(key)}/>
                                <h2 className="clickable" style={{"display": "inline-block"}} onClick={(event) => _viewRecipe(recipe.authorid, key)}>&nbsp;&nbsp;{recipe.name}&nbsp;&rsaquo;</h2>
                                <p style={{'marginLeft': "15px"}}>{recipe.description}</p>
                                {(recipe.calories) ? <p style={{'marginLeft': '15px'}}>We estimate this recipe to yield {recipe.servings} servings at {recipe.calories} calories per serving</p> : null}
                                {(_hasRestrictions()) ? <span style={{'marginLeft': '15px'}}><RestrictionMatchIndicator restrictions={restrictions} tags={recipe.tags}/></span> : null}
                            </div>;
                        })
                    }
                    <br/>
                    <input type="button" className="dark-button fullest" value="Preview Grocery List" onClick={(event) => _renderDisplay()} />
                </div>;
            }
            else
            {
                return <h2>No Entries</h2>;
            }
        }
        else
        {
            return <div>
                <h2>My Recipes</h2>
                <span style={{'textAlign': 'center'}}>
                    <h1>
                        <br/><i className="fas fa-spinner spin"></i><br/>
                    </h1>
                </span>
            </div>;
        }
    }
}

function renderList(userRef, recipeRef, container)
{
    console.log(container);
    ReactDOM.render(<GroceryList userRef={userRef} recipeRef={recipeRef} container={container}/>, container);
}
