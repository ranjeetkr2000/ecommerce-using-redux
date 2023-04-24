import React, { Component } from "react";
import Error from "./Error";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

import { connect } from "react-redux";

class HeroSection extends Component {
    render() {

        const {status, products, errorMsg, handleEdit} = this.props;
        return (
            <>
                {status === "loading" && <Loader />}
                {status === "error" && <Error errorMsg={errorMsg}/>}
                {status === "loaded" && products.length === 0 && (
                    <Error
                        errorMsg={
                            "No products found, please try after sometime"
                        }
                    />
                )}
                
                <section className="hero_section">
                    {status === "loaded" && products.length > 0 &&
                        products.map((product) => {
                            return (
                                <ProductCard 
                                    key={product.id} 
                                    product={product}
                                    handleEdit = {handleEdit}
                                />
                            );
                    })}
                </section>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    
    const { products} = state.productReducer;

    return {
        products,
    }
}

export default connect(mapStateToProps)(HeroSection);
