import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ADD_TO_CART, EDIT_PRODUCT, REMOVE_PRODUCT } from "../redux/actionTypes";

class ProductCard extends Component {

    constructor(props){
        super(props);

        this.state = {
            confirmDelete: false,
            alreadyInCart : false,
            addedToCart: false,
        }
    }

    handleDeleteClick = () => {
        this.setState({
            confirmDelete: true
        })
    }

    handleEditClick = () => {
        this.props.handleEdit(this.props.product);
    }

    handleDeleteYes = () => {
        this.props.removeProduct(this.props.product.id);

    }

    handleDeleteNo = () => {
        this.setState({
            confirmDelete: false,
        })
    }

    handleAddToCart = () => {
        let ifItemExists =  this.props.cart.find((currItem) => {
            return currItem.id === this.props.product.id;
        });
        
        if(ifItemExists){
            this.setState((prevState) => {
                return {
                    ...prevState,
                    alreadyInCart: true,
                }
            })

            setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        alreadyInCart: false,
                    }
                })
            }, 1 * 1000);
        } 
        else {
            this.props.addToCart(this.props.product);

            this.setState((prevState) => {
                return {
                    ...prevState,
                    addedToCart: true,
                }
            })

            setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        addedToCart: false,
                    }
                })
            }, 1 * 1000);
        }
    }

    render() {

        const { image, title, category, rating, price, description, id } = this.props.product;

        return (
            <div className="product">
                <img src={image} alt={title} className="product_image"></img>
                <h5 className="product_title">{title}</h5>
                <span className="product_category">Category: {category}</span>
                <div className="rating">
                    <span>
                        <i className="fa-solid fa-star"></i> {rating.rate}
                    </span>
                    <span>
                        <i className="fa-solid fa-user"></i> {rating.count}
                    </span>
                </div>
                <div className="description">
                    {description.substring(0, 90)}...
                </div>
                <div className="card_end">
                    <span className="price">
                        <span className="dollar">$</span>
                        {price}
                    </span>
                    <div>
                        {!this.state.confirmDelete &&
                            (<button className="btn btn-outline-danger rounded-circle me-3" onClick={this.handleDeleteClick}>
                                <i className="fa-solid fa-trash"></i>
                            </button>)
                        }
                        {
                            this.state.confirmDelete &&
                            <>
                                <small className="me-1">Delete?</small>
                                <button className="btn btn-outline-danger me-3" onClick={this.handleDeleteYes}>
                                    Yes
                                </button>
                                <button className="btn btn-outline-success me-3" onClick={this.handleDeleteNo}>
                                    No
                                </button>
                            </>
                        }
                        <Link to={`/edit_product/${id}`} onClick={this.handleEditClick}>
                            <button className="btn btn-outline-primary rounded-circle">
                                    <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="add_cart_div">
                    <button className="add_cart" onClick={this.handleAddToCart}>
                            Add to Cart
                    </button>
                    {this.state.addedToCart && <small>Added To Cart</small>} 
                    {this.state.alreadyInCart && <small>Already in cart</small>}
                </div> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer.cart,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeProduct : (productId) => {
            dispatch({
                type: REMOVE_PRODUCT,
                payload : productId,
            })
        },

        editProduct : (product) => {
            dispatch({
                type: EDIT_PRODUCT,
                payload: product,
            })
        },

        addToCart : (product) => {
            dispatch({
                type: ADD_TO_CART,
                payload: product,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
