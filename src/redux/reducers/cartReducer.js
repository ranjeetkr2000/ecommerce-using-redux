import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT, DECREMENT } from "../actionTypes";

const initialState = {
    cart : [],
}

export default function cartReducer(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART : {

            let item = {
                ...action.payload,
                quantity : 1,
            }
            return {
                cart : [...state.cart, item],
            }
        }

        case REMOVE_FROM_CART : {
            let productToRemoveId = action.payload;
            return {
                cart : state.cart.filter((currItem) => {
                    return currItem.id !== productToRemoveId;
                })
            }
        }

        case INCREMENT : {
            let updateItemId = action.payload;
            return {
                cart : state.cart.map((currItem) => {
                    if(currItem.id === updateItemId){
                        return {
                            ...currItem,
                            quantity: currItem.quantity + 1,
                        }
                    } else {
                        return currItem;
                    }
                })
            }
        }

        case DECREMENT : {
            let updateItemId = action.payload;
            return {
                cart : state.cart.map((currItem) => {
                    if(currItem.id === updateItemId){
                        return {
                            ...currItem,
                            quantity: currItem.quantity - 1,
                        }
                    }
                    else {
                        return currItem;
                    }
                })
            }
        }

        default : {
            return state;
        }
    }
}