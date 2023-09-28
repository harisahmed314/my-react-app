import React, { createContext } from 'react';
import { db } from '../config/config';
import { collection, onSnapshot } from 'firebase/firestore';

export const SaleProductsContext = createContext();  // Renamed to SaleProductsContext

export class SaleProductsContextProvider extends React.Component {

    state = {
        saleProducts: []   // Renamed state key to saleProducts
    }

    componentDidMount() {
        const prevSaleProducts = this.state.saleProducts;
        const saleProductsCollection = collection(db, 'SaleProducts');  // Get a reference to the SaleProducts collection
        
        onSnapshot(saleProductsCollection, (snapshot) => {  // Use that reference with onSnapshot
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevSaleProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg,
                        // Add any additional fields like discounts, etc. if you have any for sale products
                    })
                }
                this.setState({
                    saleProducts: prevSaleProducts
                })
            })
        });
    }

    render() {
        return (
            <SaleProductsContext.Provider value={{ products: [...this.state.saleProducts] }}>
                {this.props.children}
            </SaleProductsContext.Provider>
        )
    }
}
