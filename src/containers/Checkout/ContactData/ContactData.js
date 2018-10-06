import React, { Component } from 'react';
import axios from '../../../axios';

import Stylesheet from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderDataForm: {
            nombre: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Dinos tu nombre'
                },
                value: ''
            },
            direccion: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '¿Donde vives?'
                },
                value: ''
            },
            postalcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Dinos el codigo postal del area donde vives'
                },
                value: ''
            },
            telefono: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '¿Cual es tu numero telefonico?'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tu direccion de correo electronido (prometemos no enviarte spam)'
                },
                value: ''
            },
            metodoEntrega: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'La mas rapida'},
                        {value: 'cheapest', displayValue: 'La mas economica'}
                    ]
                },
                value: ''
            }
        },
        loadingPurchase: false,
        sentPurchase: false
    }

    orderClickHandler = (ev) => {
        ev.preventDefault()

        const pedidoData = {
            ingredientes: this.props.ingredients,
            precio: this.props.price,
            cliente: {}
        }

        for (let inputId in this.state.orderDataForm) {
            pedidoData.cliente[inputId] = this.state.orderDataForm[inputId].value
        }

        this.setState({loadingPurchase: true})
        
        axios.post('/pedidos.json', pedidoData)
            .then(response => {
                //this.setState({loadingPurchase: false, sentPurchase: true})
                this.props.history.replace('/')
            })
            .catch(error => {
                this.setState({loadingPurchase: false})
            })
    }

    onInputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderDataForm}
        const updatedInputElement = {...updatedOrderForm[inputId]}
        updatedInputElement.value = event.target.value
        updatedOrderForm[inputId] = updatedInputElement
        this.setState({orderDataForm: updatedOrderForm})
    }

    render() {
        let form = null, formInputs = null

        formInputs = Object.keys(this.state.orderDataForm).map(fi => 
            <Input 
                key={fi} 
                elementType={this.state.orderDataForm[fi].elementType} 
                elementConfig={this.state.orderDataForm[fi].elementConfig} 
                value={this.state.orderDataForm[fi].value}
                changed={(event) => this.onInputChangedHandler(event, fi)} />
        )

        if (this.state.loadingPurchase) {
            form = <Spinner />
        } else {
            if (this.state.sentPurchase) {
                form = <p style={{textAlign: 'center'}}>Order was sent!</p>
            } else {
                form = (
                    <form onSubmit={this.orderClickHandler}>
                        <legend>Enter your contact details</legend>
                        {formInputs}
                        <Button btnType='Success' btnClicked={this.orderClickHandler}>ORDER</Button>
                    </form>
                )
            }
            
        }
        return (
            <div className={Stylesheet.ContactData}>
                {form}
            </div>
        )
    }
}

export default ContactData;