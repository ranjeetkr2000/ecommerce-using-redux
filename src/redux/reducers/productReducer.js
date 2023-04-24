import { INIT_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, REMOVE_PRODUCT } from "../actionTypes";

import { v4 as uuidV4} from 'uuid';

const initialState = {
    products: [],
};

export default function productReducer(state = initialState, action){
    switch(action.type){
        case INIT_PRODUCTS : {
            const productsData = action.payload;
            return {
                ...state,
                products : productsData,
            }
        }

        case ADD_PRODUCT : {
            const id = uuidV4();

            const productData = { 
                ...action.payload,
                id,
                rating : {
                    rate: 0,
                    count: 0,
                }
            }

            return {
                ...state,
                products : [...state.products, productData],
            }
        }

        case EDIT_PRODUCT : {
            const productToEdit = action.payload;

            return {
                ...state,
                products : state.products.map((currProduct) => {
                    if(currProduct.id === productToEdit.id){
                        return productToEdit;
                    } else {
                        return currProduct;
                    }
                })
            }
        }

        case REMOVE_PRODUCT : {
            const productToRemoveId = action.payload;

            return {
                ...state,
                products : state.products.filter((currProduct) => {
                    return currProduct.id !== productToRemoveId;
                }),
            }
        }

        default : {
            return state;
        }
    }
}