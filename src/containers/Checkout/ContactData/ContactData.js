import React, { Component } from 'react';
import axios from '../../../axios';

import Stylesheet from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            phone: ''
        },
        loadingPurchase: false,
        sentPurchase: false
    }

    orderClickHandler = (ev) => {
        ev.preventDefault()

        const pedidoData = {
            ingredientes: this.props.ingredients,
            precio: this.props.price,
            cliente: {
                nombre: "Demo User",
                direccion: "Demo Direccion",
                postalcode: "postal code de demostracion",
                telefono: "demo phone",
                email: "demo email"
            },
            metodoEntrega: 'rapida',
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

    render() {
        let form = null
        if (this.state.loadingPurchase) {
            form = <Spinner />
        } else {
            if (this.state.sentPurchase) {
                form = <p style={{textAlign: 'center'}}>Order was sent!</p>
            } else {
                form = (
                    <form>
                        <legend>Enter your contact details</legend>
                        <input className={Stylesheet.Input} type='text' name='name' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} placeholder='Your name' />
                        <input className={Stylesheet.Input} type='email' name='email' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder='Your email' />
                        <input className={Stylesheet.Input} type='text' name='street' value={this.state.address.street} placeholder='Your street address' />
                        <input className={Stylesheet.Input} type='text' name='postal' value={this.state.address.postalCode} placeholder='Postal Code' />
                        <input className={Stylesheet.Input} type='text' name='phone' value={this.state.address.phone} placeholder='Your phone number' />
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