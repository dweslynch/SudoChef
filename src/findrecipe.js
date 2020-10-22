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

    for (key in recipes)
    {
        console.log(key);
        const uRecipe = recipes[key].name.toUpperCase();
        const uQuery = query.toUpperCase();

        if (uQuery.includes(" "))
        {
            // If the query has multiple words, check if recipe name includes query directly
            if (uRecipe.includes(uQuery))
            {
                matches.push(key);
            }
        }
        else
        {
            // Otherwise, does a word in the recipe start with the query?
            if (uRecipe.split(" ").some(x => x.startsWith(uQuery)))
            {
                matches.push(key);
            }
        }
    }

    console.log(matches);

    // Only deal with maximum 10 matches
    // Will eventually sort by recipe score
    return matches.slice(0, 10).map(key =>
        <div className="autocomplete-suggestion" onClick={(event) => flowup(key)}>
            {recipes[key].name} by {recipes[key].author}
        </div>
    );
}

class RecipeFinder extends React.Component
{
    constructor(props)
    {
        super(props);
        this.recipes = props.recipes;
        this.submit = props.submit;

        this.state = { query: "" };

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    handleQueryChange(event)
    {
        this.setState({query: event.target.value});
    }

    render()
    {
        return <div id="autocomplete-container">
            <h1><br/><br/><br/></h1>
            <input id="autocomplete" value={this.state.query} placeholder="Find A Recipe" onChange={this.handleQueryChange}/>
            <Suggestions className="autocomplete-suggestions-container" query={this.state.query}  recipes={this.recipes} flowup={this.submit}/>
        </div>;
    }
}

function renderRecipeFinder(submit, recipes, container)
{
    ReactDOM.render(<RecipeFinder recipes={recipes} submit={submit}/>, container);
}
