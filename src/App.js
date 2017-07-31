import React, { Component } from 'react';
import logo from './public/images/logo.png';
import googleLogo from './public/images/googleLogo.png';
import itbLogo from './public/images/itb.png'
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="barTop">
            <Row>
              <Col md="1" xs="1">
                <img src={itbLogo} className="logoItb"/>
              </Col>
              <Col md="11" xs="1">
                <p style={{fontFamily: "Lato", fontSize: 30, paddingTop: 20, paddingLeft: 20}}>Program Studi Teknik Informatika</p>
                <p style={{fontFamily: "Lato", fontSize: 20, paddingLeft: 20}}>Institut Teknologi Bandung</p>
              </Col>
            </Row>
          </div>

          <div className="container">
            <img src={logo} className="logoApp" />
            <p style={{fontFamily: "Lato", fontSize: 30, paddingTop: 20, paddingLeft: 20}}>APLIKASI PENJADWALAN SIDANG</p>
            <div className="loginBtnContainer">
              <RaisedButton
                href="/timta_mng_user"
                labelPosition="before"
                target="_self"
                label="Login with Google"
                labelColor="#fff"
                backgroundColor="#2196F3"
                style={{height: 50}}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
