import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {storeProducts} from '../data'

export default class ProductsList extends Component {
    state = {
        Products: []
    };
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}