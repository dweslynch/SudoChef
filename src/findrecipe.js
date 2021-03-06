function Suggestions(props)
{
    console.log(props.recipes);
    console.log("running");
    console.log(props.query);

    if (!props.query)
    {
        return null;
    }

    console.log("finding matches");

    const query = props.query;
    const recipes = props.recipes;
    const flowup = props.flowup;
    const userRef = props.userRef;

    let matches = [];

    for (uid in recipes)
    {
        const userRecipes = recipes[uid];

        for (const _key in userRecipes)
        {
            const uRecipe = userRecipes[_key].name.toUpperCase();
            const uQuery = query.toUpperCase();

            if (uQuery.includes(" "))
            {
                // If the query has multiple words, check if recipe name includes query directly
                if (uRecipe.includes(uQuery))
                {
                    matches.push({ key: _key, value: userRecipes[_key] });
                    /*
                    matches.push({
                        uid: uid,
                        key: key
                    });
                    */
                }
            }
            else
            {
                // Otherwise, does a word in the recipe start with the query?
                if (uRecipe.split(" ").some(x => x.startsWith(uQuery)))
                {
                    matches.push({ key: _key, value: userRecipes[_key] });
                    /*
                    matches.push({
                        uid: uid,
                        key: key
                    });
                    */
                }
            }
        }
    }

    console.log(matches);

    // Only deal with maximum 10 matches
    // Will eventually sort by recipe score
    /*
    return matches.slice(0, 10).map(identifier =>
        <div className="autocomplete-suggestion" onClick={(event) => flowup(identifier.uid, identifier.key)}>
            {recipes[identifier.uid][identifier.key].name} by {recipes[identifier.uid][identifier.key].author}
        </div>
    );
    */

    /*
    return matches.slice(0, 10).map(recipe =>
        <AutoCompleteSuggestion recipeKey={recipe.key} recipe={recipe.value} userRef={userRef} flowup={flowup}/>
    );
    */

    return matches.slice(0, 10).map(recipe =>
        <div className="autocomplete-suggestion" onClick={(event) => flowup(recipe.value.authorid, recipe.key)}>
            {recipe.value.name} by {recipe.value.author}
        </div>
    );
}

class RecipeFinder extends React.Component
{
    constructor(props)
    {
        super(props);
        this.recipeRef = props.recipeRef;
        this.userRef = props.userRef;
        this.submit = props.submit;

        this.state = {
            query: "",
            recipes: {},
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.updateStateFromSnapshot = this.updateStateFromSnapshot.bind(this);
    }

    componentDidMount()
    {
        this.recipeRef.once('value').then(this.updateStateFromSnapshot);
        this.recipeRef.on('value', this.updateStateFromSnapshot);
    }

    componentWillUnmount()
    {
        this.recipeRef.off('value', this.updateStateFromSnapshot);
    }

    handleQueryChange(event)
    {
        this.setState({query: event.target.value});
    }

    updateStateFromSnapshot(snapshot)
    {
        this.setState({ recipes: snapshot.val() });
    }

    render()
    {
        return <div>
            <h1><br/></h1>
            <div className="autocomplete-container">
                <h1>SudoChef<br/><br/></h1>
                <input className="autocomplete" value={this.state.query} placeholder="Find A Recipe..." onChange={this.handleQueryChange}/>
                <div className="autocomplete-suggestions-container">
                    <Suggestions className="autocomplete-suggestions-container" query={this.state.query} userRef={this.userRef} recipes={this.state.recipes} flowup={this.submit}/>
                </div>
            </div>
        </div>;
    }
}

function renderRecipeFinder(submit, recipeRef, userRef, container)
{
    ReactDOM.render(<RecipeFinder recipeRef={recipeRef} userRef={userRef} submit={submit}/>, container);
}
