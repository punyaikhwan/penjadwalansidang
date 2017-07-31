import React, { Component } from 'react';
import logo from './public/images/logo.png';
import googleLogo from './public/images/googleLogo.png'
import './App.css';
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class mngUser extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Appbar style={{height: 120}}>
          <p style={{fontFamily: "Lato", fontSize: 30, paddingTop: 20, paddingLeft: 20}}>Studi Teknik Informatika</p>
          <p style={{fontFamily: "Lato", fontSize: 20, paddingLeft: 20}}>Aplikasi Penjadwalan Sidang</p>
        </Appbar>
        <div className="container">
          <img src={logo} className="logoApp" />
          <div className="loginBtnContainer">
            <Row>
            <Col><img src={googleLogo} className="googleLogo"/></Col>
            <Col><Button color="primary" className="loginBtn"> Login with Google</Button></Col>
            </Row>
          </div>
        </div>
      </Container>
    );
  }
}

export default mngUser;
