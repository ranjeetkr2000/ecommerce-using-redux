import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";

class Cart extends Component {

    render() {

        const {cart} = this.props;
        console.log(cart);
        return (
            <div className="cart">
                {(cart.length === 0) && (
                    <p>Your cart is empty, Please add something.</p>
                )}
                {cart.length > 0 && (
                    <>
                        {cart.map((currItem) => {
                            return (
                                <CartItem
                                    key={currItem.id}
                                    item={currItem}
                                />
                            );
                        })}

                        <div className="price">
                            Total Price: $ {
                                cart.reduce((totalPrice, currItem) => {
                                    let price = currItem.price * currItem.quantity;
                                    return totalPrice + price;
                                }, 0).toFixed(2)
                            }
                        </div>
                    </>
                )}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        cart : state.cartReducer.cart,
    }
}

export default connect(mapStateToProps)(Cart);
