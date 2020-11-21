class Pantry extends React.Component {
    constructor(props)
    {
        super(props);

        this.userRef = props.userRef;

        this.state = {
            ingredients: 0,
            ingredientList: []
        };

        this.updateIngredientListFromSnapshot = this.updateIngredientListFromSnapshot.bind(this);
        this.handleIngredientICommit = this.handleIngredientICommit.bind(this);
        this.handleIngredientQuantityCommit = this.handleIngredientQuantityCommit.bind(this);
        this.handleIngredientIChange = this.handleIngredientIChange.bind(this);
        this.handleIngredientQuantityChange = this.handleIngredientQuantityChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleRemoveIngredientButtonClick = this.handleRemoveIngredientButtonClick.bind(this);
        this.handleAddIngredientButtonClick = this.handleAddIngredientButtonClick.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
    }

    componentDidMount()
    {
        this.userRef.child('pantry').once('value').then(this.updateIngredientListFromSnapshot);
        this.userRef.child('pantry').on('value', this.updateIngredientListFromSnapshot);
    }

    updateIngredientListFromSnapshot(snapshot)
    {
        if (snapshot.val())
        {
            console.log("snapshot present");
            let entries = Object.entries(snapshot.val());
            let ingredients = entries.map(function(kvp) {
                let [key, value] = kvp;
                return {
                    name: value.name,
                    quantity: value.quantity,
                    units: (value.units) ? value.units : ""
                };
            });

            this.setState({
                ingredients: ingredients.length,
                ingredientList: ingredients
            });
        }
        else
        {
            // User has no ingredients in their pantry
            console.log("no snapshot present");
            this.setState({
                ingredients: 0,
                ingredientList: []
            });
        }
    }

    handleIngredientICommit(i, name)
    {
        // Wonder if this works
        // Here's the catch:
        // I don't know the answer and neither do you
        // I'm pretty sure no one knows
        // We'll probably never figure it out
        // And we just have to live with that
        this.userRef.child('pantry').child(i).child('name').set(name);
    }

    handleIngredientQuantityCommit(i, quantity)
    {
        this.userRef.child('pantry').child(i).child('quantity').set(quantity);
    }

    handleIngredientIChange(i, name)
    {
        this.setState(function(state) {
            state.ingredientList[i].name = name;
            return state;
        });
    }

    handleIngredientQuantityChange(i, quantity)
    {
        this.setState(function(state) {
            state.ingredientList[i].quantity = quantity;
            return state;
        });
    }

    handleUnitChange(i, unit)
    {
        this.userRef.child('pantry').child(i).child('units').set(unit);
    }

    removeIngredient(i, snapshot)
    {
        if (snapshot.exists())
        {
            // Directly remove the ingredient from the database
            // Should automatically remove it from our end too
            this.userRef.child('pantry').child(i).remove();
        }
        else
        {
            // The ingredient only exists on our end so remove it from the local component only
            this.setState(function(state) {
                state.ingredients = state.ingredients - 1;
                state.ingredientList.splice(i, 1); // Remove one element at index i
                return state;
            });
        }
    }

    handleRemoveIngredientButtonClick(i)
    {
        // There's GOTTA be a better way to do this
        this.userRef.child('pantry').child(i).once('value').then(snapshot => this.removeIngredient(i, snapshot));
    }

    handleAddIngredientButtonClick(event)
    {
        this.setState(function(state) {
            console.log("adding ingredients");
            const xingredients = state.ingredients;
            state.ingredients = xingredients + 1;
            state.ingredientList[xingredients] = {
                name: '',
                quantity: '',
                units: ''
            };
            return state;
        });
    }

    render()
    {
        // let arr = [0..this.state.ingredients]
        let arr = [];
        for (let i = 0; i < this.state.ingredients; i++)
        {
            console.log("pushing ingredient");
            arr.push(i);
        }

        return <div>
            <h2>My Pantry</h2>
            {
                // Updates in the ingredient name or quantity are subscribed to the onBlur event
                // This is to avoid making a call to the database every time the user types a key
                // To ensure that the last ingredient is updated, the user needs to unfocus from the textbox
                // I'm sure there's a workaround but for now let's just prompt them directly as I've done below
            }
            <p>Click anywhere on the screen to save</p>
            {
                arr.map(i =>
                    <div>
                        <input type="text" value={(this.state.ingredientList[i]) ? this.state.ingredientList[i].name : ""} placeholder={`Ingredient ${i + 1}`} onBlur={(event) => this.handleIngredientICommit(i, event.target.value)} onChange={(event) => this.handleIngredientIChange(i, event.target.value)}/>
                        &nbsp;&nbsp;
                        <input style={{"width": "75px"}} type="text" value={(this.state.ingredientList[i]) ? this.state.ingredientList[i].quantity : ""} placeholder="Quantity" onBlur={(event) => this.handleIngredientQuantityCommit(i, event.target.value)} onChange={(event) => this.handleIngredientQuantityChange(i, event.target.value)}/>
                        &nbsp;&nbsp;
                        <select value={(this.state.ingredientList[i]) ? this.state.ingredientList[i].units : ""} onChange={(event) => this.handleUnitChange(i, event.target.value)}>
                          <option selected value=""> </option>
                          <option value="cups">Cup(s)</option>
                          <option value="oz">oz</option>
                          <option value="L">Liter(s)</option>
                        </select>
                        <input style={{"backgroundColor": "rgba(0,0,0,0)", border: "none"}} className="clickable circle-button" type="button" value="X" onClick={(event) => this.handleRemoveIngredientButtonClick(i)}/>
                    </div>
                )
            }
            { (this.state.ingredients > 0) ? <br/> : null }
            <input type="button" className="dark-button fullest" value="Add Ingredient" onClick={this.handleAddIngredientButtonClick}/>
        </div>;
    }
}

function renderPantry(userRef, container)
{
    ReactDOM.render(<Pantry userRef={userRef}/>, container);
}
