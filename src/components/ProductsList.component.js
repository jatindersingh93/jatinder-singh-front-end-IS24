import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveProducts,
} from "../slices/products";
import { Link } from "react-router-dom";

// render all product lists in a table view
class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);

    this.state = {
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }
  componentDidMount() {
    this.props.retrieveProducts();
  }
  refreshData() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }
  setActiveProduct(product, index) {
    this.setState({
      currentTutorial: product,
      currentIndex: index,
    });
  }        
  render() {   
    const { currentTutorial, currentIndex } = this.state;
    const { products } = this.props;    
    //debugger
      return (
        <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.name}
                </li>
              ))}          
        </ul>
      );
  }  
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, { retrieveProducts })(ProductsList);
