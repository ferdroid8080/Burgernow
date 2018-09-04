import React from 'react';

import Stylesheet from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients) // convertir las propiedades de nombres como elementos de array
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => // mapear con el operador Spread las cantidades de cada elemento
                <BurgerIngredient key={igKey + i} type={igKey} />)
        })
        .reduce((arr, el) => { // este metodo sirve para concatenar todos los elementos en un solo elemento contenedor
            return arr.concat(el)
        }, []);

    //console.log(transformedIngredients)
    if (transformedIngredients.length === 0)
        transformedIngredients = <p>Please adding some ingredients to start off!</p>

    // let countIngredients = 0
    // transformedIngredients.forEach((val, i) => {
    //     if (val.length > 0) {
    //         countIngredients += val.length
    //     }
    // })
    // if (countIngredients === 0)
    //     console.log('Please adding some ingredients to start off')

    return (
        <div className={Stylesheet.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;