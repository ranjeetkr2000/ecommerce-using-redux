import React, { Component } from "react";
import validator from "validator";
import Success from "./Success";
import { connect } from "react-redux";
import { ADD_PRODUCT } from "../redux/actionTypes";

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            category: "",
            description: "",
            price: "",
            image: "",
            errors: {},
            isFormValid: false,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { description, title, price, category, image } = this.state;

        let errors = {};

        if (title.trim() === "") {
            errors.title = "Please enter the product title";
        }
        if (description.trim().length < 20) {
            errors.description = "Description must be at least 20 characters";
        }
        console.log(typeof price);
        if (!validator.isFloat(price) || price <= 0) {
            errors.price = "Price should be greater than zero";
        }
        if (category.trim() === "") {
            errors.category = "Please enter proper category";
        }
        if (image.trim() === "" || !validator.isURL(image)) {
            errors.image = "Please enter proper image URL";
        }
        if (Object.keys(errors).length === 0) {
            this.setState(
                {
                    isFormValid: true,
                },
                () => {
                    let {title, description, id, price, image} = this.state;
                    let product = {
                        title,
                        description,
                        id,
                        price,
                        image,
                    }

                    this.props.addProduct(product);
                }
            );
        } else {
            this.setState({
                errors,
            });
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        let { errors } = this.state;
        delete errors[name];

        this.setState({
            [name]: value,
            errors,
        });
    };

    render() {
        const { title, category, description, price, image, errors } =
            this.state;
        return (
            <>
            {!this.state.isFormValid &&
                <div className="add_form">
                    <form
                        className="d-flex flex-column"
                        onSubmit={this.handleSubmit}
                    >
                        <legend>New Product Details</legend>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="Product Title"
                                value={title}
                                onChange={this.handleChange}
                            />
                            <p className="text-danger">
                                <small>{errors.title}</small>
                            </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                name="category"
                                value={category}
                                onChange={this.handleChange}
                                placeholder="Product Category"
                            />
                            <p className="text-danger">
                                <small>{errors.category}</small>
                            </p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                                placeholder="Product Description"
                            />
                            <p className="text-danger">
                                <small>{errors.description}</small>
                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Price
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                name="price"
                                value={price}
                                onChange={this.handleChange}
                                placeholder="Product Price"
                            />
                            <p className="text-danger">
                                <small>{errors.price}</small>
                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Image (URL)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                name="image"
                                value={image}
                                onChange={this.handleChange}
                                placeholder="Product Image URL"
                            />
                            <p className="text-danger">
                                <small>{errors.image}</small>
                            </p>
                        </div>

                        <button type="submit" className="btn btn-primary mb-3">
                            Submit
                        </button>
                    </form>
                </div>
            }

            {       
                this.state.isFormValid && <Success />
            }
            </>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        addProduct: (product) => {
            dispatch({
                type : ADD_PRODUCT,
                payload : product,
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(AddProduct);
