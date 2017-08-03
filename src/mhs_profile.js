import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import './mahasiswa.css';
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
import imgProfile from './public/images/imgprofile.jpg';

class timta_mng_pasangan extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBar
          title="Halaman Mahasiswa - Jadwal Sidang"
          iconElementLeft={
            <IconButton tooltip="Menu" onClick = {()=>this.handleToggle()}>
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
            <Col md="3" xs="12">
              <img src={imgProfile} className="imgProfileBig"/>
            </Col>
            <Col md="9" xs="12">
              <Card className="infoProfile">
                <CardTitle title="Ikhwanul Muslimin"/>
                <CardText>
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                      <TableRow>
                        <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                        <TableRowColumn>13514020</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn className="attributeTable">Email</TableRowColumn>
                        <TableRowColumn>ikhwan.m1996@gmail.com</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardText>
              </Card>
            </Col>
          </Col>
          <Col md="12" xs="12">
            <Card>
              <CardTitle title="Info Tugas Akhir"/>
              <CardText>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Judul Tugas Akhir</TableRowColumn>
                      <TableRowColumn>Implementasi X untuk YYYYY</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Pembimbing</TableRowColumn>
                      <TableRowColumn>Rinaldi Munir</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Ruang</TableRowColumn>
                      <TableRowColumn>7601</TableRowColumn>
                    </TableRow>
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
        <IconButton tooltip="Tutup" onClick = {()=>this.handleClose()}>
          <i className="material-icons" style={{color: 'white'}}>close</i>
        </IconButton>
          <div className="userProfile">
            <Row>
              <Col md="3" xs="2">
                <img src={imgProfile} className="imgProfile"/>
              </Col>
              <Col md="9" xs="10" className="textProfile">
                <Row>
                  <Col className="nameProfile">Ikhwanul Muslimin</Col>
                  <Col className="emailProfile">ikhwan.m1996@gmail.com</Col>
                </Row>
              </Col>
            </Row>
          </div>
          <hr/>
          <p className="menuTitle">Jadwal</p>
          <MenuItem insetChildren={true} href="/mhs_jadwal_seminarKP">Seminar KP</MenuItem>
          <MenuItem insetChildren={true} href="/mhs_jadwal_seminarTA1">Seminar TA 1</MenuItem>
          <MenuItem insetChildren={true} href="/mhs_jadwal_seminarTA2">Seminar TA 2</MenuItem>
          <MenuItem insetChildren={true} href="/mhs_jadwal_sidangTA">Sidang Akhir</MenuItem>
          <hr/>
          <MenuItem style={{backgroundColor:'#b0bec5'}} >Profil</MenuItem>

          <br/>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default timta_mng_pasangan;
