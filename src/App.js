import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Cart from "./components/Cart";
import { INIT_PRODUCTS } from "./redux/actionTypes";


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
          errorMsg: "",
          productToEdit: {},
        }

        this.URL = 'https://fakestoreapi.com/products';
    }

    handleEdit = (product) => {
        this.setState({
            productToEdit : product,
        })
    }

    fetchData = (url) => {
        this.setState({
            status: this.API_STATES.LOADING,
        },() => {
            axios.get(url)
                .then((response) => {
                    
                    this.props.addData(response.data);

                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            errorMsg: "",
                            status : this.API_STATES.LOADED,
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({
                        status: this.API_STATES.ERROR,
                        errorMsg: "An API error occurred, please try after some time.",
                    });
                });
            }
        );
    }

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
                            errorMsg={this.state.errorMsg}
                            handleEdit={this.handleEdit}
                        />}
                    />

                    <Route path="add_product" element = {
                        <AddProduct />
                    } />

                    <Route path="edit_product/:id" element = {
                        <>
                        <EditProduct 
                            productToEdit={this.state.productToEdit}
                        />
                        </>
                    }
                    />

                    <Route path = "cart" element = {<Cart />} />

                </Routes>
                <Footer />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addData : (data) => {
            dispatch({
                type: INIT_PRODUCTS,
                payload : data,
            })
        }
    }
}

export default connect(null, mapDispatchToProps )(App);
