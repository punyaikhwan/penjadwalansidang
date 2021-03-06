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
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

import imgProfile from '../../scss/public/images/admin.png';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchKP} from '../actions/kp/fetch-kp'
import {schedule} from '../actions/event/schedule'
import {Router, Redirect} from 'react-router'
import {tipeEvent} from '../actions/event/tipe-event'
import {logout} from '../actions/auth/logout'

class timta_mng_jadwal_seminarKP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checkBoxKelompok: [],
      selectAll: false,
      listDosen: [],
      additionalCalender: "",
      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    document.title = "Manajemen Jadwal Seminar KP"
    this.props.fetchKP();
      setTimeout(()=> {
      let tempCheckBoxKelompok = [];
      for (var i=0; i < this.props.kelompok.length; i++) {
        tempCheckBoxKelompok.push(0);
        console.log(tempCheckBoxKelompok);
      }
      this.setState({checkBoxKelompok: tempCheckBoxKelompok});
      console.log(this.state.checkBoxKelompok);
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

  remove_dosen_kelompok () {
    //arrayA-arrayB, store result to arrayA
    var tempListDosen = [];
    for (var i=0; i<this.state.checkBoxKelompok.length; i++) {
      if (this.state.checkBoxKelompok[i] === 1) {
        this.union_arrays(tempListDosen, this.props.kelompok[i].pembimbing);
      }
    }
    this.setState({listDosen: tempListDosen});
  }

  handleSelectAll() {
    let tempcheckBoxKelompok = this.state.checkBoxKelompok;
    let tempdataKelompok = this.props.kelompok;
    let tempListDosen = this.state.listDosen;
    if (this.state.selectAll === false) {
      this.setState({selectAll: true});
      for (var i=0; i<this.state.checkBoxKelompok.length; i++) {
        tempcheckBoxKelompok[i] = 1;
        this.union_arrays(tempListDosen, tempdataKelompok[i].pembimbing);
      }
      this.setState({listDosen: tempListDosen});
    } else {
      this.setState({selectAll: false});
      for (var i=0; i<this.state.checkBoxKelompok.length; i++) {
        tempcheckBoxKelompok[i] = 0;
      }
      this.setState({listDosen: []});
    }
    this.setState({checkBoxKelompok:tempcheckBoxKelompok});
  }

  handleSelectKelompok(i) {
    let tempCheckBoxKelompok = this.state.checkBoxKelompok;
    let tempDataKelompok = this.props.kelompok;
    let tempListDosen = this.state.listDosen;
    if (tempCheckBoxKelompok[i] === 0) {
      tempCheckBoxKelompok[i] = 1;
      this.union_arrays(tempListDosen, tempDataKelompok[i].pembimbing);
      this.setState({checkBoxKelompok: tempCheckBoxKelompok});
    } else {
      tempCheckBoxKelompok[i] = 0;
      this.setState({selectAll: false});
      this.setState({checkBoxKelompok: tempCheckBoxKelompok});
      console.log("Checkbox:", this.state.checkBoxKelompok);
      setTimeout(()=> {
        this.remove_dosen_kelompok();
      }, 100);
    }
    console.log("Checkbox:", this.state.checkBoxKelompok);
    this.setState({listDosen: tempListDosen});
  }

  handleAdditionalCalendar(event) {
    this.setState({additionalCalendar: event.target.value})
  }

  handleChangeStartDate(event, date) {
    let dateTemp = new Date(date.setHours(7, 0, 0, 0));
    this.setState({startDate: dateTemp})
  }

  handleChangeEndDate(event, date) {
    this.setState({endDate: date})
  }

  handleRequestSchedule() {
      let kel = []
      let check = this.state.checkBoxKelompok;
      this.props.kelompok.forEach(function (item, i) {
          console.log(item.id)
          if (check[i] == 1){
              console.log(item.id)
              kel.push(item.id)
          }
      })
      console.log(kel)
      this.props.schedule(1, this.state.startDate, this.state.endDate, kel);
      this.props.tipe(1);
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
            return (
                <MuiThemeProvider>
                  <div>
                      {this.props.calonEvent.length === 0 &&
                      <div>
                        <AppBar
                            title="Dashboard Tim TA - Manajemen Jadwal Seminar KP"
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
                                  onTouchTap = {()=>this.handleLogout()}
                              />
                            }
                        />


                          <Row className="containerBody" style={{marginTop: 20}}>
                              <Col md="6" xs="12">
                                  <p style={{fontSize:20, fontWight:'bold'}}>Pilih Kelompok</p>
                                  <ScrollArea
                                      horizontal={false}
                                      style={{height: 300, borderLeftWidth: 2}}
                                      speed={0.8}
                                  >
                                      <List>
                                          <ListItem leftCheckbox={<Checkbox checked={this.state.selectAll}/>} primaryText="Pilih semua" onClick={()=>this.handleSelectAll()}/>
                                      </List>
                                      <List>
                                          {this.props.kelompok.map((item, i) => (
                                              <ListItem key={i} primaryText={"Kelompok "+ item.id} leftCheckbox={<Checkbox checked={this.state.checkBoxKelompok[i] === 1 ? true:false} onCheck={()=>this.handleSelectKelompok(i)}/>}/>
                                          ))}
                                      </List>
                                  </ScrollArea>
                              </Col>
                              <Col md="6" xs="12">
                                  <p style={{fontSize:20, fontWight:'bold'}}>Daftar Dosen</p>
                                  <ScrollArea
                                      horizontal={false}
                                      style={{height: 500, borderLeftWidth: 2}}
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
                                                      <TableRowColumn>{item.user.token !== null ? "Sudah" : <div style={{color: '#ff0000'}}>Belum</div>}</TableRowColumn>
                                                  </TableRow>
                                              ))}
                                          </TableBody>
                                      </Table>
                                  </ScrollArea>
                              </Col>
                          </Row>
                          <Row className="containerBody">
                              <Col md="6" xs="12">

                                  <br/>
                              </Col>
                              <Col md="6" xs="12">
                                  <div style={{fontSize:20, fontWight:'bold'}}>Periode</div>
                                  <Row>
                                      <Col md="5" xs="5">
                                          Tanggal mulai
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
                                Tanggal akhir
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
                            <div style={{textAlign: 'center'}}>
                              <RaisedButton
                                  label="Jadwalkan!"
                                  backgroundColor="#2196F3"
                                  labelColor= "#fff"
                                  fullWidth
                                  style={{marginLeft: 20, marginTop: 20}}
                                  onClick = {()=>this.handleRequestSchedule()}
                              />
                            </div>
                          </Col>
                        </Row>

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
                          <MenuItem insetChildren={true} href="/timta_mng_user">Daftar Pengguna</MenuItem>
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
                            modal={false}
                            open={this.props.loading}
                            contentStyle = {{width: 300, textAlign: 'center'}}
                        >
                          <CircularProgress size={80} thickness={5} />
                          <p>Sedang menjadwalkan...</p>

                        </Dialog>
                      </div>
                      }
                      {this.props.calonEvent.length !== 0 &&
                      <div>
                        <Redirect to="/timta_calendar" />
                      </div>
                      }
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
        kelompok: state.kelompokKP,
        calonEvent: state.calonEvent,
        loading: state.loading,
        userInfo: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchKP: fetchKP,
        schedule: schedule,
        tipe:tipeEvent,
        logout: logout
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(timta_mng_jadwal_seminarKP);
