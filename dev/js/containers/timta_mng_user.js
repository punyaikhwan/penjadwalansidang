import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import '../../scss/timTA.scss';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/imgprofile.jpg';

class timta_mng_user extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle(){
    this.setState({open: !this.state.open})
  };

  handleClose(){this.setState({open: false})};

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBar
          title="Dashboard Tim TA - Manajemen Pengguna"
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

        <p className="tableTitle">Daftar Pengguna</p>
        <div className="tableUser">
          <RaisedButton
            label="Tambah User"
            labelPosition="after"
            icon={<i className="material-icons" style={{color:'black'}}>create</i>}
          />
          <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Nama</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Oauth Token</TableHeaderColumn>
                <TableHeaderColumn>Refresh Token</TableHeaderColumn>
                <TableHeaderColumn>Expires at</TableHeaderColumn>
                <TableHeaderColumn>Peran</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox = {false}>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>Ikhwanul Muslimin</TableRowColumn>
                <TableRowColumn>ikhwan.m1996@gmail.com</TableRowColumn>
                <TableRowColumn>76rtgh86tvc2bc2rr43</TableRowColumn>
                <TableRowColumn>1/7iguyfvb278t6rvfbsdch</TableRowColumn>
                <TableRowColumn>45676543</TableRowColumn>
                <TableRowColumn>Mahasiswa</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton
                    label="Delete"
                    backgroundColor="#D50000"
                    labelColor="#fff"
                    labelPosition="after"
                    icon={<i className="material-icons" style={{color:'white'}}>delete</i>}
                  />
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Ikhwanul Muslimin</TableRowColumn>
                <TableRowColumn>ikhwan.m1996@gmail.com</TableRowColumn>
                <TableRowColumn>76rtgh86tvc2bc2rr43</TableRowColumn>
                <TableRowColumn>1/7iguyfvb278t6rvfbsdch</TableRowColumn>
                <TableRowColumn>45676543</TableRowColumn>
                <TableRowColumn>Mahasiswa</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton
                    label="Delete"
                    backgroundColor="#D50000"
                    labelColor="#fff"
                    labelPosition="after"
                    icon={<i className="material-icons" style={{color:'white'}}>delete</i>}
                  />
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Ikhwanul Muslimin</TableRowColumn>
                <TableRowColumn>ikhwan.m1996@gmail.com</TableRowColumn>
                <TableRowColumn>76rtgh86tvc2bc2rr43</TableRowColumn>
                <TableRowColumn>1/7iguyfvb278t6rvfbsdch</TableRowColumn>
                <TableRowColumn>45676543</TableRowColumn>
                <TableRowColumn>Mahasiswa</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton
                    label="Delete"
                    backgroundColor="#D50000"
                    labelColor="#fff"
                    labelPosition="after"
                    icon={<i className="material-icons" style={{color:'white'}}>delete</i>}
                  />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
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
          <MenuItem insetChildren={true} style={{backgroundColor:'#b0bec5'}}>Daftar Pengguna</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_pasangan">Daftar Pasangan</MenuItem>
          <br/>
          <p className="menuTitle">Manajemen Jadwal</p>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarKP">Seminar KP</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA1">Seminar TA 1</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA2">Seminar TA 2</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_sidangTA">Sidang Akhir</MenuItem>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default timta_mng_user;
