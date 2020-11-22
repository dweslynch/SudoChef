class GroceryListMobileView extends React.Component {
    constructor(props)
    {
        super(props);

        this.listKey = props.listKey;
        this.dbRef = props.dbRef;

        this.state = {
            items: 0,
            list: [],
            checked: [],
            done: false
        };

        this.updateListFromSnapshot = this.updateListFromSnapshot.bind(this);
        this.handleToggleCheck = this.handleToggleCheck.bind(this);
        this.clearList = this.clearList.bind(this);
    }

    componentDidMount()
    {
        this.dbRef.child('mobile').child(this.listKey).once('value').then(this.updateListFromSnapshot);
    }

    updateListFromSnapshot(snapshot)
    {
        if (snapshot.val())
        {
            let _list = [];
            let _checked = [];
            for (const kvp of Object.entries(snapshot.val()))
            {
                _list.push(kvp[1]);
                _checked.push(false);
            }

            this.setState({
                items: _list.length,
                list: _list,
                checked: _checked
            });
        }
    }

    clearList()
    {
        this.dbRef.child('mobile').child(this.listKey).remove();
        this.setState({ done: true })
    }

    handleToggleCheck(i)
    {
        this.setState(function(state) {
            state.checked[i] = !state.checked[i];
            return state;
        });
    }

    render()
    {
        let arr = [];
        for (let i = 0; i < this.state.items; i++)
        {
            arr.push(i);
        }

        return <div className="mobile-cell">
            {(this.state.done) ? <span>Thank you for using SudoChef!<br/><br/></span> :
                arr.map(i =>
                    <span>
                        <span className={(this.state.checked[i]) ? "strikethrough" : "blank"} onClick={(event) => this.handleToggleCheck(i)}>
                        {this.state.list[i].name}:&nbsp;&nbsp;{this.state.list[i].quantity}&nbsp;{(this.state.list[i].units) ? this.state.list[i].units : ""}
                        </span>
                        <br/><br/>
                    </span>
                )
            }
            <input type="button" className="dark-button-mobile" value="Done" onClick={(event) => this.clearList()}/>
        </div>;
    }
}

function renderMobileView(key, dbRef, container)
{
    ReactDOM.render(<GroceryListMobileView listKey={key} dbRef={dbRef}/>, container);
}
