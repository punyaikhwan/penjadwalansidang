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
import imgProfile from '../../scss/public/images/imgprofile.jpg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class mhs_profile extends Component {

  constructor(props) {
    super(props);
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

  handleToggle() {this.setState({open: !this.state.open})};

  handleClose() {this.setState({open: false})};

  render() {
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
                <CardTitle title={this.state.dataUser.nama}/>
                <CardText>
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                      <TableRow>
                        <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                        <TableRowColumn>{this.state.dataUser.nim}</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn className="attributeTable">Email</TableRowColumn>
                        <TableRowColumn>{this.state.dataUser.email}</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardText>
              </Card>
              <br/>
            </Col>
          </Col>
          <Col md="12" xs="12">
            <Card>
              <CardTitle title="Info Kerja Praktik"/>
              <CardText>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Kelompok</TableRowColumn>
                      <TableRowColumn>{this.state.dataUser.dataKP.id}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Topik Kerja Praktik</TableRowColumn>
                      <TableRowColumn>{this.state.dataUser.dataKP.topik}</TableRowColumn>
                    </TableRow>
                    {this.state.dataUser.dataKP.dosen.map((item, i) => (
                    <TableRow>
                      <TableRowColumn className="attributeTable">{"Pembimbing "+(i+1)}</TableRowColumn>
                      <TableRowColumn>{item}</TableRowColumn>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardText>
            </Card>
            <br/>
            <Card>
              <CardTitle title="Info Tugas Akhir"/>
              <CardText>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Topik Tugas Akhir</TableRowColumn>
                      <TableRowColumn>{this.state.dataUser.dataTA.topik}</TableRowColumn>
                    </TableRow>
                    {this.state.dataUser.dataTA.dosenPembimbing.map((item, i) => (
                    <TableRow>
                      <TableRowColumn className="attributeTable">{"Pembimbing "+(i+1)}</TableRowColumn>
                      <TableRowColumn>{item}</TableRowColumn>
                    </TableRow>
                    ))}
                    {this.state.dataUser.dataTA.dosenPengujiTA1.map((item, i) => (
                    <TableRow>
                      <TableRowColumn className="attributeTable">{"Penguji "+(i+1)+ " Seminar TA1"}</TableRowColumn>
                      <TableRowColumn>{item}</TableRowColumn>
                    </TableRow>
                    ))}
                    {this.state.dataUser.dataTA.dosenPengujiAkhir.map((item, i) => (
                    <TableRow>
                      <TableRowColumn className="attributeTable">{"Penguji "+(i+1)+ " Sidang Akhir"}</TableRowColumn>
                      <TableRowColumn>{item}</TableRowColumn>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardText>
            </Card>
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
  }
}

function mapStateToProps(state) {
    return {
        userInfo: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({

    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(mhs_profile);
