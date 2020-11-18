function IngredientDisplay(props)
{
    let ingredient = props.ingredient;
    let name = props.name;

    return <h2>{name}:&nbsp;&nbsp;{ingredient.quantity}&nbsp;{ingredient.units}</h2>;
}

class GroceryListDisplay extends React.Component {
    constructor(props)
    {
        super(props);

        this.recipeRef = props.recipeRef;
        this.recipeKeys = props.recipes;

        this.state = {
            recipes: [],
            ready: false
        }

        this.addSnapshotToRecipeList = this.addSnapshotToRecipeList.bind(this);
        this.ready = this.ready.bind(this);
        this.convertToOunces = this.convertToOunces.bind(this);
        this.reduceUnits = this.reduceUnits.bind(this);
        this.mergeOunces = this.mergeOunces.bind(this);
    }

    componentDidMount()
    {
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
        // Should prob always be the case
        if (amount.units == "oz")
        {
            if (amount.quantity > 33)
            {
                return { quantity: Math.ceil(amount.quantity / 33.814), units: "L" };
            }
            else if (amount.quantity >= 8)
            {
                return { quantity: Math.ceil(amount.quantity / 8.0), units: "cups" };
            }
            else return amount;
        }
        else return amount;
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

    combineIngredients()
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

                ingredients[value.name] = this.reduceUnits(ingredients[value.name]);
            }
        }
        return ingredients;
    }

    render()
    {
        if (this.state.ready)
        {
            const ingredients = Object.entries(this.combineIngredients());
            console.log(ingredients);
            return <div>
                {
                    ingredients.map(kvp =>
                        <IngredientDisplay name={kvp[0]} ingredient={kvp[1]}/>
                    )
                }
            </div>;
        }
        else return null;
    }
}

function renderGroceryListDisplay(recipeRef, keys, container)
{
    ReactDOM.render(<GroceryListDisplay recipeRef={recipeRef} recipes={keys}/>, container);
}
