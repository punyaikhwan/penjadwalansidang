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
import {checkToken} from '../actions/auth/check-token'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Router, Redirect} from 'react-router'

const responseGoogle = (response) => {
  console.log(response);
}

// const clientID = "806339176753-cmb1mv9g8itmir0p4ucqh0ibuhbl6s0k.apps.googleusercontent.com"; //Ikhwan
// const clientID = "1031302495796-7vb2i3hqj2q5o632ggreuca6cvsuvjn9.apps.googleusercontent.com"; //Malik CLI
const clientID = "1031302495796-qndkfqd9b7lngq820um04pdorudtvj9t.apps.googleusercontent.com";

class App extends Component {
  componentDidMount(){
    console.log("wawa", this.props.location)
  }

  // getUser(token){
  //   return axios.post(nodeURL+'/getUserInfo', {
  //     token: token
  //   })
  // }

  render() {
    // console.log(googleLoginUrl)
    if(this.props.location.search.length > 10){


      let token = this.props.location.search.substring(6)
      let tokenlagi = token.substring(0,token.length)
      console.log(tokenlagi)
      this.props.checkToken(tokenlagi)

      if(this.props.check){
          console.log("PEran ",this.props.user.peran)
          if (this.props.user.peran == 2){
              return(
                  <div>
                      <Redirect to="/timta_mng_user"/>
                  </div>
              )
          } else if (this.props.user.peran == 1) {
              return (
                  <div>
                      <Redirect to="/dosen_calendar"/>
                  </div>
              )
          } else if (this.props.user.peran == 0) {
              return (
                  <div>
                      <Redirect to="/mhs_jadwal"/>
                  </div>
              )
          }

      } else{
          return(
              <div><script>
                  window.alert('Anda tidak memiliki izin akses.')
                  window.location.href='/';
              </script></div>
          )

      }

    }


    else {
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
                      href={"https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id="+clientID+"&redirect_uri=http%3A%2F%2Fpplk2e.if.itb.ac.id%2F"}
                      labelPosition="before"
                      target="_self"
                      label="Masuk dengan Google"
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
        )
    }

  }
}
function mapStateToProps(state) {
    return {
        check: state.checkToken,
        user: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({checkToken:checkToken}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
