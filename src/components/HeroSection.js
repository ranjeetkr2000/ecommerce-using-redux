import React, { Component } from "react";
import Error from "./Error";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

class HeroSection extends Component {
    render() {

        const {status, products, errorMsg, handleDelete, handleEdit} = this.props;

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
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                            );
                    })}
                </section>
            </>
        );
    }
}

export default HeroSection;
