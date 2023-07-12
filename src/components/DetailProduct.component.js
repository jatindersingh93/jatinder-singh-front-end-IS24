import React, { Component, } from "react";
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useParams } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    Button,
    } from '@mui/material';

import { deleteProduct, getProduct} from "../slices/products"; // data apis
import { truncate } from "../common/utils";   //truncate text
import { withRouter } from '../common/with-router'; //hack to support navigate issue
import ProductsDataService from "../services/product.services";

// render all product lists in a table view
class DetailProduct extends Component {  

  constructor(props) {
    super(props);    
    this.confirmDelete = this.confirmDelete.bind(this);

    this.editProduct = this.editProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.state = {
        currentProduct: {
            id: null,
            product_id: null,
            name: "",
            description: "",
            colour: "",
            size: undefined,
            }
        };
    }


  componentDidMount() {
    this.props
      .getProduct({id: this.props.router.params.id});
    ProductsDataService.get(this.props.router.params.id)
    .then((response) => {
        this.setState({
            currentProduct: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
        });
    }
  
  
  // Confirmation box before deleting a product
  confirmDelete = (id, name) => {
    confirmAlert({
      title: 'Are you sure to delete the product:',
      message: name,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.removeProduct(id)
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
        this.props.router.navigate('/products')
        })
      .catch((e) => {
        console.log(e);
        });
    }


  // Product edit navigation button redirect to the products edit page
  editProduct(product) {
    this.props.router.navigate('/product/edit/' + product);
    }

  
  // Render the Details product view using accessible table format
  render() {   
    const { product } = this.props;  
    const { currentProduct } = this.state;
    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Product list">
                <TableBody>
                    <TableRow>
                      <TableCell variant="head">Product ID</TableCell>
                      <TableCell align="right">{currentProduct.product_id}</TableCell>
                      </TableRow>
                    <TableRow>
                      <TableCell variant="head">Description</TableCell>
                      <TableCell align="right">{currentProduct.description}</TableCell>
                      </TableRow>
                    <TableRow>
                      <TableCell variant="head">Colour</TableCell>
                      <TableCell align="right">{currentProduct.colour}</TableCell>
                      </TableRow>
                    <TableRow>
                      <TableCell variant="head">Size</TableCell>
                      <TableCell align="right">{currentProduct.size_display}</TableCell>
                      </TableRow>                                                         
                    </TableBody>
                </Table>
            </TableContainer>  
            <div>
            <Button disabled={!currentProduct.product_id} 
              variant="contained" color="primary" 
              type="submit" style={{
              backgroundColor: "gray",
              margin: "5px"
              }} 
              onClick={() => this.confirmDelete(currentProduct.id, currentProduct.name)}>
              Delete Product
              </Button>            
              </div>  
            <div>
            <Button disabled={!currentProduct.product_id} 
              variant="contained" color="primary" 
              type="submit" style={{
              backgroundColor: "gray",
              margin: "5px"
              }}
              onClick={() => this.editProduct(currentProduct.id)}>
              Edit Product
              </Button>            
              </div>          
            </>
        );
    }  
  }

export default connect(null, { deleteProduct, getProduct })(withRouter(DetailProduct));
