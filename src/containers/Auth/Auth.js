import React, { Component } from 'react';

import Stylesheet from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


class Auth extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nombre de usuario'
                },
                value: '',
                validation: {
                    required: true
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
        }
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

        return isValid
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
            <form onSubmit={this.orderClickHandler}>
                <legend>Enter your login details</legend>
                {formInputs}
                <Button btnType="Success">Log in</Button>
            </form>
        )

        return (
            <div className={Stylesheet.Auth}>
                {form}
            </div>
        )
    }
}

export default Auth;