import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import '../../scss/timTA.scss';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
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
import {fetchUser} from '../actions/user/fetch-user'
import {newUser} from '../actions/user/new-user'
import {editUser} from '../actions/user/edit-user'
import {deleteUser} from '../actions/user/delete-user'

class timta_mng_user extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      listperan: ['Mahasiswa', 'Dosen', 'Tim TA'],
      modalTambahUser: false,
      modalEditUser: false,
      nama: "",
      email: "",
      peran: "",
      nim: "",
    };
  }

  componentDidMount(){
    this.props.fetchUser()
  }

  handleToggle(){this.setState({open: !this.state.open})};
  handleClose(){this.setState({open: false})};

  handleOpenTambahUser(){
    this.setState({nama: "", email: "", peran: "", dosen: ""});
    this.setState({modalTambahUser:true})
  };
  handleCloseTambahUser(){this.setState({modalTambahUser:false})};

  handleTambahUser() {
    this.props.newUser(this.state.nama, this.state.email, this.state.peran, this.state.nim)
    this.handleCloseTambahUser();
  }

  handleDeleteUser(i) {
    this.props.deleteUser(i.id);
  }

  handleOpenEditUser(user){
    this.setState({editedMhs: user.id});
    this.setState({nama: user.nama});
    this.setState({nim: user.NIM});
    this.setState({email: user.email});
    this.setState({peran: user.peran.toString()});
    this.setState({modalEditUser:true});
  };

  handleCloseEditUser(){this.setState({modalEditUser:false})};

  handleEditUser() {
    this.props.editUser(this.state.editedMhs, this.state.nama, this.state.email, this.state.peran, this.state.nim)
    this.handleCloseEditUser();
  }

  isEmpty(str) {
    return (str.length === 0)
  }

  isErrorEmail(str) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (str.length === 0 || !re.test(str))
  }

  handleChangeNama(event) {
    this.setState({nama: event.target.value});
  }

  handleChangeNIM(event) {
    this.setState({nim: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePeran(event, index, peran) {
    this.setState({peran});
  }

  render() {
    const actionsTambahUser = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseTambahUser()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleTambahUser()}
      />,
    ];

    const actionsEditUser = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseEditUser()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleEditUser()}
      />,
    ];

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
            onClick = {()=>this.handleOpenTambahUser()}
          />
          <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Nama</TableHeaderColumn>
                <TableHeaderColumn>NIM</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Refresh Token</TableHeaderColumn>
                <TableHeaderColumn>Peran</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox = {false}>
              {this.props.user.map((user, i) => (

                  <TableRow key={i}>

                  <TableRowColumn style={{width:3}}></TableRowColumn>
                  <TableRowColumn>{user.nama}</TableRowColumn>
                  <TableRowColumn>{user.NIM}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>{user.token}</TableRowColumn>
                  <TableRowColumn>{this.state.listperan[user.peran]}</TableRowColumn>
                      {user.nama !== "Ruangan" &&
                      <TableRowColumn>
                        <IconButton style={{color: 'blue'}} onClick={() => this.handleOpenEditUser(user)}>
                          <i className="material-icons">edit</i>
                        </IconButton>
                        <IconButton style={{color: 'red'}} onClick={() => this.handleDeleteUser(user)}>
                          <i className="material-icons">delete</i>
                        </IconButton>
                      </TableRowColumn>
                      }
                </TableRow>
              ))}
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

        <Dialog
          title="Tambah Pengguna"
          actions= {actionsTambahUser}
          modal={false}
          contentStyle={{width: 400}}
          open={this.state.modalTambahUser}
          onRequestClose={()=>this.handleCloseTambahUser()}
        >
          <TextField
            hintText="Masukkan nama"
            floatingLabelText="Nama Pengguna"
            floatingLabelFixed={true}
            errorText = {this.isEmpty(this.state.nama) ? "Tidak boleh kosong" : ""}
            onChange = {(event)=> this.handleChangeNama(event)}
            style = {{width: 350}}
          />
          <br />
          <TextField
            hintText="NIM (untuk mahasiswa)"
            floatingLabelText="NIM"
            floatingLabelFixed={true}
            onChange = {(event)=>this.handleChangeNIM(event)}
            style = {{width: 350}}
          />
          <br />
          <TextField
            hintText="Email (untuk login)"
            floatingLabelText="Email"
            floatingLabelFixed={true}
            errorText = {this.isErrorEmail(this.state.email) ? "Email tidak valid" : ""}
            onChange = {(event)=>this.handleChangeEmail(event)}
            style = {{width: 350}}
          />
          <br />
          <SelectField
            multiple={false}
            hintText="Select a name"
            value={this.state.peran}
            onChange={(event, index, peran)=>this.handleChangePeran(event, index, peran)}
            style = {{width: 350}}
          >
            <MenuItem
            insetChildren={true}
            value="0"
            primaryText="Mahasiswa"
            /><MenuItem
            insetChildren={true}
            value="1"
            primaryText="Dosen"
            /><MenuItem
            insetChildren={true}
            value="2"
            primaryText="Tim TA"
            />
          </SelectField>
        </Dialog>

        <Dialog
          title="Edit Pengguna"
          actions= {actionsEditUser}
          modal={false}
          contentStyle={{width: 400}}
          open={this.state.modalEditUser}
          onRequestClose={()=>this.handleCloseEditUser()}
        >
          <TextField
            hintText="Masukkan nama"
            defaultValue = {this.state.nama}
            floatingLabelText="Nama Pengguna"
            floatingLabelFixed={true}
            errorText = {this.isEmpty(this.state.nama) ? "Tidak boleh kosong" : ""}
            onChange = {(event)=> this.handleChangeNama(event)}
            style = {{width: 350}}
          />
          <br />
          <TextField
            hintText="NIM (untuk mahasiswa)"
            defaultValue = {this.state.nim}
            floatingLabelText="NIM"
            floatingLabelFixed={true}
            onChange = {(event)=>this.handleChangeNIM(event)}
            style = {{width: 350}}
          />
          <br />
          <TextField
            hintText="Email (untuk login)"
            defaultValue = {this.state.email}
            floatingLabelText="Email"
            floatingLabelFixed={true}
            errorText = {this.isErrorEmail(this.state.email) ? "Email tidak valid" : ""}
            onChange = {(event)=>this.handleChangeEmail(event)}
            style = {{width: 350}}
          />
          <br />
          <SelectField
            multiple={false}
            hintText="Select a name"
            defaultValue = {this.state.peran}
            value={this.state.peran}
            onChange={(event, index, peran)=>this.handleChangePeran(event, index, peran)}
            style = {{width: 350}}
          >
            <MenuItem
            insetChildren={true}
            value="0"
            primaryText="Mahasiswa"
            /><MenuItem
            insetChildren={true}
            value="1"
            primaryText="Dosen"
            /><MenuItem
            insetChildren={true}
            value="2"
            primaryText="Tim TA"
            />
          </SelectField>
        </Dialog>
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchUser:fetchUser,
        newUser: newUser,
        deleteUser: deleteUser,
        editUser: editUser,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(timta_mng_user);
