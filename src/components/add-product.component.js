import React, { Component, useState } from "react";
import { connect } from "react-redux";

import {
    FormControl,
    FormLabel,
    FormControlLabel,
    TextField,
    Select,
    FormGroup,
    Button,
    MenuItem,
    Grid
} from '@mui/material';
//import asyncValidate from './asyncValidate'

import { 
    retrieveProducts, 
    deleteProduct, 
    createProduct } from "../slices/products"; // data apis

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.setFormValues ={}
    this.formValues = {}
    this.state = {
      id: null,
      product_id: "",
      name: "",
      description: "",
      colour: "",
      size: "",
      };
    }
  //const [formValues, setFormValues] = useState(initialValues);

  saveProduct() {
    const { title, description } = this.state;

    this.props
      .createProduct({ title, description })
      .unwrap()
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newProduct(event) {
    event.preventDefault();
    debugger
    console.log('jatinder');
    const { product_id, name, description, colour, size } = this.state;   
    //console.log(formValues); 
    this.setState({
      id: null,
      product_id: "",
      name: "",
      description: "",      
      colour: "",
      size: "",
      });
    }

  handleInputChange(e) {
    // console.log('jatinder')
    // debugger
    const { name, value } = e.target;
    // this.setState({
    //     [name]: value,        
    //     });    
    this.setFormValues({
        ...formValues,
        [name]: value,
        });
    }

render() {
    const [formValues, setFormValues] = useState(this.state);
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
                    onChange={this.handleInputChange}/>
                    </Grid>
                <Grid item>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      type="text"/>
                    </Grid>
                <Grid item>
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      type="text"/>
                    </Grid>
                <Grid item>
                    <TextField
                      id="colour"
                      name="colour"
                      label="Colour"
                      type="text"/>
                    </Grid>                    
                <Grid item>
                    <FormControl>
                        <Select
                            name="country">
                            <MenuItem key="canada" value="Canada">
                                Canada
                            </MenuItem>
                            <MenuItem key="japan" value="Japan">
                                Japan
                            </MenuItem>
                            <MenuItem key="germany " value="Germany">
                                Germany
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
                            Submit
                        </Button>
                    </Grid>                                                     
            </Grid>
        </form>
        </>
    );
  }
}

export default connect(null, { createProduct })(AddProduct);