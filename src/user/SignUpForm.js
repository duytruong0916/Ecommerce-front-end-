import React from 'react';
import * as EmailValidator from 'email-validator'
import { connect } from 'react-redux';
import { startSignUpWithEmail } from '../redux-store/actions/auth';
export class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirm_password: '',
            error: ''
        }
    }
    onFirstNameChange = (e) => {
        const firstname = e.target.value;
        this.setState(() => ({ firstname }));
    }
    onLastNameChange = (e) => {
        const lastname = e.target.value;
        this.setState(() => ({ lastname }));
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }
    onConfirmPasswordChange = (e) => {
        const confirm_password = e.target.value;
        this.setState(() => ({ confirm_password }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.email || !this.state.password) {
            this.setState(() => ({ error: "Missing Email or Password" }))
        } else if (!EmailValidator.validate(this.state.email)) {
            this.setState(() => ({ error: 'Invalid email' }));
        }
        else if (this.state.password !== this.state.confirm_password) {
            this.setState(() => ({ error: "Passwords do not match" }))
        }
        else {
            this.setState(() => ({ error: '' }));
            const user = {
                name:  this.state.firstname,
                email: this.state.email,
                password: this.state.password
            }
            console.log(user)
            this.props.signUp(user);
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='section-1'>
                        <div>
                            <span className="font-weight-bold">First name:</span>
                            <input
                                className='text-input w-50 ml-4'
                                id='fistname'
                                type='text'
                                placeholder='First name'
                                value={this.state.firstname}
                                onChange={this.onFirstNameChange} />
                        </div>
                        <div>
                            <span className="font-weight-bold">Last name:</span>
                            <input
                                className='text-input w-50 ml-4 mt-4'
                                id='lastname'
                                type='text'
                                placeholder='Last name'
                                value={this.state.lastname}
                                onChange={this.onLastNameChange} />
                        </div>
                    </div>
                    <div>
                        <div><span className="font-weight-bold">Email:</span></div>
                        <input
                            className={`login_input w-100 login_input ml-2 ${this.state.error || this.props.AuthError ? 'login_invalid_input' : ''}`}
                            id='email'
                            type='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={this.onEmailChange} />
                    </div>
                    <div>
                        <div><span className="font-weight-bold">Password:</span></div>
                        <input
                            className={`login_input w-75 login_input ml-2 ${this.state.error || this.props.AuthError ? 'login_invalid_input' : ''}`}
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.onPasswordChange} />
                    </div>
                    <div>
                        <div><span className="font-weight-bold">Confirm Password</span></div>
                        <input
                            className={`login_input w-75 login_input ml-2 ${this.state.error || this.props.AuthError ? 'login_invalid_input' : ''}`}
                            id='confirm_password'
                            type='password'
                            placeholder='Confirm password'
                            value={this.state.confirm_password}
                            onChange={this.onConfirmPasswordChange} />
                    </div>
                    <div className='text-center mt-4 text-danger'>
                        {this.props.signupError && !this.state.error ? <p>{this.props.signupError}</p> : null}
                        {this.state.error && <p>{this.state.error}</p>}
                    </div>
                    <button className="button mt-3 w-100">Submit & Log In</button>
                </form>

            </div>
        )
    }
}
const MapStateToProps = (state) => ({
    signupError: state.auth.authError
})
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(startSignUpWithEmail(creds))
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(SignUpForm);