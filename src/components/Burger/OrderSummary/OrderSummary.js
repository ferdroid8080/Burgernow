import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

import Stylesheet from './OrderSummary.css';


const orderSummary = (props) => {
    let ingredientSummary = null
    if (props.ingredients) {
        ingredientSummary = props.ingredients
            .map((i, index) => {
                let item = null
                if (i.count && i.count > 0) {
                    item = (
                        <tr key={i.id + '_' + index}>
                            <td>{i.label}</td>
                            <td className='text-center'>{i.count}</td>
                            <td>$ {i.price.toLocaleString()}</td>
                            <td>$ {(i.price * i.count).toLocaleString()}</td>
                        </tr>
                    )
                }
                return item
            })
    }

    return (
        props.loading ? 
            <Spinner /> : 
            (
                <Aux>
                    <h2>Detalles de su orden</h2>
                    <p>Su deliciosa hamburguesa con los siguientes sabores:</p>
                    <table className={Stylesheet.CustomTable}>
                        <thead>
                            <tr>
                                <td>Ingrediente</td>
                                <td>Cantidad</td>
                                <td>Precio Unitario (<strong>USD</strong>)</td>
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
    )
}

export default orderSummary;