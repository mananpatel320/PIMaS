import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPR } from '../../actions/prActions';
import M from 'materialize-css';

class PR extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      deliveryTime: '',
      material: '',
      materialqty: 0,
      materials: [],
    };
  }

  componentDidMount() {
    window.$(document).ready(function () {
      window.$('.datepicker').datepicker({ format: 'yyyy-mm-dd' });
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newPR = {
      name: this.state.name,
      deliveryTime: this.state.deliveryTime,
      materials: this.state.materials,
    };
    this.props.addPR(newPR);
    this.props.history.push('/pr/allprs');
    M.toast({ html: 'PR submitted succesfully' });
  };

  addMaterial = (e, matname, matqty) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        name: prevState.name,
        deliveryTime: prevState.deliveryTime,
        materials: [
          ...prevState.materials,
          { materialName: matname, quantity: matqty, materialCode: 1111 },
        ],
      };
    });
  };

  render() {
    return (
      <Fragment>
        <div className='container'>
          <h4 className='flow-text red-text text-darken-1 center-align'>
            PENDING : <b>Unnamed Purchase Requistion</b>
          </h4>
          <div className='row'>
            <form className='col s12' noValidate onSubmit={this.onSubmit}>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    placeholder='Add title of PR'
                    id='name'
                    type='text'
                    className='validate'
                  ></input>
                  <label className='active' htmlFor='name'>
                    TITLE
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s6'>
                  <input
                    disabled
                    id='currentDate'
                    type='text'
                    value={
                      new Date().getDate() +
                      '-' +
                      (new Date().getMonth() + 1) +
                      '-' +
                      new Date().getFullYear()
                    }
                    className='validate'
                  ></input>
                  <label className='active' htmlFor='currentDate'>
                    DATE CREATED
                  </label>
                </div>
                <div className='input-field col s6'>
                  <input
                    placeholder='Select expected delivery date'
                    onChange={this.onChange}
                    value={this.state.deliveryTime}
                    id='deliveryTime'
                    type='text'
                    className='datepicker'
                  ></input>
                  <label className='active' htmlFor='deliveryTime'>
                    DELIVERY DATE
                  </label>
                </div>
              </div>
              <div className='row'>
                <button
                  className='waves-effect hoverable btn-small green col s4'
                  onClick={(e) =>
                    this.addMaterial(
                      e,
                      this.state.material,
                      parseInt(this.state.materialqty, 10)
                    )
                  }
                  style={{
                    height: '60px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                >
                  Add
                </button>
                <div className='input-field col s4'>
                  <input
                    onChange={this.onChange}
                    value={this.state.material}
                    placeholder='Add name of material'
                    id='material'
                    type='text'
                    className='validate'
                  ></input>
                  <label className='active' htmlFor='material'>
                    Material Name
                  </label>
                </div>
                <div className='input-field col s4'>
                  <input
                    onChange={this.onChange}
                    value={this.state.materialqty}
                    id='materialqty'
                    type='text'
                    className='validate'
                  ></input>
                  <label className='active' htmlFor='materialqty'>
                    Material qty
                  </label>
                </div>
              </div>
              <div className='row'>
                <table className='highlight centered'>
                  <thead>
                    <tr>
                      <th className='grey-text text-darken-1'>MATERIAL CODE</th>
                      <th className='grey-text text-darken-1'>MATERIAL NAME</th>
                      <th className='grey-text text-darken-1'>QUANTITY</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.materials.map((mat) => (
                      <tr>
                        <td>{mat.materialCode}</td>
                        <td>{mat.materialName}</td>
                        <td>{mat.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='row'>
                <div className='s12 center-align'>
                  <button
                    style={{
                      width: '140px',
                      borderRadius: '3px',
                      letterSpacing: '1.5px',
                    }}
                    type='submit'
                    className='waves-effect waves-light hoverable btn-small black'
                  >
                    Submit PR
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

PR.propTypes = {
  addPR: PropTypes.func.isRequired,
};

export default connect(null, { addPR })(withRouter(PR));
