import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';

import {
    FormControl,
    TextField,
    Select,
    Button,
    MenuItem,
    Grid,
    } from '@mui/material';

import { 
    getProduct, 
    updateProduct,
    createProduct 
    } from "../slices/products"; // data apis

import { withRouter } from '../common/with-router'; //hack to support navigate issue
import ProductsDataService from "../services/product.services";
/**
 * This class add new products and edit existing if id is provided.
 * 
 */
class AddEditProduct extends Component {

  constructor(props) {
    super(props);
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // capture the state change
    this.state = {
            id: null,
            product_id: null,
            name: "",
            description: "",
            colour: "",
            size: "1"
        };
    }


componentDidMount() {
    if (this.props.router.params.id){
        this.props
            .getProduct({id: this.props.router.params.id});
        ProductsDataService.get(this.props.router.params.id)
        .then((response) => {
            this.setState(
                response.data,
            );
            console.log(response.data);
            })
            .catch((e) => {
            console.log(e);
            });
        }
    }


// Add new product to the product list
newProduct(event) {
    event.preventDefault();
    const { product_id, name, description, colour, size, size_display } = this.state; 
    
    this.props
        .createProduct({ product_id, name, description, colour, size, size_display })
        .unwrap()
        .then((data) => {
            this.setState({
                id: data.id,
                product_id: data.product_id,
                name: data.name,
                description: data.publdescriptionshed,
                colour: data.colour,
                size: data.size,
                size_display: data.size_display,
                });
            confirmAlert({
                title: 'Product has been saved successfully!',
                message: data.name,
                buttons: [
                    {
                    label: 'OK',
                    onClick: () => this.props.router.navigate('/products')
                    }
                ],
                closeOnEscape: false,
                closeOnClickOutside: false,
                });
            })
            .catch((e) => {
                alert(e.message);
                console.log(e);
                });      
    }


// Perform update current or existing product
updateCurrentProduct(event) {
    event.preventDefault();
    const { id, product_id, name, description, colour, size, size_display } = this.state; 
    this.props
      .updateProduct({ id: id, data: this.state })
      .unwrap()
      .then((data) => {
        this.setState({
          id: data.id,
          product_id: data.product_id,
          name: data.name,
          description: data.publdescriptionshed,
          colour: data.colour,
          size: data.size,
          size_display: data.size_display,
          });
        confirmAlert({
            title: 'Product has been saved successfully!',
            message: data.name,
            buttons: [
              {
                label: 'OK',
                onClick: () => this.props.router.navigate('/products')
              }
            ],
            closeOnEscape: false,
            closeOnClickOutside: false,
            });
        })
        .catch((e) => {
            alert(e.message);
            console.log(e);
            });      
    }


// Handle input change and set values for state data
handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
        [name]: value,
        });
    }


// Render current state based on if product is present or new one requires to be entered
render() {
    const currentProduct = this.state;    
    return (
        <>
        <form onSubmit={currentProduct.id ? this.updateCurrentProduct : this.newProduct}>
            <Grid container alignItems="center" justify="center" direction="column" >
                <Grid item>
                <TextField
                    id="product_id"
                    name="product_id"
                    label="Product ID"
                    value={
                        currentProduct.product_id ? currentProduct.product_id : ""
                        }
                    type="text"
                    margin="dense"
                    onChange={this.handleInputChange}/>
                    </Grid>
                <Grid item>
                    <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    value={
                        currentProduct.name ? currentProduct.name : ""
                        }
                    margin="dense"
                    onChange={this.handleInputChange}/>
                    </Grid>
                <Grid item>
                    <TextField
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    value={
                        currentProduct.description ? currentProduct.description : ""
                        }
                    margin="dense"
                    multiline
                    minRows={4}
                    maxRows={8}                      
                    onChange={this.handleInputChange}/>
                    </Grid>
                <Grid item>
                    <TextField
                    id="colour"
                    name="colour"
                    label="Colour"
                    type="text"
                    value={
                        currentProduct.colour ? currentProduct.colour : ""
                        }
                    margin="dense"
                    onChange={this.handleInputChange}/>
                    </Grid>                    
                <Grid item>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                        <Select
                            value={
                                currentProduct.size ? currentProduct.size : "1"
                                }
                            name="size"
                            margin="dense"
                            onChange={this.handleInputChange}>
                            <MenuItem key="Small" value={1}>
                                Small
                            </MenuItem>
                            <MenuItem key="Medium" value={2}>
                                Medium
                            </MenuItem>
                            <MenuItem key="Large" value={3}>
                                Large
                            </MenuItem>
                            </Select>                     
                        </FormControl>
                    </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" 
                            type="submit" style={{
                            backgroundColor: "green",
                            margin: "5px"
                        }}>
                           {currentProduct.id ? "Update Product" : "Save Product"}
                        </Button>
                    </Grid>                                                     
            </Grid>
        </form>
        </>
        );
        }
    }

export default connect(null, { getProduct, updateProduct, createProduct })(withRouter(AddEditProduct));