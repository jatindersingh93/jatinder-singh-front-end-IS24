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

import { getProduct, updateProduct } from "../slices/products"; // data apis

import { withRouter } from '../common/with-router'; //hack to support navigate issue
import ProductsDataService from "../services/product.services";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.updateCurrentProduct = this.updateCurrentProduct.bind(this);
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

componentDidMount() {
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

updateCurrentProduct(event) {
    event.preventDefault();
    const { id, product_id, name, description, colour, size } = this.state; 
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
        const currentProduct = this.state;    
        return (
            <>
            <form onSubmit={this.updateCurrentProduct}>
                <Grid container alignItems="center" justify="center" direction="column" >
                    <Grid item>
                    <TextField
                        id="product_id"
                        name="product_id"
                        label="Product ID"
                        value={
                            currentProduct.product_id
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
                                    currentProduct.size ? currentProduct.size : 1
                                    }
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
                        <Button disabled={!currentProduct.product_id} variant="contained" color="primary" 
                                type="submit" style={{
                                backgroundColor: "green",
                                margin: "5px"
                            }}>
                                Update Product
                            </Button>
                        </Grid>                                                     
                </Grid>
            </form>
            </>
            );
        }
    }

export default connect(null, { getProduct, updateProduct })(withRouter(EditProduct));