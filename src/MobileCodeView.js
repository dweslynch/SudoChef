class MobileCodeView extends React.Component {
    constructor(props)
    {
        super(props);

        this.mobileKey = props.mobileKey;

        this.generateURL = this.generateURL.bind(this);
    }

    generateURL(key)
    {
        // Replace this later
        const mobileURL = `https://dweslynch.github.io/authtest/mobile.html?key=${key}`;
        console.log(mobileURL);
        const formattedMobileURL = encodeURIComponent(mobileURL);

        const codeURL = `http://api.qrserver.com/v1/create-qr-code/?data=${formattedMobileURL}&size=250x250&color=111111&bgcolor=eeeeee`;

        return codeURL;
    }

    render()
    {
        return <div style={{'textAlign': 'center'}}>
            <h2>My Grocery List</h2>
            <p>Scan this code on your mobile device to view your mobile grocery list</p>
            <br/><br/>
            <img className="code" src={this.generateURL(this.mobileKey)}/>
        </div>;
    }
}

function renderMobileCode(key, container)
{
    ReactDOM.render(<MobileCodeView mobileKey={key}/>, container);
}
