import React from 'react';
import { withRouter } from 'react-router-dom';

import Stylesheet from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = null
    if (props.ingredients) {
        transformedIngredients = Object.keys(props.ingredients) // convertir las propiedades de nombres como elementos de array
        .map(igKey => {
            const ingredient = props.ingredients[igKey]
            let ingrArr = []
            if (ingredient.count && ingredient.count > 0) {
                for (let i = 1; i <= ingredient.count; i++) {
                    ingrArr.push(<BurgerIngredient key={ingredient.id + igKey + i} type={ingredient.type} />)
                }
            }
            return ingrArr
        })
        .reduce((arr, el) => { // este metodo sirve para concatenar todos los elementos en un solo elemento contenedor
            return arr.concat(el)
        }, []);
    }

    //console.log(transformedIngredients)
    if (transformedIngredients && transformedIngredients.length === 0)
        transformedIngredients = <p>¡Empiece a añadir los ingredientes deseados para armar tu hamburguesa!</p>

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

export default withRouter(burger);