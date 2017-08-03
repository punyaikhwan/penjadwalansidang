import React, { Component } from 'react';
import logo from '../../scss/public/images/logo.png';
import googleLogo from '../../scss/public/images/googleLogo.png';
import itbLogo from '../../scss/public/images/itb.png'
import '../../scss/App.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class not_found extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="containerNotFound">
            <p className="oops">Ooopss</p>
            <p className="forzerofor">404</p>
            <p className="notfound">Not Found!</p>
            <p style={{fontFamily: "Lato", fontSize: 30, paddingTop: 20, paddingLeft: 20}}>APLIKASI PENJADWALAN SIDANG</p>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default not_found;
