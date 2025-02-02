import React, { Component } from "react";
import { connect } from "react-redux";
import { DECREMENT, INCREMENT, REMOVE_FROM_CART } from "../redux/actionTypes";

class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            removeItem: false,
        };
    }

    handleRemovePrompt = () => {
        this.setState({
            removeItem: true,
        });
    };

    handleYes = () => {
        this.props.removeFromCart(this.props.item.id);
    };

    handleNo = () => {
        this.setState({
            removeItem: false,
        });
    };

    handlePlusClick = () => {
        this.props.incrementQuantity(this.props.item.id);
    };

    handleMinusClick = () => {
        this.props.decrementQuantity(this.props.item.id);
    };

    render() {
        const { title, price, image, quantity } = this.props.item;
        const { removeItem } = this.state;
        return (
            <div className="cart_item">
                <img className="cart_img" src={image} alt={title}></img>
                <div className="des">
                    <h4>{title}</h4>
                    <div className="add_more">
                        <button
                            className="btns"
                            disabled={quantity === 1 ? true : false}
                            onClick={this.handleMinusClick}
                        >
                            -
                        </button>

                        <span>{quantity}</span>
                        
                        <button
                            className="btns"
                            disabled={quantity === 5 ? true : false}
                            onClick={this.handlePlusClick}
                        >
                            +
                        </button>
                    </div>
                    <div className="price_div">
                        Price:
                        <span className="price">
                            <span className="dollar">$</span>
                            {(price * quantity).toFixed(2)}
                        </span>
                    </div>
                    <div>
                        {
                            !removeItem && 
                            <button
                                className="btn btn-danger"
                                onClick={this.handleRemovePrompt}
                            >
                                Remove Item
                            </button>
                        }
                        {
                            removeItem &&
                            <>
                                <small className="me-1">Remove Item ?</small>
                                <button className="btn btn-outline-danger me-3" onClick={this.handleYes}>
                                    Yes
                                </button>
                                <button className="btn btn-outline-success me-3" onClick={this.handleNo}>
                                    No
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeFromCart: (removeItemId) => {
            dispatch({
                type: REMOVE_FROM_CART,
                payload: removeItemId,
            });
        },

        incrementQuantity: (itemId) => {
            dispatch({
                type: INCREMENT,
                payload: itemId,
            });
        },

        decrementQuantity: (itemId) => {
            dispatch({
                type: DECREMENT,
                payload: itemId,
            });
        },
    };
}

export default connect(null, mapDispatchToProps)(CartItem);
