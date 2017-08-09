import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import '../../scss/mahasiswa.scss';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import dateFormat from 'dateformat';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/imgprofile.jpg';

class mhs_jadwal_seminarKP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      myDataSeminar: {
        rincian: {
          idKelompok: 1,
          topik: "Implementasi X untuk Y",
          nama: "Ikhwanul Muslimin",
          nim: 13514020,
          dosenPembimbing: [
            'Rinaldi Munir',
            'Mesayu'
          ]
        },
        jadwal: {
          dateTimeStart: "2010-06-09T15:20:00+07:00",
          dateTimeEnd: "2010-06-09T16:20:00+07:00",
          ruang: "7601"
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
          title="Halaman Mahasiswa - Jadwal Seminar Kerja Praktik"
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

        <p className="tableTitle">Jadwal Seminar Kerja Praktik Anda</p>
        <br/>
        <Row className="infoSidang">
          <Col md="6" xs="12">
            <Card>
              <CardTitle title="Rincian Anda"/>
              <CardText>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Kelompok</TableRowColumn>
                      <TableRowColumn>{this.state.myDataSeminar.rincian.idKelompok}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Topik</TableRowColumn>
                      <TableRowColumn>{this.state.myDataSeminar.rincian.topik}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Nama</TableRowColumn>
                      <TableRowColumn>{this.state.myDataSeminar.rincian.nama}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                      <TableRowColumn>{this.state.myDataSeminar.rincian.nim}</TableRowColumn>
                    </TableRow>
                    {this.state.myDataSeminar.rincian.dosenPembimbing.map((item, i)=>(
                    <TableRow key={i}>
                      <TableRowColumn className="attributeTable">{"Pembimbing "+(i+1)}</TableRowColumn>
                      <TableRowColumn>{item}</TableRowColumn>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardText>
            </Card>
            <br/>
          </Col>
          <Col md="6" xs="12">
            <Card>
              <CardTitle title="Jadwal Anda"/>
              <CardText>
                <Table selectable={false}>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Tanggal Sidang</TableRowColumn>
                      <TableRowColumn>{dateFormat(this.state.myDataSeminar.jadwal.dateTimeStart, "dddd, dd mmmm yyyy")}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn className="attributeTable">Waktu</TableRowColumn>
                      <TableRowColumn>{dateFormat(this.state.myDataSeminar.jadwal.dateTimeStart, "HH.MM")+"-"+dateFormat(this.state.myDataSeminar.jadwal.dateTimeEnd, "HH.MM")}</TableRowColumn>
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

export default mhs_jadwal_seminarKP;
