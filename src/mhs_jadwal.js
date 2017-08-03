import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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

        <p className="tableTitle">Jadwal Sidang Anda</p>
        <br/>
        <Row className="infoSidang">
          <Col md="6" xs="12">
            <Card>
              <CardTitle title="Rincian Anda"/>
              <CardText>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Topik</TableRowColumn>
                      <TableRowColumn>Implementasi Algoritma X untuk YY</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Nama</TableRowColumn>
                      <TableRowColumn>Ikhwanul Muslimin</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                      <TableRowColumn>13514020</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Pembimbing 1</TableRowColumn>
                      <TableRowColumn>Rinaldi Munir</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Pembimbing 2</TableRowColumn>
                      <TableRowColumn>-</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardText>
            </Card>
          </Col>
          <Col md="6" xs="12">
            <Card>
              <CardTitle title="Jadwal Anda"/>
              <CardText>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Tanggal Sidang</TableRowColumn>
                      <TableRowColumn>Senin, 31 Juli 2017</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Waktu</TableRowColumn>
                      <TableRowColumn>08.00-09.00</TableRowColumn>
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
          <MenuItem insetChildren={true} href="/mhs_jadwal_seminarKP" style={{backgroundColor:'#b0bec5'}}>Seminar KP</MenuItem>
          <MenuItem insetChildren={true} href="/mhs_jadwal_seminarTA1">Seminar TA 1</MenuItem>
          <MenuItem insetChildren={true} href="/mhs_jadwal_seminarTA2">Seminar TA 2</MenuItem>
          <MenuItem insetChildren={true} href="/mhs_jadwal_sidangTA">Sidang Akhir</MenuItem>
          <hr/>
          <MenuItem href="/mhs_profile">Profil</MenuItem>

          <br/>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default timta_mng_pasangan;
