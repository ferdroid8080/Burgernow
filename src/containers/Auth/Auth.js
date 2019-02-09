import React, { Component } from 'react';
import { connect } from 'react-redux';

import Stylesheet from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Correo electronico'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            passwd: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Contraseña'
                },
                value: '',
                validation: {
                    required: true,
                    min: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    } 

    checkValidations(value, rules) {
        let isValid = true
        
        if (rules.required) {
            isValid = value.trim().length !== 0 && isValid
        }

        if (rules.min) {
            isValid = value.trim().length >= rules.min && isValid
        }

        if (rules.max) {
            isValid = value.trim().length <= rules.max && isValid
        }

        if (rules.isEmail) {
            isValid = this.emailValid(value.trim()) && isValid
        }

        return isValid
    }

    emailValid(email='') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    onInputChangedHandler = (event, inputId) => {
        const value = event.target.value
        const updatedControls = {
            ...this.state.controls,
            [inputId]: {
                ...this.state.controls[inputId],
                value: value,
                valid: this.checkValidations(value, this.state.controls[inputId].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    submitHandler = event => {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value, 
            this.state.controls.passwd.value, 
            this.state.isSignup
        )
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }
    
    render() {
        let form = null, formInputs = null

        formInputs = Object.keys(this.state.controls).map(fi => 
        <Input 
            key={fi} 
            elementType={this.state.controls[fi].elementType} 
            elementConfig={this.state.controls[fi].elementConfig} 
            value={this.state.controls[fi].value}
            shouldValidate={this.state.controls[fi].validation}
            valid={this.state.controls[fi].valid}
            touched={this.state.controls[fi].touched}
            changed={(event) => this.onInputChangedHandler(event, fi)} />
        )

        form = (
            <form onSubmit={this.submitHandler}>
                <legend>Enter your login details</legend>
                {formInputs}
                {this.state.isSignup
                    ?
                    <Button btnType="Success">Register an account</Button>
                    :
                    <Button btnType="Success">Log in</Button>
                }
            </form>
        )

        return (
            <div className={Stylesheet.Auth}>
                {form}
                <Button btnClicked={this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.isSignup ? 'signin' : 'signup'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, passwd, isSignup) => dispatch(actions.auth(email, passwd, isSignup))
    }
}

export default connect(null, mapDispatchToProps)(Auth);