import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import Stylesheet from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { parseErrorCodes, updateObject, checkValidations } from '../../helpers/utility';

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

    componentWillMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }


    onInputChangedHandler = (event, inputId) => {
        const value = event.target.value
        const updatedControls = updateObject(this.state.controls, {
            [inputId]: updateObject(this.state.controls[inputId], {
                value: value,
                valid: checkValidations(value, this.state.controls[inputId].validation),
                touched: true
            })
        }) 

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

        if (this.props.loading) {
            formInputs = <Spinner />
        }

        let errorMsg = null
        if (this.props.error) {
            errorMsg = (
                <p>{parseErrorCodes(this.props.error.message)}</p>
            )
        }

        form = (
            <form onSubmit={this.submitHandler}>
                {errorMsg}
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

        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={Stylesheet.Auth}>
                {authRedirect}
                {form}
                <Button btnClicked={this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.isSignup ? 'signin' : 'signup'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.setAuthRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, passwd, isSignup) => dispatch(actions.auth(email, passwd, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);