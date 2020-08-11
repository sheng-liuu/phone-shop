import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../context';

export default class ProductsList extends Component {
    render() {
        
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products" />

                        <div className="row">
                            <ProductConsumer>
                                {value=>{
                                    return value.products.map( product => {
                                        // 呼叫 Product。js这个component
                                        return <Product key={product.id} product={product}/>;
                                    })
                                }}
                            </ProductConsumer>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}