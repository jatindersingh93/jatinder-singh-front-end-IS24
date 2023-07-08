import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';

import {
    FormControl,
    FormLabel,
    FormControlLabel,
    TextField,
    Select,
    FormGroup,
    Button,
    MenuItem,
    Grid,
    InputLabel
} from '@mui/material';

import { 
    retrieveProducts, 
    deleteProduct, 
    createProduct } from "../slices/products"; // data apis

import { withRouter } from '../common/with-router'; //hack to support navigate issue

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.newProduct = this.newProduct.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      id: null,
      product_id: "",
      name: "",
      description: "",
      colour: "",
      size: undefined,
      };
    }

  newProduct(event) {
    event.preventDefault();
    const { product_id, name, description, colour, size } = this.state; 
    
    this.props
      .createProduct({ product_id, name, description, colour, size })
      .unwrap()
      .then((data) => {
        this.setState({
          id: data.id,
          product_id: data.product_id,
          name: data.name,
          description: data.publdescriptionshed,
          colour: data.colour,
          size: data.size,
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
    render() {
        return (
            <>
            <form onSubmit={this.newProduct}>
                <Grid container alignItems="center" justify="center" direction="column" >
                    <Grid item>
                    <TextField
                        id="product_id"
                        name="product_id"
                        label="Product ID"
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
                        margin="dense"
                        onChange={this.handleInputChange}/>
                        </Grid>
                    <Grid item>
                        <TextField
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
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
                        margin="dense"
                        onChange={this.handleInputChange}/>
                        </Grid>                    
                    <Grid item>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                            <Select
                                value={1}
                                name="size"
                                margin="dense"
                                onChange={this.handleInputChange}>
                                <MenuItem key="small" value={1}>
                                    Small
                                </MenuItem>
                                <MenuItem key="medium" value={2}>
                                    Medium
                                </MenuItem>
                                <MenuItem key="large" value={3}>
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
                                Save Product
                            </Button>
                        </Grid>                                                     
                </Grid>
            </form>
            </>
            );
        }
    }

export default connect(null, { createProduct })(withRouter(AddProduct));