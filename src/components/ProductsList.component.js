import React, { Component, } from "react";
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { retrieveProducts, deleteProduct, } from "../slices/products"; // data apis
import { truncate } from "../common/utils";   //truncate text
import { withRouter } from '../common/with-router'; //hack to support navigate issue

// render all product lists in a table view
class ProductsList extends Component {
  constructor(props) {
    super(props);    
    this.confirmDelete = this.confirmDelete.bind(this);

    this.editProduct = this.editProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    }

  componentDidMount() {
    this.props
      .retrieveProducts();
    }
 
  // Confirmation box before deleting a product
  confirmDelete = (product, index) => {
    confirmAlert({
      title: 'Are you sure to delete the product:',
      message: product.name,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.removeProduct(product.id)
        },
        {
          label: 'No',
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],      
      });
    }

  // Remove product based on id: provided and fetch new data 
  removeProduct(id){    
    this.props
      .deleteProduct({id: id})
      .then(() => {
        this.props.retrieveProducts();
      })
      .catch((e) => {
        console.log(e);
      });
    }

  // Product edit navigation button
  editProduct(product) {
    this.props.router.navigate('/product/edit/' + product);
    }


  render() {   
    const { products } = this.props;    
    return (
      // Accessible table to list data in tabular form
      <TableContainer component={Paper}>
      <Table class="product-list" sx={{ minWidth: 650 }} aria-label="Product list">
        <TableHead class="table-header">
          <TableRow>
            <TableCell >Product ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Colour</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.name}>
              <TableCell 
                onClick={() => this.props.router.navigate('/products/' + product.id)}>{product.product_id}</TableCell>                  
              <TableCell component="th" scope="row"
                onClick={() => this.props.router.navigate('/products/' + product.id)}>
                {product.name}
              </TableCell>
              <TableCell
                onClick={() => this.props.router.navigate('/products/' + product.id)}>{ truncate(product.description) }</TableCell> 
              <TableCell
                onClick={() => this.props.router.navigate('/products/' + product.id)}>{product.colour}</TableCell>
              <TableCell
                onClick={() => this.props.router.navigate('/products/' + product.id)}>{product.size_display}</TableCell>
              <TableCell>  
                <IconButton aria-label="delete" color="primary" onClick={() => this.confirmDelete(product, index)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" color="primary" onClick={() => this.editProduct(product.id)}>
                  <EditIcon />
                </IconButton>                    
                                                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>        
      );
    }  
  }
const mapStateToProps = (state) => {
  return {
    products: state.products,
    };
  };

export default connect(mapStateToProps, { retrieveProducts, deleteProduct })(withRouter(ProductsList));
