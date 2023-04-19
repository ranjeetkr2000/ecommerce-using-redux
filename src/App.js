import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import HeroSection from "./components/HeroSection";
import './App.css';
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

class App extends Component {

    constructor(props) {
        super(props);

        this.API_STATES = {
          LOADING: "loading",
          LOADED: "loaded",
          ERROR: "error"
        }
    
        this.state = {
          status: this.API_STATES.LOADING,
          products: [],
          productToEdit: {},
          errorMsg: "",
        }

        this.URL = 'https://fakestoreapi.com/products';
    }
    
    handleDelete = (productToDelete) => {
        this.setState((prevState) => ({
            products: prevState.products.filter((currProduct) => {
                return currProduct.id !== productToDelete.id;
            })
        }))
    }

    handleEdit = (product) => {
        this.setState({
            productToEdit : product,
        })
    }

    addNewProduct = (newProductData) => {
        const {title, category, price, image, description} = newProductData;
        let productsArr = this.state.products;
        let newId = productsArr[productsArr.length - 1].id + 1;
        let newProduct = {
            id: newId,
            title,
            description,
            category,
            price,
            image,
            rating: {
                rate: 0,
                count: 0,
            }
        }

        productsArr.push(newProduct);

        this.setState({
            products : productsArr,
        })
    }

    handleUpdate = (product) => {
        this.setState((prevState) => ({
            products: prevState.products.map((currProduct) => {
                if(currProduct.id === product.id){
                    return product;
                } else {
                    return currProduct;
                }
            })
        }))
    }

    fetchData = (url) => {
        this.setState({
            status: this.API_STATES.LOADING,
        },() => {
            axios.get(url)
                .then((response) => {
                    this.setState({
                        status: this.API_STATES.LOADED,
                        products: response.data,
                    });
                })
                .catch((error) => {
                    this.setState({
                        status: this.API_STATES.ERROR,
                        errorMsg: "An API error occurred, please try after some time.",
                    });
                });
            }
        );
    };

    componentDidMount() {
        this.fetchData(this.URL)
    }

    render() {
        return (
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={
                        <HeroSection 
                            status={this.state.status}
                            products={this.state.products}
                            errorMsg={this.state.errorMsg}
                            handleDelete={this.handleDelete}
                            handleEdit={this.handleEdit}
                        />}
                    />

                    <Route path="add_product" element = {
                        <AddProduct addNewProduct = {this.addNewProduct}/>
                    } />

                    <Route path="edit_product/:id" element = {
                        <>
                        <EditProduct 
                            productToEdit={this.state.productToEdit}
                            handleUpdate={this.handleUpdate}
                        />
                        </>
                    }
                    />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default App;
