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

import { retrieveProducts, deleteProduct, } from "../slices/products";
import { truncate } from "../common/utils";
import { withRouter } from '../common/with-router';

// render all product lists in a table view
class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.removeProduct = this.removeProduct.bind(this);

    this.state = {
      currentProduct: null,
      currentIndex: -1,
    };
  }
  componentDidMount() {
    this.props
      .retrieveProducts();
  }
  refreshData() {
    this.setState({
      currentProduct: null,
      currentIndex: -1,
    });
  }
  removeProduct(index){    
    this.props
      .deleteProduct({id: index})
      .then(() => {debugger
        //this.props.router.navigate('/');
        this.refreshData()
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  confirmDelete = (product, index) => {
    confirmAlert({
      title: product.name,
      message: 'Are you sure to delete.',
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

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index,
    });
  }        
  render() {   
    const { currentProduct, currentIndex } = this.state;
    const { products } = this.props;    
      return (
          <div className="list row">
                  <div className="col-md-6">
                    <h4>Tutorials List</h4>

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

                    <button
                      className="m-3 btn btn-sm btn-danger"
                      onClick={this.removeAllTutorials}
                    >
                      Remove All
                    </button>
                  </div>
                  <div className="col-md-6">
                    {currentProduct ? (
                      <div>
                        <h4>Tutorial</h4>
                        <div>
                          <label>
                            <strong>Title:</strong>
                          </label>{" "}
                          {currentProduct.name}
                        </div>
                        <div>
                          <label>
                            <strong>Description:</strong>
                          </label>{" "}
                          {currentProduct.description}
                        </div>

                        <Link
                          to={"/products/" + currentProduct.id}
                          className="badge badge-warning"
                        >
                          Edit
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                      </div>
                    )}
                  </div>
                </div>
        //   <TableContainer component={Paper}>
        //   <Table sx={{ minWidth: 650 }} aria-label="caption table">
        //     <TableHead>
        //       <TableRow>
        //         <TableCell>Product ID</TableCell>
        //         <TableCell align="right">Name</TableCell>
        //         <TableCell align="right">Description</TableCell>
        //         <TableCell align="right">Colour</TableCell>
        //         <TableCell align="right">Size</TableCell>
        //         <TableCell align="right">Actions</TableCell>
        //       </TableRow>
        //     </TableHead>
        //     <TableBody>
        //       {products.map((product, index) => (
        //         <TableRow key={product.name}>
        //           <TableCell align="right">{product.product_id}</TableCell>                  
        //           <TableCell component="th" scope="row">
        //             {product.name}
        //           </TableCell>
        //           <TableCell align="right">{ truncate(product.description) }</TableCell>
        //           <TableCell align="right">{product.colour}</TableCell>
        //           <TableCell align="right">{product.size}</TableCell>
        //           <TableCell align="right">  
        //             <IconButton aria-label="delete" color="primary" onClick={() => this.confirmDelete(product, index)}>
        //               <DeleteIcon />
        //             </IconButton>
        //             <IconButton aria-label="edit" color="primary" onClick={() => this.setActiveProduct(product, index)}>
        //               <EditIcon />
        //             </IconButton>                    
                                                   
        //           </TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        // </TableContainer>        
      );
  }  
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, { retrieveProducts, deleteProduct })(withRouter(ProductsList));
