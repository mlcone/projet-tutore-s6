import React from 'react';
import axios from "axios";
import { path } from './config/config.json';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            infos: [],
            showForm: true
        };
    }

    handleSubmitRegister(event) {
        axios.post(`http://` + path + `/register/`+ this.state.email + `/` + this.state.password)
            .then(res => {
                const infos = res.data;
                this.setState({ infos });
            })
        event.preventDefault();
    }

    handleSubmitLogin(event) {
        axios.post(`http://` + path + `/login/`+ this.state.email + `/` + this.state.password)
            .then(res => {
                const infos = res.data;
                this.setState({ infos });
            })
        event.preventDefault();
    }

    handleChangeEmail(event) {
        let value = event.target.value;

        this.setState({
            email: value,

        });
    }

    handleChangePassword(event) {
        let value = event.target.value;

        this.setState({
            password: value,

        });
    }

    onClickShowForm (event) {
        this.setState({ showForm: true });
        if(this.state.showForm === true)
            this.setState({ showForm: false });
    }

    renderRegister () {
        return (
            <div>
                <a href="/">Back</a>
                <h1>Register Form</h1>

                <form>
                    <label>
                        <input
                            type="email"
                            value={this.state.email}
                            onChange={event => this.handleChangeEmail(event)}
                            placeholder="Email"
                        />
                        <br/>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={event => this.handleChangePassword(event)}
                            placeholder="Password"
                        />
                        <br/>
                    </label>

                    <button onClick={event => this.handleSubmitRegister(event)}>Send</button><br/>
                    <a onClick={ event => this.onClickShowForm(event) }>Already register ? (click here)</a>

                    <ul>
                        { this.state.infos.map(info => <li>{info.email}</li>)}
                        { this.state.infos.map(info => <li>{info.password}</li>)}
                    </ul>
                </form>
            </div>
        );
    }

    renderLogin () {
        return (
            <div>

                <a href="/">Back</a>
                <h1>Login Form</h1>

                <form>
                    <label>
                        <input
                            type="email"
                            value={this.state.email}
                            onChange={event => this.handleChangeEmail(event)}
                            placeholder="Email"
                        />
                        <br/>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={event => this.handleChangePassword(event)}
                            placeholder="Password"
                        />
                        <br/>
                    </label>

                    <button onClick={event => this.handleSubmitLogin(event)}>Log In</button><br/>
                    <a onClick={ event => this.onClickShowForm(event) }>Not registered (click here)</a>

                    <ul>
                        { this.state.infos.map(info => <li>{info.email}</li>)}
                        { this.state.infos.map(info => <li>{info.password}</li>)}
                    </ul>

                </form>
            </div>
        );
    }

    render() {
        const { showForm } = this.state;

        return (
            <div className='manage-app'>
                {showForm && this.renderLogin() || this.renderRegister()}
            </div>
        );
    }
}