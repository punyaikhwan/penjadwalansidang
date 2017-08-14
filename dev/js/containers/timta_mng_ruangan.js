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
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import windowDimensions from 'react-window-dimensions';
import dateFormat from 'dateformat';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/imgprofile.jpg';

class timta_mng_ruangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modalTambahRuangan: false,
      modalTambahEvent: false,
      modalEditEvent: false,
      titleEvent: "",
      startDate: null,
      endDate: null,
      selectedRuangan: 0,
      idRuangan: "",
      dataRuangan: [
        {
          id: "7606",
          events: [
            {
              title: "Rapat kerja dosen",
              start: "2017-05-01T10:20:00",
              end: "2017-05-01T15:20:00"
            },
            {
              title: "Rapat HMIF",
              start: "2017-05-02T10:20:00",
              end: "2017-05-02T15:20:00"
            },
          ]
        },
        {
          id: "7602",
          events: [
            {
              title: "Rapat kerja dosen X",
              start: "2017-05-03T12:00:00",
              end: "2017-05-03T16:00:00"
            },
            {
              title: "Rapat HMIF 2",
              start: "2017-05-02T10:20:00",
              end: "2017-05-02T15:20:00"
            },
          ]
        }
      ]
    };
  }

  handleToggle() {this.setState({open: !this.state.open})};

  handleClose () { this.setState({open: false})};

  handleOpenTambahRuangan() {this.setState({modalTambahRuangan: true})};
  handleCloseTambahRuangan () { this.setState({modalTambahRuangan: false})};
  handleChangeRuangan(event) { this.setState({idRuangan: event.target.value})};
  handleTambahRuangan() {
    let data = {
      id: this.state.idRuangan,
      events: []
    };
    let tempDataRuangan = this.state.dataRuangan;
    tempDataRuangan.push(data);
    this.setState({dataRuangan: tempDataRuangan});
    this.handleCloseTambahRuangan();
  }

  handleDeleteRuangan(i) {
    let tempDataRuangan = this.state.dataRuangan;
    tempDataRuangan.splice(i,1)
    console.log(this.state.dataRuangan);
    this.setState({dataRuangan: tempDataRuangan});
  }

  handleOpenTambahEvent () {this.setState({modalTambahEvent: true})};
  handleCloseTambahEvent () {
    this.setState({modalTambahEvent: false});
    this.setState({startDate: null, endDate: null, titleEvent: ""})
  };
  handleChangeTitleEvent(event) {this.setState({titleEvent: event.target.value})};
  handleChangeEventStartDate(event, date) {this.setState({startDate: date})};
  handleChangeEventEndDate(event, date) {this.setState({endDate: date})};
  handleTambahEvent() {
    let tempDataRuangan = this.state.dataRuangan;
    let dataEvent = {
      title: this.state.titleEvent,
      start: this.state.startDate,
      end: this.state.endDate,
    }
    console.log("new data event:", dataEvent);
    console.log(tempDataRuangan[this.state.selectedRuangan].events);
    tempDataRuangan[this.state.selectedRuangan].events.push(dataEvent);
    this.setState({dataRuangan: tempDataRuangan});
    this.handleCloseTambahEvent();
  }

  handleDeleteEvent(i) {
    let tempDataRuangan = this.state.dataRuangan;
    tempDataRuangan[this.state.selectedRuangan].events.splice(i,1);
    console.log("data Ruangan:", tempDataRuangan);
    this.setState({dataRuangan: tempDataRuangan});
  }

  handleOpenEditEvent(i) {
    this.setState({editedEvent: i});
    this.setState({titleEvent: this.state.dataRuangan[this.state.selectedRuangan].events[i].title});
    let startDateFull = new Date(this.state.dataRuangan[this.state.selectedRuangan].events[i].start);
    let endDateFull = new Date(this.state.dataRuangan[this.state.selectedRuangan].events[i].end);
    console.log(startDateFull);
    this.setState({startDate: startDateFull});
    this.setState({endDate: endDateFull});
    this.setState({modalEditEvent:true});
  }

  handleCloseEditEvent(){
    this.setState({modalEditEvent:false});
    this.setState({startDate: null, endDate: null, titleEvent: ""})
  };

  isEmpty(str) {
    return (str.length === 0)
  }

  render() {
    const actionsTambahRuangan = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseTambahRuangan()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleTambahRuangan()}
      />,
    ];

    const actionsEditEvent = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseEditEvent()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleEditEvent()}
      />,
    ];

    const actionsTambahEvent = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseTambahEvent()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleTambahEvent()}
      />,
    ];
    return (
      <MuiThemeProvider>
      <div>
        <RaisedButton
          style={{
            position: 'fixed',
            marginTop: this.props.height-50,
            marginLeft: this.props.width-200,
            alignItems: 'center'
          }}
          backgroundColor="#F1D600"
          label="SAVE"
          labelPosition="after"
          icon={<i className="material-icons" style={{color:'black'}}>save</i>}
        />
        <AppBar
          title="Dashboard Tim TA - Manajemen Ruangan"
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

        <div className="containerBodyWide" style={{marginTop: 20}}>
          <Row>
            <Col md="2" xs="12">
              <div>
                <Subheader>Daftar Ruangan</Subheader>
                <RaisedButton
                  label="Tambah"
                  labelPosition="after"
                  backgroundColor="rgb(166, 233, 255)"
                  icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                  onTouchTap={()=>this.handleOpenTambahRuangan()}
                />
                {this.state.dataRuangan.length !== 0 &&
                <ScrollArea
                  horizontal={false}
                  style={{height: 500, borderLeftWidth: 2}}
                  speed={0.8}
                >
                  <List>
                    {this.state.dataRuangan.map((item, i) => (
                      <Row>
                        <Col md="6" xs="8">
                          <ListItem key={i} onTouchTap={()=>this.setState({selectedRuangan:i})}>
                            {item.id}
                          </ListItem>
                        </Col>
                        <Col md="6" xs ="4" style={{marginTop:7}}>
                          <IconButton style={{color:'black'}}  onClick={()=>this.handleDeleteRuangan(i)}>
                                <i className="material-icons">close</i>
                          </IconButton>
                        </Col>
                      </Row>
                    ))
                    }
                  </List>
                </ScrollArea>
                }
                {this.state.dataRuangan.length === 0 &&
                  <p><i>Tidak ada ruangan.</i></p>
                }
              </div>
            </Col>
            <Col md="10" xs="12">
              {this.state.dataRuangan.length !== 0 &&
              <div>
                <p style={{fontSize:20, fontWight:'bold', textAlign: 'center'}}>{"Ruangan "+(this.state.dataRuangan[this.state.selectedRuangan].id)}</p>

                <br/>
                <p style={{fontSize:16}}>Daftar Event</p>
                <div>
                  <ScrollArea
                    horizontal={false}
                    style={{height: 450}}
                    speed={0.8}
                  >
                    <RaisedButton
                      label="Tambah Event"
                      labelPosition="after"
                      backgroundColor="rgb(166, 233, 255)"
                      icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                      onClick={()=>this.handleOpenTambahEvent()}
                    />

                    {this.state.dataRuangan.length > 0 &&
                      <Table fixedHeader={true}>
                        <TableHeader displaySelectAll={false} enableSelectAll={false}>
                          <TableRow>
                            <TableHeaderColumn style={{width:200}}>Judul Acara</TableHeaderColumn>
                            <TableHeaderColumn>Waktu Mulai</TableHeaderColumn>
                            <TableHeaderColumn>Waktu Selesai</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                          </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox = {false}>
                        {this.state.dataRuangan[this.state.selectedRuangan].events.map((item, i)=> (
                            <TableRow key={i}>
                              <TableRowColumn style={{width:3}}></TableRowColumn>
                              <TableRowColumn style={{width:200}}>{item.title}</TableRowColumn>
                              <TableRowColumn style={{width:60}}>{dateFormat(item.start, "dd/mm/yy")}</TableRowColumn>
                              <TableRowColumn style={{width:50}}>{dateFormat(item.start, "HH.MM")}</TableRowColumn>
                              <TableRowColumn style={{width:60}}>{dateFormat(item.end, "dd/mm/yy")}</TableRowColumn>
                              <TableRowColumn style={{width:50}}>{dateFormat(item.end, "HH.MM")}</TableRowColumn>
                              <TableRowColumn>
                                <IconButton style={{color:'blue'}}  onClick={()=>this.handleOpenEditEvent(i)}>
                                <i className="material-icons">edit</i>
                                </IconButton>
                                <IconButton style={{color:'red'}}  onClick={()=>this.handleDeleteEvent(i)}>
                                <i className="material-icons" >delete</i>
                                </IconButton>
                              </TableRowColumn>
                            </TableRow>
                        ))}
                        </TableBody>
                      </Table>
                    }
                    {this.state.dataRuangan.length === 0 &&
                      <p style={{fontSize:14}}><i>Tidak ada ruangan</i></p>
                    }
                  </ScrollArea>
                </div>
              </div>
              }
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

        <Dialog
          title="Tambah Ruangan"
          actions= {actionsTambahRuangan}
          modal={false}
          open={this.state.modalTambahRuangan}
          contentStyle={{width: 400}}
          onRequestClose={()=>this.handleCloseTambahRuangan()}
        >
          <TextField
            hintText="Nama ruangan"
            style={{width:300}}
            onChange={(event)=>this.handleChangeRuangan(event)}
          />
        </Dialog>

        <Dialog
          title="Tambah Event"
          actions= {actionsTambahEvent}
          modal={false}
          open={this.state.modalTambahEvent}
          contentStyle={{width: 700}}
          onRequestClose={()=>this.handleCloseTambahEvent()}
        >
          <TextField
            hintText="Masukkan nama event"
            floatingLabelText="Nama Event"
            floatingLabelFixed={true}
            errorText = {this.isEmpty(this.state.titleEvent) ? "Tidak boleh kosong" : ""}
            onChange = {(event)=> this.handleChangeTitleEvent(event)}
            style = {{width: 350}}
          />
          <Row>
            <Col md="5" xs="5">
              <Row>
                <Col md="12" xs="12">
                  <Subheader>Tanggal mulai</Subheader>
                  <DatePicker
                    hintText="Pilih tanggal mulai"
                    mode="landscape"
                    value = {this.state.startDate}
                    onChange={(event, date)=>this.handleChangeEventStartDate(event, date)}
                  />
                </Col>
                <Col md="12" xs="12">
                  <Subheader>Jam Mulai</Subheader>
                  <TimePicker
                    format="24hr"
                    hintText="Pilih waktu mulai"
                    value={this.state.startDate}
                    onChange={(event, date) =>this.handleChangeEventStartDate(event, date)}
                  />
                </Col>
              </Row>
            </Col>
            <Col md="2" xs="2">

            </Col>
            <Col md="5" xs="5">
              <Row>
                <Col md="12" xs="12">
                  <Subheader>Tanggal akhir</Subheader>
                  <DatePicker
                    hintText="Pilih tanggal akhir"
                    mode="landscape"
                    value = {this.state.endDate}
                    onChange={(event, date)=>this.handleChangeEventEndDate(event, date)}
                  />
                </Col>
                <Col md="12" xs="12">
                  <Subheader>Jam Akhir</Subheader>
                  <TimePicker
                    format="24hr"
                    hintText="Pilih waktu akhir"
                    value={this.state.endDate}
                    onChange={(event, date) =>this.handleChangeEventEndDate(event, date)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Dialog>

        <Dialog
          title="Edit Event"
          actions= {actionsEditEvent}
          modal={false}
          open={this.state.modalEditEvent}
          contentStyle={{width: 700}}
          onRequestClose={()=>this.handleCloseEditEvent()}
        >
          <TextField
            hintText="Masukkan nama event"
            floatingLabelText="Nama Event"
            floatingLabelFixed={true}
            defaultValue = {this.state.titleEvent}
            errorText = {this.isEmpty(this.state.titleEvent) ? "Tidak boleh kosong" : ""}
            onChange = {(event)=> this.handleChangeTitleEvent(event)}
            style = {{width: 350}}
          />
          <Row>
            <Col md="5" xs="5">
              <Row>
                <Col md="12" xs="12">
                  <Subheader>Tanggal mulai</Subheader>
                  <DatePicker
                    hintText="Pilih tanggal mulai"
                    mode="landscape"
                    value = {this.state.startDate}
                    onChange={(event, date)=>this.handleChangeEventStartDate(event, date)}
                  />
                </Col>
                <Col md="12" xs="12">
                  <Subheader>Jam Mulai</Subheader>
                  <TimePicker
                    format="24hr"
                    hintText="Pilih waktu mulai"
                    value={this.state.startDate}
                    onChange={(event, date) =>this.handleChangeEventStartDate(event, date)}
                  />
                </Col>
              </Row>
            </Col>
            <Col md="2" xs="2">

            </Col>
            <Col md="5" xs="5">
              <Row>
                <Col md="12" xs="12">
                  <Subheader>Tanggal akhir</Subheader>
                  <DatePicker
                    hintText="Pilih tanggal akhir"
                    mode="landscape"
                    value = {this.state.endDate}
                    onChange={(event, date)=>this.handleChangeEventEndDate(event, date)}
                  />
                </Col>
                <Col md="12" xs="12">
                  <Subheader>Jam Akhir</Subheader>
                  <TimePicker
                    format="24hr"
                    hintText="Pilih waktu akhir"
                    value={this.state.endDate}
                    onChange={(event, date) =>this.handleChangeEventEndDate(event, date)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Dialog>
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        mahasiswa: state.mahasiswaKP,
        dosen: state.dosen,
        Ruangan: state.RuanganKP,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(windowDimensions()(timta_mng_ruangan));
