function IngredientDisplay(props)
{
    let ingredient = props.ingredient;
    let name = props.name;

    if (ingredient.pantry)
    {
        if (ingredient.quantity > 0)
        {
            // Recipe partially covered by pantry
            return <span>
                <h2>{name}:&nbsp;&nbsp;{ingredient.quantity}&nbsp;{ingredient.units}</h2>
                <span style={{"color": "orange"}}>&#x025CA; You still need to purchase {(ingredient.units) ? `${ingredient.quantity} ${ingredient.units} of ${name}` : `${ingredient.quantity} ${name}`}</span>
            </span>;
        }
        else
        {
            // Recipe fully covered by pantry
            return <span>
                <h2 class="strikethrough">{name}:&nbsp;&nbsp;0&nbsp;{ingredient.units}</h2>
                <span style={{"color" : "green"}}>&#x02713; You have enough {name} in your pantry</span>
            </span>;
        }
    }
    else return <h2>{name}:&nbsp;&nbsp;{ingredient.quantity}&nbsp;{ingredient.units}</h2>;
}

class GroceryListDisplay extends React.Component {
    constructor(props)
    {
        super(props);

        this.recipeRef = props.recipeRef;
        this.userRef = props.userRef;
        this.recipeKeys = props.recipes;
        this.container = props.container;

        this.state = {
            recipes: [],
            ready: false,
            pantry: [],
            ready2: false
        }

        this.addSnapshotToRecipeList = this.addSnapshotToRecipeList.bind(this);
        this.getPantryFromSnapshot = this.getPantryFromSnapshot.bind(this);
        this.pushUpdatedPantry = this.pushUpdatedPantry.bind(this);
        this.generateMobileList = this.generateMobileList.bind(this);
        this.pushMobileIngredients = this.pushMobileIngredients.bind(this);
        this.ready = this.ready.bind(this);
        this.convertToOunces = this.convertToOunces.bind(this);
        this.reduceUnits = this.reduceUnits.bind(this);
        this.mergeOunces = this.mergeOunces.bind(this);
    }

    componentDidMount()
    {
        this.userRef.child('pantry').once('value').then(this.getPantryFromSnapshot);
        // Let's eventually refactor to make a list of authors and reduce the number of database calls

        let recipes = Object.entries(this.recipeKeys);
        for (let i = 0; i < recipes.length - 1; i++)
        {
            this.recipeRef.child(recipes[i][1].authorid).child(recipes[i][0]).once('value').then(this.addSnapshotToRecipeList);
        }

        // Only set 'ready' once last food item is fetched
        this.recipeRef.child(recipes[recipes.length - 1][1].authorid).child(recipes[recipes.length - 1][0]).once('value').then(this.addSnapshotToRecipeList).then(this.ready);
    }

    // Ready to render component
    ready()
    {
        console.log("ready");
        this.setState({ ready: true });
    }

    addSnapshotToRecipeList(snapshot)
    {
        this.setState(function(state) {
            state.recipes.push(snapshot.val());
            return state;
        });
    }

    getPantryFromSnapshot(snapshot)
    {
        // Treat userIngredients as kvps for efficiency
        if (snapshot.val()) {
            const entries = Object.entries(snapshot.val());
            let ingredients = { };

            for (const kvp of entries)
            {
                let [key, value] = kvp;
                // Gotta parse that float
                ingredients[value.name] = { quantity: parseFloat(value.quantity), units: value.units };
            }

            this.setState({
                pantry: ingredients,
                ready2: true
            });
        }
        else
        {
            this.setState({
                pantry: [],
                ready2: true
            });
        }
    }

    pushUpdatedPantry(pantry)
    {
        // Clone pantry and remove undefined units
        let _pantry = [];

        for (key in pantry)
        {
            if (pantry[key].quantity > 0)
            {
                if (pantry[key].units)
                {
                    const item = {
                        name: key,
                        quantity: pantry[key].quantity,
                        units: pantry[key].units
                    };
                    _pantry.push(item);
                }
                else
                {
                    const item = {
                        name: key,
                        quantity: pantry[key].quantity
                    };
                    _pantry.push(item);
                }
            }
        }

        this.userRef.child('pantry').set(_pantry);
    }

    pushMobileIngredients(ingredients)
    {
        let mobileRef = this.recipeRef.parent.child('mobile');

        let _ingredients = [];
        for (const kvp of ingredients)
        {
            let [key, value] = kvp;
            if (value.quantity > 0)
            {
                if (value.units)
                {
                    const item = {
                        name: key,
                        quantity: value.quantity,
                        units: value.units
                    };
                    _ingredients.push(item);
                }
                else
                {
                    const item = {
                        name: key,
                        quantity: value.quantity
                    };
                    _ingredients.push(item);
                }
            }
        }

        let mobileKey = mobileRef.push().key;

        mobileRef.child(mobileKey).set(_ingredients);

        return mobileKey;
    }

    generateMobileList(pantry, ingredients)
    {
        this.pushUpdatedPantry(pantry);
        const key = this.pushMobileIngredients(ingredients);

        // x

        renderMobileCode(key, this.container);
    }

    mergeOunces(amount1, amount2)
    {
        if (amount1.units == "oz" && amount2.units == "oz")
        {
            return { quantity: amount1.quantity + amount2.quantity, units: "oz" };
        }
        else
        {
            amount1 = this.convertToOunces(amount1);
            amount2 = this.convertToOunces(amount2);
            return { quantity: amount1.quantity + amount2.quantity, units: "oz" };
        }
    }

    reduceUnits(amount)
    {
        let _amount = {...amount};

        // Should prob always be the case
        if (_amount.units == "oz")
        {
            if (_amount.quantity > 33)
            {
                return { quantity: Math.ceil(_amount.quantity / 33.814), units: "L" };
            }
            else if (_amount.quantity >= 8)
            {
                return { quantity: Math.ceil(_amount.quantity / 8.0), units: "cups" };
            }
            else return _amount;
        }
        else return _amount;
    }

    convertToOunces(amount)
    {
        let quantity = amount.quantity;
        let units = amount.units;

        if (units == "oz")
        {
            return { quantity: quantity, units: units };
        }
        else if (units == "mL")
        {
            return { quantity: quantity * 0.033814, units: "oz" };
        }
        else if (units == "tsp")
        {
            return { quantity: quantity / 6.0, units: "oz" };
        }
        else if (units == "Tbsp")
        {
            return { quantity: quantity / 2.0, units: "oz" };
        }
        else if (units == "cups")
        {
            return { quantity: quantity * 8.0, units: "oz" };
        }
        else if (units == "L")
        {
            return { quantity: quantity * 33.814, units: "oz" };
        }
    }

    combineIngredients(pantry)
    {
        let ingredients = {};

        for (const recipe of this.state.recipes)
        {
            console.log(recipe);
            for (const kvp of Object.entries(recipe.ingredients))
            {
                console.log(kvp);
                let [key, value] = kvp;
                // Is the ingredient already in our list?
                if (ingredients[value.name])
                {
                    // Are they the same units?
                    if (ingredients[value.name].units == value.units)
                    {
                        ingredients[value.name].quantity += parseFloat(value.quantity);
                    }
                    else
                    {
                        //TODO:  Need to handle case where exactly one ingredient is unitless
                        let amount1 = this.convertToOunces(ingredients[value.name]);
                        let amount2 = this.convertToOunces({ quantity: parseFloat(value.quantity), units: value.units });

                        ingredients[value.name] = this.mergeOunces(amount1, amount2);
                    }
                }
                else
                {
                    ingredients[value.name] = { quantity: parseFloat(value.quantity), units: value.units };
                }

                // Check pantry.  Might need to make this faster later
                if (pantry[value.name])
                {
                    console.log("in pantry");
                    let pantryIngredients = {...pantry[value.name]};
                    let recipeIngredients = {...ingredients[value.name]};

                    if (pantryIngredients.units != recipeIngredients.units)
                    {
                        console.log("different units");
                        // Normalize units
                        // Won't work when exactly one unit is blank, but should work when both are
                        pantryIngredients = this.convertToOunces(pantryIngredients);
                        recipeIngredients = this.convertToOunces(recipeIngredients);
                    }

                    if (pantryIngredients.quantity >= recipeIngredients.quantity)
                    {
                        console.log("pantry covers recipe");
                        // User has enough to cover their recipes
                        const remaining = pantryIngredients.quantity - recipeIngredients.quantity;

                        recipeIngredients.quantity = 0;
                        recipeIngredients.pantry = true;
                        ingredients[value.name] = recipeIngredients;

                        pantryIngredients.quantity = remaining;
                        pantry[value.name] = this.reduceUnits(pantryIngredients);
                    }
                    else
                    {
                        console.log("pantry does not cover recipe");
                        // Some pantry ingredients, but not enough to cover the recipe
                        const remaining = recipeIngredients.quantity - pantryIngredients.quantity;

                        pantryIngredients.quantity = 0;
                        pantry[value.name] = pantryIngredients;
                        recipeIngredients.pantry = true;

                        console.log(recipeIngredients.name);
                        console.log(recipeIngredients.quantity);
                        console.log(recipeIngredients.units);

                        console.log(remaining);
                        recipeIngredients.quantity = remaining;
                        ingredients[value.name] = this.reduceUnits(recipeIngredients);

                        console.log(recipeIngredients.name);
                        console.log(recipeIngredients.quantity);
                        console.log(recipeIngredients.units);
                    }
                }
                else
                {
                    ingredients[value.name].pantry = false;
                }

                ingredients[value.name] = this.reduceUnits(ingredients[value.name]);
            }
        }
        return ingredients;
    }

    render()
    {
        if (this.state.ready && this.state.ready2)
        {
            let _pantry = {...this.state.pantry};
            const ingredients = Object.entries(this.combineIngredients(_pantry));

            return <div>
                {
                    ingredients.map(kvp =>
                        <IngredientDisplay name={kvp[0]} ingredient={kvp[1]}/>
                    )
                }
                <input type="button" className="dark-button fullest" value="Ready to Purchase" onClick={(event) => this.generateMobileList(_pantry, ingredients)}/>
            </div>;
        }
        else return null;
    }
}

function renderGroceryListDisplay(userRef, recipeRef, keys, container)
{
    ReactDOM.render(<GroceryListDisplay userRef={userRef} recipeRef={recipeRef} container={container} recipes={keys}/>, container);
}
