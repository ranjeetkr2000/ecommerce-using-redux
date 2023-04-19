import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {

    constructor(props){
        super(props);

        this.state = {
            confirmDelete: false,
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
        this.props.handleDelete(this.props.product);
    }

    handleDeleteNo = () => {
        this.setState({
            confirmDelete: false,
        })
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
            </div>
        );
    }
}

export default ProductCard;
