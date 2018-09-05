import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <Aux>
            <h2>Detalles de su orden</h2>
            <p>Su deliciosa hamburguesa con los siguientes sabores:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Valor a pagar: ${props.price.toFixed(2)} USD</strong></p>
            <p>¿Esta bien que continue con la compra?</p>
            <Button btnType="Danger" btnClicked={props.purchaseCancelledHandler}>cancelar</Button>
            <Button btnType="Success" btnClicked={props.purchaseContinuedHandler}>pagar</Button>
        </Aux>
    )
}

export default orderSummary;