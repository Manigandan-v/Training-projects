import React from 'react';

class EmailVerifier extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheckMail=this.handleCheckMail.bind(this);
        this.state = {
            value:'',
            response: '',
            error:''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ value: e.target.value.trim() });
        e.target.value = '';
    }
    handleCheckMail(e){
        e.preventDefault();
        this.setState(()=>{
            return {
                response: 'Checking....',
                error:''
            }
        });
        fetch("https://api.trumail.io/v2/lookups/json?email=" + this.state.value, {
            "method": "GET",
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.deliverable){
                    this.setState(() => {
                        return {
                            response: `Valid Email : ${this.state.value}`
                        }
                    });
                }
                else if(data.Message){
                    this.setState(() => {
                        return {
                            response: `Error from API : ${data.Message}`
                        }
                    });
                }
                else{
                    this.setState(() => {
                        return {
                            response: `Invalid Email : ${this.state.value}`
                        }
                    });
                }
            })
            .catch((error) => {
                //on error
                this.setState(() => {
                    return {
                        error: `Error while fetching : ${error}`,
                        response:''
                    }
                });
            });
    }
    render() {
        return (
        <div>
        <form onSubmit={this.handleCheckMail}>
                    <input type="email" value={this.state.value} onChange={this.handleChange}/>
            <button>Submit</button>
        </form>
        {this.state.response!=null?<p>{this.state.response}</p>:''}
        {this.state.error != null ? <p>{this.state.error}</p> : ''}
        </div>
        );
    }
}
export default EmailVerifier;