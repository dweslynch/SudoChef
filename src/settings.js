class Settings extends React.Component
{
    constructor(props)
    {
        super(props);

        this.userRef = props.userRef;

        this.titles = {
            peanutFree: "Peanut allergy",
            treenutFree: "Treenut allergy",
            fishFree: "Fish allergy",
            shellfishFree: "Shellfish allergy",
            dairyFree: "Dairy allergy",
            eggFree: "Egg allergy",
            kosher: "Kosher",
            vegetarian: "Vegetarian",
            vegan: "Vegan"
        };

        this.state = {
            restrictions: {
                peanutFree: false,
                treenutFree: false,
                fishFree: false,
                shellfishFree: false,
                dairyFree: false,
                eggFree: false,
                kosher: false,
                vegetarian: false,
                vegan: false
            }
        }

        this.handleRestrictionToggle = this.handleRestrictionToggle.bind(this);
        this.updateStateFromSnapshot = this.updateStateFromSnapshot.bind(this);
    }

    componentDidMount()
    {
        this.userRef.child('restrictions').once('value').then(this.updateStateFromSnapshot);
        this.userRef.child('restrictions').on('value', this.updateStateFromSnapshot);
    }

    updateStateFromSnapshot(snapshot)
    {
        if (snapshot.val())
        {
            const data = snapshot.val();
            console.log(data);
            this.setState(function(state) {
                for (const key in state.restrictions)
                {
                    console.log(key);
                    if (data[key])
                    {
                        console.log("data contains key");
                        state.restrictions[key] = true;
                    }
                    else
                    {
                        console.log("data does not contain key");
                        state.restrictions[key] = false;
                    }
                }
                return state;
            });
        }
        else
        {
            this.setState({
                restrictions: {
                    peanutFree: false,
                    treenutFree: false,
                    fishFree: false,
                    shellfishFree: false,
                    dairyFree: false,
                    eggFree: false,
                    kosher: false,
                    vegetarian: false,
                    vegan: false
                }
            });
        }
    }

    handleRestrictionToggle(event)
    {
        const name = event.target.name;
        if (this.state.restrictions[name])
        {
            // Currently set, toggling to off
            this.userRef.child('restrictions').child(name).remove();
            // State will be refreshed once the data changes in firebase
        }
        else
        {
            // Currently off, toggling to on
            this.userRef.child('restrictions').child(name).set(true);
        }
    }

    render() {
        return <div>
            <h2>Dietary Restrictions<br/></h2>
            { Object.entries(this.state.restrictions).map(kvp =>
                <span>
                    <input type="button" className={(kvp[1]) ? "spaced dark-button" : "spaced light-button"} name={kvp[0]} value={this.titles[kvp[0]]} onClick={this.handleRestrictionToggle}/>
                </span>
            ) }
        </div>;
    }
}

function renderSettingsView(userRef, container)
{
    ReactDOM.render(<Settings userRef={userRef}/>, container);
}
