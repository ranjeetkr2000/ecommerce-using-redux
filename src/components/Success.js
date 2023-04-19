import React, { Component } from "react";
import { Link } from "react-router-dom";

class Success extends Component {
    render() {
        return (
            <div className="d-flex flex-column align-items-center rounded-5 px-4 py-5 bg-light shadow-lg align-self-center">
                <i className="fa-solid fa-circle-check py-4 fs-1"></i>
                <span>Product has been updated</span>
                <Link to="/">
                    <button className="btn btn-success mt-3">Go to Home</button>
                </Link>
            </div>
        );
    }
}

export default Success;
