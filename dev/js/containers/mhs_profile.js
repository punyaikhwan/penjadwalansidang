import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import '../../scss/mahasiswa.scss';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/student.PNG';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout} from '../actions/auth/logout'
import {fetchProfile} from '../actions/user/fetch-mahasiswa-profile'
import {Router, Redirect} from 'react-router'

class mhs_profile extends Component {

  constructor(props) {
    super(props);
    this.props.fetchProfile(this.props.userInfo.NIM);
    console.log(this.props);
    this.state = {
      open: false,
      dataUser: {
        nama: "Ikhwanul Muslimin",
        nim: 13514020,
        email: "13514020@std.stei.itb.ac.id",
        dataKP: {
          id: 1,
          topik: "Implementasi X untuk Y",
          dosen: ['Rinaldi Munir']
        },
        dataTA: {
          topik: "Pemanfaatan Algoritma X untuk Y",
          dosenPembimbing: ['Rinaldi Munir', 'Mesayu'],
          dosenPengujiTA1: ['Inggriani Liem', 'Bayu Hendrajaya'],
          dosenPengujiAkhir: ['Dosen X', 'Dosen Y']
        }
      }
    };
  }


  componentWillUpdate(){
    let daftarPembimbing = []
    let daftarPenguji = []
    let daftarAkhir = []

    if(this.props.profileInfo[0])
    {
      for(var i=0; i<this.props.profileInfo[0].pembimbing.length; i++){
      daftarPembimbing.push(this.props.profileInfo[0].pembimbing.user.nama)
      }
      for(var i=0; i<this.props.profileInfo[0].penguji.length; i++){
        daftarPenguji.push(this.props.profileInfo[0].penguji.user.nama)
      }
      for(var i=0; i<this.props.profileInfo[0].akhir.length; i++){
        daftarAkhir.push(this.props.profileInfo[0].akhir.user.nama)
      }
    }
    
    this.state = {
      open: false,
      dataUser: {
        nama: this.props.profileInfo[0]?this.props.profileInfo[0].nama:'-' ,
        nim: this.props.profileInfo[0]?this.props.profileInfo[0].NIM:'-',
        email: this.props.profileInfo[0]?this.props.profileInfo[0].Email:'-',
        dataKP: {
          id: 1,
          topik: "Implementasi X untuk Y",
          dosen: ['Rinaldi Munir']
        },
        dataTA: {
          topik: this.props.profileInfo[0]?this.props.profileInfo[0].TA[0].topik:'-',
          dosenPembimbing: daftarPembimbing,
          dosenPengujiTA1: daftarPenguji,
          dosenPengujiAkhir: daftarAkhir
        }
      }
    };
  }


  handleToggle() {this.setState({open: !this.state.open})};

  handleClose() {this.setState({open: false})};

    handleLogout(){
        this.props.logout();
        window.location.href = "/";
    }

    renderContent(){
        if(this.props.userInfo.peran == 0){
            return (
                <MuiThemeProvider>
                  <div>
                    <AppBar
                        title="Halaman Mahasiswa - Jadwal Sidang"
                        iconElementLeft={
                          <IconButton onClick = {()=>this.handleToggle()}>
                            <i className="material-icons" style={{color: 'white'}}>menu</i>
                          </IconButton>
                        }
                        iconElementRight={
                          <RaisedButton
                              label="Logout"
                              backgroundColor="#F44336"
                              labelColor= "#fff"
                              onTouchTap = {()=>this.handleLogout()}
                          />
                        }
                    />

                    <p className="tableTitle">Profil Anda</p>
                    <br/>
                    <Row className="infoSidang">
                      <Col md="12" xs="12">
                        <Col md="3" xs="12" style={{alignItems: 'center', textAlign: 'center'}}>
                          <img src={imgProfile} className="imgProfileBig"/>
                        </Col>
                        <Col md="9" xs="12">
                          <Card className="infoProfile">
                            <CardTitle title={this.props.profileInfo.nama}/>
                            <CardText>
                              <Table selectable={false}>
                                <TableBody displayRowCheckbox={false}>
                                  <TableRow>
                                    <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                                    <TableRowColumn>{this.props.profileInfo.NIM}</TableRowColumn>
                                  </TableRow>
                                  <TableRow>
                                    <TableRowColumn className="attributeTable">Email</TableRowColumn>
                                    <TableRowColumn>{this.props.profileInfo.email}</TableRowColumn>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </CardText>
                          </Card>
                          <br/>
                        </Col>
                      </Col>
                      <Col md="12" xs="12">
                        <br/>
                        {this.props.profileInfo.TA !== undefined &&
                        <Card>
                          <CardTitle title="Informasi Tugas Akhir"/>
                          <CardText>
                            <Table selectable={false}>
                              <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                  <TableRowColumn className="attributeTable">Topik Tugas Akhir</TableRowColumn>
                                  <TableRowColumn>{this.props.profileInfo.TA.topik}</TableRowColumn>
                                </TableRow>
                                  {this.props.profileInfo.TA.pembimbing.map((item, i) => (
                                      <TableRow>
                                        <TableRowColumn className="attributeTable">{"Pembimbing "+(i+1)}</TableRowColumn>
                                        <TableRowColumn>{item}</TableRowColumn>
                                      </TableRow>
                                  ))}
                                  {this.props.profileInfo.TA.penguji.map((item, i) => (
                                      <TableRow>
                                        <TableRowColumn className="attributeTable">{"Penguji "+(i+1)+ " Seminar TA1"}</TableRowColumn>
                                        <TableRowColumn>{item}</TableRowColumn>
                                      </TableRow>
                                  ))}
                                  {this.props.profileInfo.TA.akhir.map((item, i) => (
                                      <TableRow>
                                        <TableRowColumn className="attributeTable">{"Penguji "+(i+1)+ " Sidang Akhir"}</TableRowColumn>
                                        <TableRowColumn>{item}</TableRowColumn>
                                      </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </CardText>
                        </Card>
                        }
                      </Col>
                    </Row>
                    <Drawer
                        docked={false}
                        width={400}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                      <div className="userProfile">
                        <Row>
                          <Col md="3" xs="2">
                            <img src={imgProfile} className="imgProfile"/>
                          </Col>
                          <Col md="9" xs="10" className="textProfile">
                            <Row>
                              <Col className="nameProfile">{this.props.userInfo.nama}</Col>
                              <Col className="emailProfile">{this.props.userInfo.email}</Col>
                              <Col className="emailProfile">{"Mahasiswa"}</Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                      <hr/>
                      <MenuItem insetChildren={true} href="/mhs_jadwal">Jadwal</MenuItem>
                      <MenuItem insetChildren={true} style={{backgroundColor:'#b0bec5'}} href="/mhs_profile">Profil</MenuItem>

                      <br/>
                    </Drawer>
                  </div>
                </MuiThemeProvider>
            );
        } else if(this.props.userInfo.peran == 1){
            return(
                <div>
                  <Redirect to="/dosen_calendar"/>
                </div>
            )
        }
        else if(this.props.userInfo.peran == 2){
            return(
                <div>
                  <Redirect to="/timta_mng_user"/>
                </div>
            )
        }
        else{
            return(
                <div>
                  <Redirect to="/"/>
                </div>
            )

        }
    }

    render() {
      return this.renderContent();
  }
}

function mapStateToProps(state) {
    return {
        userInfo: state.activeUser,
        profileInfo: state.profile
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
      logout: logout,
      fetchProfile: fetchProfile
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(mhs_profile);
