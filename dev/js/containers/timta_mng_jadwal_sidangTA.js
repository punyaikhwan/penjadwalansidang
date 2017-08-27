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
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ScrollArea from 'react-scrollbar';
import {List, ListItem} from 'material-ui/List';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import SubHeader from 'material-ui/SubHeader';

import imgProfile from '../../scss/public/images/imgprofile.jpg';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import windowDimensions from 'react-window-dimensions';
import {fetchTA} from '../actions/ta/fetch-ta'

class timta_mng_jadwal_sidangTA extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      statusJadwal: 3,
      /*
      0: belum dijadwalkan
      1: menunggu penjadwalan
      2: menunggu finalisasi
      3: sudah difinalisasi
      */
      selectAll: false,
      checkBoxTA: [],
      listDosen: [],
      additionalCalender: "",
      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    console.log("DidMount")
      this.props.fetchTA();
    setTimeout(()=> {
      let tempcheckBoxTA = [];
      for (var i=0; i < this.props.dataTA.length; i++) {
        tempcheckBoxTA.push(0);
        console.log(tempcheckBoxTA);
      }
      this.setState({checkBoxTA: tempcheckBoxTA});
      console.log(this.state.checkBoxTA);
    }, 1000);
  }

  handleToggle(){this.setState({open: !this.state.open})};
  handleClose(){this.setState({open: false})};

  union_arrays (arrayA, arrayB) {
    //union arrayA and B and store to array A
    for (var i=0; i<arrayB.length; i++) {
      if (arrayA.indexOf(arrayB[i]) <= -1) {
        arrayA.push(arrayB[i]);
      }
    }
  }

  remove_dosen_TA () {
    //arrayA-arrayB, store result to arrayA
    var tempListDosen = [];
    for (var i=0; i<this.state.checkBoxTA.length; i++) {
      if (this.state.checkBoxTA[i] === 1) {
        this.union_arrays(tempListDosen, this.props.dataTA[i].pembimbing);
          this.union_arrays(tempListDosen, this.props.dataTA[i].akhir);
      }
    }
    this.setState({listDosen: tempListDosen});
  }

  handleSelectAll() {
    let tempcheckBoxTA = this.state.checkBoxTA;
    let tempdataTA = this.props.dataTA;
    let tempListDosen = this.state.listDosen;
    if (this.state.selectAll === false) {
      this.setState({selectAll: true});
      for (var i=0; i<this.state.checkBoxTA.length; i++) {
        tempcheckBoxTA[i] = 1;
        this.union_arrays(tempListDosen, tempdataTA[i].pembimbing);
        this.union_arrays(tempListDosen, tempdataTA[i].akhir);
      }
      this.setState({listDosen: tempListDosen});
    } else {
      this.setState({selectAll: false});
      for (var i=0; i<this.state.checkBoxTA.length; i++) {
        tempcheckBoxTA[i] = 0;
      }
      this.setState({listDosen: []});
    }
    this.setState({checkBoxTA: tempcheckBoxTA});
  }

  handleSelectMahasiswa(i) {
    let tempcheckBoxTA = this.state.checkBoxTA;
    let tempdataTA = this.props.dataTA;
    let tempListDosen = this.state.listDosen;
    if (tempcheckBoxTA[i] === 0) {
      tempcheckBoxTA[i] = 1;
      this.union_arrays(tempListDosen, tempdataTA[i].pembimbing);
      this.union_arrays(tempListDosen, this.props.dataTA[i].akhir);
      this.setState({checkBoxTA: tempcheckBoxTA});
    } else {
      tempcheckBoxTA[i] = 0;
      this.setState({checkBoxTA: tempcheckBoxTA});
      console.log("Checkbox:", this.state.checkBoxTA);
      setTimeout(()=> {
        this.remove_dosen_TA();
      }, 100);
    }
    console.log("Checkbox:", this.state.checkBoxTA);
    this.setState({listDosen: tempListDosen});
  }

  handleAdditionalCalendar(event) {
    this.setState({additionalCalendar: event.target.value})
  }

  handleChangeStartDate(event, date) {
    this.setState({startDate: date})
  }

  handleChangeEndDate(event, date) {
    this.setState({endDate: date})
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBar
          title="Dashboard Tim TA - Manajemen Jadwal Sidang Akhir"
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

        <Row className="containerBody" style={{marginTop: 20}}>
          <Col md="6" xs="12">
            <p style={{fontSize:20, fontWight:'bold'}}>Pilih Mahasiswa</p>
            <ScrollArea
              horizontal={false}
              style={{height: 300, borderLeftWidth: 2}}
              speed={0.8}
            >
            <List>
              <ListItem leftCheckbox={<Checkbox checked={this.state.selectAll}/>} primaryText="Pilih semua" onClick={()=>this.handleSelectAll()}/>
            </List>
            <List>
              {this.props.dataTA.map((item, i) => (
                <ListItem key={i} primaryText={item.mahasiswa.NIM+"\t"+item.mahasiswa.nama} leftCheckbox={<Checkbox checked={this.state.checkBoxTA[i] === 1 ? true:false} onCheck={()=>this.handleSelectMahasiswa(i)}/>}/>
              ))}
            </List>
            </ScrollArea>
          </Col>
          <Col md="6" xs="12">
          <p style={{fontSize:20, fontWight:'bold'}}>Daftar Dosen</p>
          <ScrollArea
            horizontal={false}
            style={{height: 300, borderLeftWidth: 2}}
            speed={0.8}
          >
          <Table fixedHeader={false}>
            <TableHeader displaySelectAll={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Nama dosen</TableHeaderColumn>
                <TableHeaderColumn>Sudah beri akses?</TableHeaderColumn>
              </TableRow>
            </TableHeader>
              <TableBody displayRowCheckbox={false}>
                  {this.state.listDosen.map((item, i) => (
                    <TableRow key={i}>
                      <TableRowColumn></TableRowColumn>
                      <TableRowColumn>{item.user.nama}</TableRowColumn>
                      <TableRowColumn>{item.user.status_kalender}</TableRowColumn>
                    </TableRow>
                  ))}
              </TableBody>
          </Table>
          </ScrollArea>
          </Col>
        </Row>
        <Row className="containerBody">
          <Col md="6" xs="12">
            <p style={{fontSize:20, fontWight:'bold'}}>Tambah kalender</p>
            <TextField
              hintText="Tempel URL google kalender dengan izin akses Publik."
              style={{width:400}}
              defaultValue = {this.state.additionalCalender}
              onChange={(event)=>this.handleAdditionalCalendar(event)}
            />
            <br/>
          </Col>
          <Col md="6" xs="12">
            <div style={{fontSize:20, fontWight:'bold'}}>Periode</div>
            <Row>
              <Col md="5" xs="5">
                <SubHeader>Tanggal mulai</SubHeader>
                <DatePicker
                  hintText="Pilih tanggal mulai"
                  mode="landscape"
                  minDate= {new Date()}
                  maxDate = {this.state.endDate !== null ? this.state.endDate : null}
                  value={this.state.startDate}
                  onChange={(event, date)=>this.handleChangeStartDate(event, date)}
                />
              </Col>
              <Col md="2" xs="2">

              </Col>
              <Col md="5" xs="5">
                <SubHeader>Tanggal akhir</SubHeader>
                <DatePicker
                  hintText="Pilih tanggal akhir"
                  mode="landscape"
                  minDate = {this.state.startDate !== null ? this.state.startDate : null}
                  value={this.state.endDate}
                  onChange={(event, date)=>this.handleChangeEndDate(event, date)}
                />
              </Col>
            </Row>
            <br/>
            <span style={{fontSize: 14}}>
              <i className="material-icons" style={{color: 'black', size: 14}}>info</i> 
              {" Status Jadwal: "}
              {this.state.statusJadwal === 0 ? " belum dijadwalkan" :
                (this.state.statusJadwal === 1 ? " menunggu penjadwalan" :
                  (this.state.statusJadwal === 2 ? " menunggu finalisasi" :
                    "sudah dijadwalkan."
                  )
                )
              } 
            </span>
            <div style={{textAlign: 'center'}}>
            {this.state.statusJadwal === 0 &&
            <RaisedButton
              label="Jadwalkan!"
              backgroundColor="#2196F3"
              labelColor= "#fff"
              fullWidth
              style={{marginLeft: 20, marginTop: 20}}
            />
            }
            {this.state.statusJadwal === 1 &&
            <RaisedButton
              label="Jadwalkan!"
              backgroundColor="#2196F3"
              labelColor= "#fff"
              fullWidth
              disabled
              style={{marginLeft: 20, marginTop: 20}}
            />
            }
            {this.state.statusJadwal === 2 &&
            <RaisedButton
              label="Lihat kalender"
              backgroundColor="#2196F3"
              labelColor= "#fff"
              fullWidth
              style={{marginLeft: 20, marginTop: 20}}
              href="/timta_calendar"
            />
            }
            {this.state.statusJadwal === 3 &&
            <span>
            <RaisedButton
              label="Lihat kalender"
              backgroundColor="#2196F3"
              labelColor= "#fff"
              fullWidth
              style={{marginLeft: 20, marginTop: 20}}
              href="/timta_calendar"
            />
            <div>
              atau <span style={{color: "#2E1AB2"}}>jadwalkan ulang.</span>
            </div>
            </span>
            }
            </div>
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
function mapStateToProps(state) {
    return {
        dataTA: state.dataTA
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchTA:fetchTA}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(windowDimensions()(timta_mng_jadwal_sidangTA));
