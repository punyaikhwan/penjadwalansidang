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
    this.state = {
      open: false,
      listperan: ['Mahasiswa', 'Dosen', 'Tim TA'],
      modalTambahUser: false,
      modalEditUser: false,
      nama: "",
      email: "",
      peran: "",
      dataUser: [
        {
          nama: "Ikhwanul Muslimin",
          email: "13514020@std.stei.itb.ac.id",
          access_token: "ghgxdschgvbjmnvngdcfgc",
          refresh_token: "1/7kjgvfcdvhgbjhgv",
          expires_at: 45678967,
          peran: 1
        },
        {
          nama: "Naufal Malik Rabbani",
          email: "13514052@std.stei.itb.ac.id",
          access_token: "gjgfhvnvngdcfgc",
          refresh_token: "1/7hjygtbhgbjhgv",
          expires_at: 4698967,
          peran: 0
        },
        {
          nama: "Nur Ulfa Maulidevi",
          email: "ulfa@informatika.org",
          access_token: "gnbbh454dcfgc",
          refresh_token: "1/4kjhnhgbjhgv",
          expires_at: 4876367,
          peran: 1
        },
        {
          nama: "Desy Puji",
          email: "desy@informatika.org",
          access_token: "gjhjgvcvkljuhgdcfgc",
          refresh_token: "1/5kjhgfvbnmjv",
          expires_at: 45609899,
          peran: 2
        }
      ]
    };
  }

  handleToggle(){this.setState({open: !this.state.open})};
  handleClose(){this.setState({open: false})};

  handleOpenTambahUser(){this.setState({modalTambahUser:true})};
  handleCloseTambahUser(){this.setState({modalTambahUser:false})};

  handleTambahUser() {
    let tempDataUser = this.state.dataUser;
    let tempUserBaru = {
      nama: this.state.nama,
      email: this.state.email,
      access_token: "",
      refresh_token: "",
      expires_at: null,
      peran: this.state.peran
    }
    tempDataUser.push(tempUserBaru);
    console.log("data User:",i," ", tempDataUser);
    this.setState({dataUser: tempDataUser});
  }

  handleDeleteUser(i) {
    let tempDataUser = this.state.dataUser;
    tempDataUser.splice(i,1);
    console.log("data User:",i," ", tempDataUser);
    this.setState({dataUser: tempDataUser});
  }

  handleOpenEditUser(i){
    this.setState({nama: this.state.dataUser[i].nama});
    this.setState({email: this.state.dataUser[i].email});
    this.setState({peran: this.state.dataUser[i].peran});
    this.setState({modalEditUser:true});
  };
  handleCloseEditUser(){this.setState({modalEditUser:false})};
  handleEditUser(i) {
    let tempDataUser = this.state.dataUser;
    tempDataUser[i].nama = this.state.user.nama;
    tempDataUser[i].email = this.state.user.email;
    tempDataUser[i].peran = this.state.user.peran;
    console.log("data User:",i," ", tempDataUser);
    this.setState({dataUser: tempDataUser});
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
        onClick={()=>this.handleEditUser(i)}
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
              {this.state.dataUser.map((user, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{i}</TableRowColumn>
                  <TableRowColumn>{user.nama}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>{user.access_token}</TableRowColumn>
                  <TableRowColumn>{user.refresh_token}</TableRowColumn>
                  <TableRowColumn>{user.expires_at}</TableRowColumn>
                  <TableRowColumn>{this.state.listperan[user.peran]}</TableRowColumn>
                  <TableRowColumn>
                      <IconButton style={{color:'blue'}}  onClick={()=>this.handleOpenEditUser(i)}>
                      <i className="material-icons">edit</i>
                      </IconButton>
                      <IconButton style={{color:'red'}}  onClick={()=>this.handleDeleteUser(i)}>
                      <i className="material-icons" >delete</i>
                      </IconButton>
                  </TableRowColumn>
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
          open={this.state.modalTambahUser}
          onRequestClose={()=>this.handleCloseTambahUser()}
        >

        </Dialog>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default timta_mng_user;
