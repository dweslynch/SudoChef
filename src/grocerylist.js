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
            restrictions: []
        }

        this.backtrack = this.backtrack.bind(this);
        this.updateGroceriesFromSnapshot = this.updateGroceriesFromSnapshot.bind(this);
        this.updateRestrictionsFromSnapshot = this.updateRestrictionsFromSnapshot.bind(this);
        this.viewIndividualRecipe = this.viewIndividualRecipe.bind(this);
        this.userHasDietaryRestrictions = this.userHasDietaryRestrictions.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.renderDisplayFromSnapshot = this.renderDisplayFromSnapshot.bind(this);
    }

    componentDidMount()
    {
        this.userRef.child('inventory').once('value').then(this.updateGroceriesFromSnapshot);
        this.userRef.child('restrictions').once('value').then(this.updateRestrictionsFromSnapshot);

        // Don't need because this should stay constant for now until profile is finished
        //this.userRef.child('inventory').on('value', this.updateGroceriesFromSnapshot);
    }

    renderDisplayFromSnapshot(snapshot)
    {
        renderGroceryListDisplay(this.recipeRef, snapshot.val(), this.container);
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

    updateRestrictionsFromSnapshot(snapshot)
    {
        if (snapshot.val())
        {
            console.log("detected restrictions");
            console.log(snapshot.val());
            this.setState({
                restrictions: Object.entries(snapshot.val())
            });
        }
    }

    updateGroceriesFromSnapshot(snapshot)
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

        // Create local copy so can call from within the map callback
        let _hasRestrictions = this.userHasDietaryRestrictions;
        const restrictions = this.state.restrictions;
        let _renderDisplay = this.renderDisplay;
        if (this.state.groceries)
        {
            // Create a local reference to view individual recipe
            let _viewRecipe = this.viewIndividualRecipe;
            return <div>
                {
                    this.state.groceries.map(function(kvp) {
                        let [key, recipe] = kvp;
                        return <div>
                            <h2 className="clickable" onClick={(event) => _viewRecipe(recipe.authorid, key)}>{recipe.name}&nbsp;&rsaquo;</h2>
                            <p style={{'marginLeft': "15px"}}>{recipe.description}</p>
                            {(_hasRestrictions()) ? <RestrictionMatchIndicator restrictions={restrictions} tags={recipe.tags}/> : null}
                        </div>;
                    })
                }
                <h2 className="clickable" onClick={(event) => _renderDisplay()}>Generate Grocery List</h2>
            </div>;
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
