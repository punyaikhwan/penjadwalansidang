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

const responseGoogle = (response) => {
  console.log(response);
}

class App extends Component {
  render() {
    // console.log(googleLoginUrl)
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
            <RaisedButton
              href="https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=1031302495796-7vb2i3hqj2q5o632ggreuca6cvsuvjn9.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F"
              labelPosition="before"
              target="_self"
              label="Login with Google"
              labelColor="#fff"
              backgroundColor="#2196F3"
              style={{height: 50}}
              icon={<FontIcon className="muidocs-icon-custom-github" />}
            />
            <div className="loginBtnContainer">

            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
