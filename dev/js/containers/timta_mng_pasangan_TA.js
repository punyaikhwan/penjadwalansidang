import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import '../../scss/timTA.scss';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ScrollArea from 'react-scrollbar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/imgprofile.jpg';

class timta_mng_pasangan_TA extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle(){this.setState({open: !this.state.open})};

  handleClose(){this.setState({open: false})};

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBar
          title="Dashboard Tim TA - Daftar Pasangan Tugas Akhir"
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

        <div className="containerBody" style={{marginTop: 20}}>
          <Row>
            <Col md="6" xs="12">
            <div>
              <Subheader>Daftar Mahasiswa Tugas Akhir</Subheader>
              <ScrollArea
                horizontal={false}
                style={{height: 400}}
                speed={0.8}
              >
                <FlatButton
                  label="Tambah mahasiswa"
                  labelPosition="after"
                  fullWidth={true}
                  icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                />
                <List>
                  <ListItem primaryText="13514020 Ikhwanul Muslimin" />
                  <ListItem primaryText="13514xxx Naufal Malik Rabbani" />
                  <ListItem primaryText="13514xxx Hasna Nur Karimah" />
                  <ListItem primaryText="13514xxx Hendrikus Bimawan" />
                  <ListItem primaryText="13514xxx Febi Agil Ifdillah" />
                </List>
              </ScrollArea>
            </div>

            <p style={{fontSize:16}}>Topik Kerja Praktik</p>
            <Row>
              <Col md="10" xs="10">
                <p style={{fontSize: 25}}>Implementasi X untuk YYYY</p>
              </Col>
              <Col md="2" xs ="2">
                <FlatButton
                  icon={<i className="material-icons" style={{color:'black'}}>edit</i>}
                />
              </Col>
            </Row>

            </Col>
            <Col md="6" xs="12">
              <div>
                <Subheader>Dosen Pembimbing</Subheader>
                <List>
                  <ListItem>
                    <Row>
                      <Col md="10" xs="10">
                        Rinaldi Munir
                      </Col>
                      <Col md="2" xs ="10">
                        <i className="material-icons" style={{color:'black', size:10}}>close</i>
                      </Col>
                    </Row>
                  </ListItem>
                  <ListItem>
                    <Row>
                      <Col md="10" xs="10">
                        Ayu Purwarianti
                      </Col>
                      <Col md="2" xs ="10">
                        <i className="material-icons" style={{color:'black', size:10}}>close</i>
                      </Col>
                    </Row>
                  </ListItem>
                </List>
              </div>
              <br/>
              <br/>
              <div>
                <Subheader>Daftar Dosen Penguji</Subheader>
                <ScrollArea
                  horizontal={false}
                  style={{height: 400}}
                  speed={0.8}
                >
                  <FlatButton
                    label="Tambah penguji"
                    labelPosition="after"
                    fullWidth={true}
                    icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                  />
                  <List>
                    <ListItem primaryText="Inggriani Liem" />
                    <ListItem primaryText="Yudhistira" />
                    <ListItem primaryText="Bayu W" />
                  </List>
                </ScrollArea>
              </div>
            </Col>
          </Row>
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
          <MenuItem insetChildren={true} href="/timta_mng_">Daftar Pengguna</MenuItem>
          <MenuItem insetChildren={true}style={{backgroundColor:'#b0bec5'}} >Daftar Pasangan</MenuItem>
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

export default timta_mng_pasangan_TA;
