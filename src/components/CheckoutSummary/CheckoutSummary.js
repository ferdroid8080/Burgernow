import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../../components/UI/Button/Button';

import Stylesheet from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={Stylesheet.CheckoutSummary}>
            <h2>Esperamos que la disfrute</h2>
            <Burger ingredients={props.ingredients} />
            <Button btnType='Danger' btnClicked={props.clickedCancel}>CANCEL</Button>
            <Button btnType='Success' btnClicked={props.clickedContinue}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;