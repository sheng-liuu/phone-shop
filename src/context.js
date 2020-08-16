import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    //监控data.js是否有改变
    state ={
        products: [],
        detailProduct: detailProduct,
        cart: storeProducts,
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return { products: tempProducts };
        });
    };

    getItem = (id) =>{
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
    };

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {
                products: tempProducts, 
                cart: [...this.state.cart, product] // = this.state.cart + product
            };
        }, () =>{console.log(this.state);
        }
        );
    };

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                modalProduct: product,
                modalOpen: true
            }
        })
    }

    closeModal = (id) => {
        this.setState(() =>{
            return {
                modalOpen: false
            }
        })
    }

    increment = (id) => {
        console.log('this is increament method');
    }

    decrement = (id) => {
        console.log('this is decreament method');
    }

    removeItem = (id) => {
        console.log('this is removed ');
    }

    clearCart = () => {
        console.log('vart was cleared');
    }

    render() {
        return (
            <ProductContext.Provider 
                // 这个value是被其他使用这个component的js 调用的
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment:this.increment,
                    decrement:this.decrement,
                    removeItem:this.removeItem,
                    clearCart:this.clearCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };