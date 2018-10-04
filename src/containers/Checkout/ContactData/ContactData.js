import React, { Component } from 'react';

import Stylesheet from './ContactData.css';

import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            phone: ''
        }
    }

    render() {
        return (
            <div className={Stylesheet.ContactData}>
                <form>
                    <legend>Enter your contact details</legend>
                    <input className={Stylesheet.Input} type='text' name='name' placeholder='Your name' />
                    <input className={Stylesheet.Input} type='email' name='email' placeholder='Your email' />
                    <input className={Stylesheet.Input} type='text' name='street' placeholder='Your street address' />
                    <input className={Stylesheet.Input} type='text' name='postal' placeholder='Postal Code' />
                    <input className={Stylesheet.Input} type='text' name='phone' placeholder='Your phone number' />
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;