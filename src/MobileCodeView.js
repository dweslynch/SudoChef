class MobileCodeView extends React.Component {
    constructor(props)
    {
        super(props);

        this.mobileRef = props.mobileRef;

        this.state = {
            active: true
        }

        this.mobileKey = props.mobileKey;
        this.generateURL = this.generateURL.bind(this);
        this.updateStateFromSnapshot = this.updateStateFromSnapshot.bind(this);
    }

    componentDidMount()
    {
        this.mobileRef.child(this.mobileKey).on('value', this.updateStateFromSnapshot);
    }

    updateStateFromSnapshot(snapshot)
    {
        if (snapshot.val())
        {
            // Do Nothing
        }
        else
        {
            this.setState({ active: false });
        }
    }

    generateURL(key)
    {
        // Replace this later
        const mobileURL = `https://dweslynch.github.io/SudoChef/mobile.html?key=${key}`;
        console.log(mobileURL);
        const formattedMobileURL = encodeURIComponent(mobileURL);

        const codeURL = `http://api.qrserver.com/v1/create-qr-code/?data=${formattedMobileURL}&size=250x250&color=111111&bgcolor=eeeeee`;

        return codeURL;
    }

    render()
    {
        return <div style={{'textAlign': 'center'}}>
            <h2>Make a Grocery Run</h2>
            {
                (this.state.active) ?
                <p>Bring your list with you to the grocery store and cross off items as you go by scanning this code with your mobile device.<br/></p>
                : <p style={{'color' : 'green'}}><br/>&#x02713; Your pantry has been updated!</p>
            }
            {
                (this.state.active) ?
                <img className="code" src={this.generateURL(this.mobileKey)}/>
                : null
            }
        </div>;
    }
}

function renderMobileCode(key, container, mobileRef)
{
    ReactDOM.render(<MobileCodeView mobileKey={key} mobileRef={mobileRef}/>, container);
}
