class PiplelineDeals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: [],
        };
    }
    
    componentDidMount() {
        fetch("https://api.pipelinedeals.com/api/v3/deals.json?api_key=fiIbpGxSi1A__B5wYsVJ", {
            "method": "GET",
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res =>res.json())
        //.then(json=>console.log(json.entries))
        .then(data => this.setState({ deals: data.entries }))
        .catch((error) => {
            //on error
            console.log(error);
        });
    }
    render() {
        const { deals } = this.state;

        return (
            <div>
                <h2>Pipeline Deals</h2>
                <table>
                    <tr key='1'>
                        <th>Deal ID</th>
                        <th>Name</th>
                        <th>Summary</th>
                        <th>Value in cents</th>
                        <th>Source ID</th>
                        <th>Source Name</th>
                        <th>Probability</th>
                        <th>Primary contact</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                        {deals.map(deal =>
                        <tr key={deal.id}>
                            <td>{deal.id}</td>
                            <td>{deal.name}</td>
                            <td>{deal.summary}</td>
                            <td>{deal.value_in_cents}</td>
                            <td>{deal.source.id}</td>
                            <td>{deal.source.name}</td>
                            <td>{deal.probability}</td>
                            <td>{deal.primary_contact.first_name+' '+deal.primary_contact.last_name}</td>
                            <td>{deal.primary_contact.phone}</td>
                            <td>{deal.primary_contact.email}</td>
                        </tr>
                        )}
                    </table>
            </div>
        );
    }
} 

ReactDOM.render(<PiplelineDeals/>,document.getElementById('app'));