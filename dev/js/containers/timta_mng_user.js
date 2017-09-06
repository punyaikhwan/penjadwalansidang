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
import imgProfile from '../../scss/public/images/admin.png';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchUser} from '../actions/user/fetch-user'
import {newUser} from '../actions/user/new-user'
import {editUser} from '../actions/user/edit-user'
import {deleteUser} from '../actions/user/delete-user'
import {logout} from '../actions/auth/logout'
import {Router, Redirect} from 'react-router'

class timta_mng_user extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      listperan: ['Mahasiswa', 'Dosen', 'Tim TA'],
      modalTambahUser: false,
      modalEditUser: false,
      modalConfirmDelete: false,
      selectedUser: "",
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
  handleOpenConfirmDelete(i){
    this.setState({selectedUser: i});
    this.setState({modalConfirmDelete:true})
  };
  handleCloseConfirmDelete(){this.setState({modalConfirmDelete:false})};

  handleDeleteUser() {
    this.props.deleteUser(this.state.selectedUser.id);
    this.handleCloseConfirmDelete();
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

    handleLogout(){
        this.props.logout();
        window.location.href = "/";
    }

    renderContent(){
        if(this.props.userInfo.peran == 0){
          <div>
            <Redirect to="/mhs_jadwal"/>
          </div>
        } else if(this.props.userInfo.peran == 1){
            return(
                <div>
                  <Redirect to="/dosen_calendar"/>
                </div>
            )
        }
        else if(this.props.userInfo.peran == 2){
            const actionsTambahUser = [
              <FlatButton
                  label="Batal"
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
                  label="Batal"
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

            const actionsConfirmDelete = [
              <FlatButton
                  label="Batal"
                  primary={true}
                  onClick={()=>this.handleCloseConfirmDelete()}
              />,
              <FlatButton
                  label="Hapus"
                  primary={true}
                  onClick={()=>this.handleDeleteUser()}
              />,
            ];
          return (
                <MuiThemeProvider>
                  <div>
                    <AppBar
                        title="Dashboard Tim TA - Manajemen Pengguna"
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
                              onTouchTap= {()=>this.handleLogout()}
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
                            <TableHeaderColumn>Akses Kalender</TableHeaderColumn>
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
                                  <TableRowColumn>{(user.token !== null && user.peran === 1) ? "OK" : (
                                      (user.token === null && user.peran === 1) ? <div style={{color: '#ff0000'}}>Belum</div> : "Tidak perlu"
                                  )}</TableRowColumn>
                                  <TableRowColumn>{this.state.listperan[user.peran]}</TableRowColumn>
                                    {user.nama !== "Ruangan" &&
                                    <TableRowColumn>
                                      <IconButton style={{color: 'blue'}} onClick={() => this.handleOpenEditUser(user)}>
                                        <i className="material-icons">edit</i>
                                      </IconButton>
                                      {user.email !== this.props.userInfo.email && 
                                      <IconButton style={{color: 'red'}} onClick={() => this.handleOpenConfirmDelete(user)}>
                                        <i className="material-icons">delete</i>
                                      </IconButton>
                                      }
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
                      <div className="userProfile">
                        <Row>
                          <Col md="3" xs="2">
                            <img src={imgProfile} className="imgProfile"/>
                          </Col>
                          <Col md="9" xs="10" className="textProfile">
                            <Row>
                              <Col className="nameProfile">{this.props.userInfo.nama}</Col>
                              <Col className="emailProfile">{this.props.userInfo.email}</Col>
                              <Col className="emailProfile">{"Tim TA"}</Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                      <hr/>
                      <p className="menuTitle">Manajemen Pengguna</p>
                      <MenuItem insetChildren={true} style={{backgroundColor:'#b0bec5'}} href="/timta_mng_user">Daftar Pengguna</MenuItem>
                      <MenuItem insetChildren={true} href="/timta_mng_pasangan_TA">Daftar Pasangan TA</MenuItem>
                      <br/>
                      <p className="menuTitle">Manajemen Jadwal</p>
                      <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA1">Seminar TA 1</MenuItem>
                      <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA2">Seminar TA 2</MenuItem>
                      <MenuItem insetChildren={true} href="/timta_mng_jadwal_sidangTA">Sidang Akhir</MenuItem>
                      <hr/>
                      <MenuItem insetChildren={true} href="/timta_allcalendars">Manajemen Kalender</MenuItem>
                      <MenuItem insetChildren={true} href="/timta_mng_ruangan">Manajemen Ruangan</MenuItem>
                    </Drawer>

                    <Dialog
                        title="Tambah Pengguna"
                        actions= {actionsTambahUser}
                        modal={false}
                        contentStyle={{width: 400}}
                        open={this.state.modalTambahUser}
                        onRequestClose={()=>this.handleCloseTambahUser()}
                    >
                      <SelectField
                          multiple={false}
                          hintText="Pilih peran"
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
                      <br/>
                      <TextField
                          hintText="Masukkan nama"
                          floatingLabelText="Nama Pengguna"
                          floatingLabelFixed={true}
                          errorText = {this.isEmpty(this.state.nama) ? "Tidak boleh kosong" : ""}
                          onChange = {(event)=> this.handleChangeNama(event)}
                          style = {{width: 350}}
                      />
                      <br />
                        {this.state.peran === '0' &&
                        <TextField
                            hintText="NIM (untuk mahasiswa)"
                            floatingLabelText="NIM"
                            floatingLabelFixed={true}
                            errorText = {this.isEmpty(this.state.nim)? "NIM tidak boleh kosong" : ""}
                            onChange = {(event)=>this.handleChangeNIM(event)}
                            style = {{width: 350}}
                        />
                        }
                      <br />
                      <TextField
                          hintText="Email (untuk login)"
                          floatingLabelText="Email"
                          floatingLabelFixed={true}
                          errorText = {this.isEmpty(this.state.email) ? "Email tidak boleh kosong" : (
                              this.isErrorEmail(this.state.email) ? "Email tidak valid" : "")}
                          onChange = {(event)=>this.handleChangeEmail(event)}
                          style = {{width: 350}}
                      />
                      <br />

                    </Dialog>

                    <Dialog
                        title="Edit Pengguna"
                        actions= {actionsEditUser}
                        modal={false}
                        contentStyle={{width: 400}}
                        open={this.state.modalEditUser}
                        onRequestClose={()=>this.handleCloseEditUser()}
                    >
                      <SelectField
                          multiple={false}
                          hintText="Pilih peran"
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
                        {this.state.peran === '0' &&
                        <TextField
                            hintText="NIM (untuk mahasiswa)"
                            defaultValue = {this.state.nim}
                            floatingLabelText="NIM"
                            floatingLabelFixed={true}
                            errorText = {this.isEmpty(this.state.nim)? "NIM tidak boleh kosong" : ""}
                            onChange = {(event)=>this.handleChangeNIM(event)}
                            style = {{width: 350}}
                        />
                        }
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
                    </Dialog>
                    <Dialog
                        title="Konfirmasi Hapus"
                        actions= {actionsConfirmDelete}
                        modal={false}
                        contentStyle={{width: 400}}
                        open={this.state.modalConfirmDelete}
                        onRequestClose={()=>this.handleCloseConfirmDelete()}
                    >
                      Anda yakin ingin menghapus pengguna ini?
                    </Dialog>
                  </div>
                </MuiThemeProvider>
            );
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
        user: state.user,
        userInfo: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchUser:fetchUser,
        newUser: newUser,
        deleteUser: deleteUser,
        editUser: editUser,
        logout: logout
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(timta_mng_user);
