import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import './timTA.css';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from './public/images/imgprofile.jpg';

class timta_mng_jadwal extends Component {

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
          title="Dashboard Tim TA - Manajemen Jadwal Seminar KP"
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

        <Row className="containerBody">
          <Col md="6" xs="12">
            <p className="tableTitle">Daftar Dosen</p>
            <Table fixedHeader={true}>
              <TableHeader displaySelectAll={false} enableSelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>No.</TableHeaderColumn>
                  <TableHeaderColumn>Nama</TableHeaderColumn>
                  <TableHeaderColumn>Izinkan Akses?</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>Desy Puji</TableRowColumn>
                  <TableRowColumn>Yes</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>2</TableRowColumn>
                  <TableRowColumn>Rinaldi Munir</TableRowColumn>
                  <TableRowColumn>Yes</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>Ayu Purwarianti</TableRowColumn>
                  <TableRowColumn>Yes</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>4</TableRowColumn>
                  <TableRowColumn>Saiful Akbar</TableRowColumn>
                  <TableRowColumn>Yes</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </Col>
          <Col md="6" xs="12">
          <p className="tableTitle">Daftar Mahasiswa</p>
          <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>No.</TableHeaderColumn>
                <TableHeaderColumn>Nama</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>Ikhwanul Muslimin</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Naufal Malik</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Hasna Nur Karimah</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Hendrikus Bimawan</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>5</TableRowColumn>
                <TableRowColumn>Febi Agil Ifdillah</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          </Col>
        </Row>
        <Row className="containerBody">
          <Col md="6" xs="12">
            <p className="tableTitle">Tambah kalender</p><br/>
            <TextField
              hintText="Tempel URL google kalender yang telah diizinkan untuk diakses Public."
              style={{width:500}}
            />
            <RaisedButton
              label="Tambah"
              backgroundColor="#2196F3"
              labelColor= "#fff"
            />
          </Col>
          <Col md="6" xs="12">
          <RaisedButton
            label="Jadwalkan!"
            backgroundColor="#2196F3"
            labelColor= "#fff"
            style={{marginLeft: 20, marginTop: 50}}
          />
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
          <p className="menuTitle">Manajemen Pengguna</p>
          <MenuItem insetChildren={true} href="/timta_mng_user">Daftar Pengguna</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_pasangan" >Daftar Pasangan</MenuItem>
          <br/>
          <p className="menuTitle">Manajemen Jadwal</p>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarKP" style={{backgroundColor:'#b0bec5'}}>Seminar KP</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA1">Seminar TA 1</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA2">Seminar TA 2</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_sidangTA">Sidang Akhir</MenuItem>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default timta_mng_jadwal;
