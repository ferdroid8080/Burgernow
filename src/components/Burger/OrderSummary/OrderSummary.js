import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

import Stylesheet from './OrderSummary.css';


const orderSummary = (props) => {
    //props.fullIngredients.filter(item => console.log(item.type))

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            let itemdetail = props.fullIngredients.find(el => el.type === igKey)
            return (
                props.ingredients[igKey] !== 0
                ?
                    <tr key={igKey}>
                        <td>{itemdetail.label}</td>
                        <td className='text-center'>{props.ingredients[igKey]}</td>
                        <td>$ {itemdetail.price.toLocaleString()}</td>
                        <td>$ {(itemdetail.price * props.ingredients[igKey]).toLocaleString()}</td>
                    </tr>
                : null
            )
        })

    return (
        <Aux>
            <h2>Detalles de su orden</h2>
            <p>Su deliciosa hamburguesa con los siguientes sabores:</p>
            <table className={Stylesheet.CustomTable}>
                <thead>
                    <tr>
                        <td>Ingrediente</td>
                        <td>Cantidad</td>
                        <td>Precio Unitario (<strong>COP</strong>)</td>
                        <td>Precio Total</td>
                    </tr>
                </thead>
                <tbody>
                    {ingredientSummary}
                </tbody>
            </table>
            <p><strong>Valor a pagar: ${props.price.toLocaleString()} COP</strong></p>
            <p>¿Esta bien que continue con la compra?</p>
            <Button btnType="Danger" btnClicked={props.purchaseCancelledHandler}>cancelar</Button>
            <Button btnType="Success" btnClicked={props.purchaseContinuedHandler}>pagar</Button>
        </Aux>
    )
}

export default orderSummary;