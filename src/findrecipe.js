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

    let matches = [];

    for (uid in recipes)
    {
        const userRecipes = recipes[uid];
        for (key in userRecipes)
        {
            const uRecipe = userRecipes[key].name.toUpperCase();
            const uQuery = query.toUpperCase();

            if (uQuery.includes(" "))
            {
                // If the query has multiple words, check if recipe name includes query directly
                if (uRecipe.includes(uQuery))
                {
                    matches.push(userRecipes[key]);
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
                    matches.push(userRecipes[key]);
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

    return matches.slice(0, 10).map(recipe =>
        <div className="autocomplete-suggestion" onClick={(event) => {flowup(recipe)}}>
            {recipe.name} by {recipe.author}
        </div>
    );
}

class RecipeFinder extends React.Component
{
    constructor(props)
    {
        super(props);
        this.recipeRef = props.recipeRef;
        this.submit = props.submit;

        this.state = {
            query: "",
            recipes: {}
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.updateStateFromSnapshot = this.updateStateFromSnapshot.bind(this);
    }

    componentDidMount()
    {
        this.recipeRef.once('value').then(this.updateStateFromSnapshot);
        this.recipeRef.on('value', this.updateStateFromSnapshot);
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
        return <div id="autocomplete-container">
            <h1><br/><br/><br/></h1>
            <input id="autocomplete" value={this.state.query} placeholder="Find A Recipe" onChange={this.handleQueryChange}/>
            <Suggestions className="autocomplete-suggestions-container" query={this.state.query}  recipes={this.state.recipes} flowup={this.submit}/>
        </div>;
    }
}

function renderRecipeFinder(submit, recipeRef, container)
{
    ReactDOM.render(<RecipeFinder recipeRef={recipeRef} submit={submit}/>, container);
}
