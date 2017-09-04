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
import {fetchRuangan} from '../actions/ruangan/fetch-ruangan'
import {deleteRuangan} from '../actions/ruangan/delete-ruangan'
import {newRuangan} from '../actions/ruangan/new-ruangan'
import {editRuangan} from '../actions/ruangan/edit-ruangan'
import {tempEditRuangan} from '../actions/ruangan/temp-edit-ruangan'

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
      selectedEvent: 0,
      idRuangan: "",
      // dataRuangan: [
      //   {
      //     id: "7606",
      //     event: [
      //       {
      //         title: "Rapat kerja dosen",
      //         start: "2017-05-01T10:20:00",
      //         end: "2017-05-01T15:20:00"
      //       },
      //       {
      //         title: "Rapat HMIF",
      //         start: "2017-05-02T10:20:00",
      //         end: "2017-05-02T15:20:00"
      //       },
      //     ]
      //   },
      //   {
      //     id: "7602",
      //     event: [
      //       {
      //         title: "Rapat kerja dosen X",
      //         start: "2017-05-03T12:00:00",
      //         end: "2017-05-03T16:00:00"
      //       },
      //       {
      //         title: "Rapat HMIF 2",
      //         start: "2017-05-02T10:20:00",
      //         end: "2017-05-02T15:20:00"
      //       },
      //     ]
      //   }
      // ]
    };
  }

  componentDidMount(){
    this.props.fetchRuangan();
  }
  handleToggle() {this.setState({open: !this.state.open})};

  handleClose () { this.setState({open: false})};

  handleOpenTambahRuangan() {this.setState({modalTambahRuangan: true})};
  handleCloseTambahRuangan () { this.setState({modalTambahRuangan: false})};
  handleChangeRuangan(event) { this.setState({idRuangan: event.target.value})};
  handleTambahRuangan() {
    // let data = {
    //   id: this.state.idRuangan,
    //   event: []
    // };
    // let tempDataRuangan = this.props.dataRuangan;
    // tempDataRuangan.push(data);
    // this.setState({dataRuangan: tempDataRuangan});
      this.props.newRuangan(this.state.idRuangan)
    this.handleCloseTambahRuangan();
  }

  handleDeleteRuangan(i) {
    // let tempDataRuangan = this.props.dataRuangan;
    // tempDataRuangan.splice(i,1)
    // console.log(this.props.dataRuangan);
    // this.setState({dataRuangan: tempDataRuangan});
      this.props.deleteRuangan(i)
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
    let tempDataRuangan = this.props.dataRuangan;
    let dataEvent = {
      title: this.state.titleEvent,
      start: this.state.startDate,
      end: this.state.endDate,
    }
    // console.log("new data event:", dataEvent);
    // console.log(tempDataRuangan[this.state.selectedRuangan].event);
      tempDataRuangan[this.state.selectedRuangan].event.push(dataEvent);
    // this.setState({dataRuangan: tempDataRuangan});
      this.props.edit(tempDataRuangan, this.state.selectedRuangan)
    this.handleCloseTambahEvent();
  }

  handleDeleteEvent(i) {
    let tempDataRuangan = this.props.dataRuangan;
    tempDataRuangan[this.state.selectedRuangan].event.splice(i,1);
    console.log("data Ruangan:", tempDataRuangan);
    // this.setState({dataRuangan: tempDataRuangan});
      this.props.edit(tempDataRuangan, this.state.selectedRuangan)
  }

  handleOpenEditEvent(i) {
    this.setState({editedEvent: i});
    this.setState({titleEvent: this.props.dataRuangan[this.state.selectedRuangan].event[i].title});
    let startDateFull = new Date(this.props.dataRuangan[this.state.selectedRuangan].event[i].start);
    let endDateFull = new Date(this.props.dataRuangan[this.state.selectedRuangan].event[i].end);
    console.log(startDateFull);
    this.setState({startDate: startDateFull});
    this.setState({endDate: endDateFull});
    this.setState({modalEditEvent:true});
    this.setState({selectedEvent: i})
  }

  handleEditEvent(i){
    let tempDataRuangan = this.props.dataRuangan;
    console.log(tempDataRuangan[this.state.selectedRuangan].event[i])
    tempDataRuangan[this.state.selectedRuangan].event[i].title = this.state.titleEvent;
    tempDataRuangan[this.state.selectedRuangan].event[i].start = this.state.startDate;
    tempDataRuangan[this.state.selectedRuangan].event[i].end = this.state.endDate;
    console.log(tempDataRuangan[this.state.selectedRuangan].event[i])
    console.log(tempDataRuangan[this.state.selectedRuangan])
    this.props.edit(tempDataRuangan, this.state.selectedRuangan)
      this.handleCloseEditEvent();
  }

  handleCloseEditEvent(){
    this.setState({modalEditEvent:false});
    this.setState({startDate: null, endDate: null, titleEvent: ""})
  };

  isEmpty(str) {
    return (str.length === 0)
  }

  handleSave(){
    this.props.editRuangan(this.props.dataRuangan)
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
        onClick={()=>this.handleEditEvent(this.state.selectedEvent)}
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
            onTouchTap={()=>this.handleSave()}
        />
        <AppBar
          title="Dashboard Tim TA - Manajemen Ruangan"
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
            />
          }
        />

        <div className="containerBodyWide" style={{marginTop: 20}}>
          <Row>
            <Col md="2" xs="12">
              <div>
                Daftar Ruangan
                <RaisedButton
                  label="Tambah"
                  labelPosition="after"
                  backgroundColor="rgb(166, 233, 255)"
                  icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                  onTouchTap={()=>this.handleOpenTambahRuangan()}
                />
                {this.props.dataRuangan.length !== 0 &&
                <ScrollArea
                  horizontal={false}
                  style={{height: 500, borderLeftWidth: 2}}
                  speed={0.8}
                >
                  <List>
                    {this.props.dataRuangan.map((item, i) => (
                      <Row>
                        <Col md="6" xs="8">
                          <ListItem key={i} onTouchTap={()=>this.setState({selectedRuangan:i})}>
                            {item.nama}
                          </ListItem>
                        </Col>
                        <Col md="6" xs ="4" style={{marginTop:7}}>
                          <IconButton style={{color:'black'}}  onClick={()=>this.handleDeleteRuangan(item.id)}>
                                <i className="material-icons">close</i>
                          </IconButton>
                        </Col>
                      </Row>
                    ))
                    }
                  </List>
                </ScrollArea>
                }
                {this.props.dataRuangan.length === 0 &&
                  <p><i>Tidak ada ruangan.</i></p>
                }
              </div>
            </Col>
            <Col md="10" xs="12">
              {this.props.dataRuangan.length !== 0 &&
              <div>
                <p style={{fontSize:20, fontWight:'bold', textAlign: 'center'}}>{"Ruangan "+(this.props.dataRuangan[this.state.selectedRuangan].id)}</p>

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

                    {this.props.dataRuangan.length > 0 &&
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
                        {this.props.dataRuangan[this.state.selectedRuangan].event.map((item, i)=> (
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
                    {this.props.dataRuangan.length === 0 &&
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
          <MenuItem insetChildren={true} style={{backgroundColor:'#b0bec5'}} href="/timta_mng_ruangan">Manajemen Ruangan</MenuItem>
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
                  Tanggal mulai
                  <DatePicker
                    hintText="Pilih tanggal mulai"
                    mode="landscape"
                    value = {this.state.startDate}
                    onChange={(event, date)=>this.handleChangeEventStartDate(event, date)}
                  />
                </Col>
                <Col md="12" xs="12">
                  Jam Mulai
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
                  Tanggal akhir
                  <DatePicker
                    hintText="Pilih tanggal akhir"
                    mode="landscape"
                    value = {this.state.endDate}
                    onChange={(event, date)=>this.handleChangeEventEndDate(event, date)}
                  />
                </Col>
                <Col md="12" xs="12">
                  Jam Akhir
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
                  Tanggal mulai
                  <DatePicker
                    hintText="Pilih tanggal mulai"
                    mode="landscape"
                    value = {this.state.startDate}
                    onChange={(event, date)=>this.handleChangeEventStartDate(event, date)}
                  />
                </Col>
                <Col md="12" xs="12">
                  Jam Mulai
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
                  Tanggal akhir
                  <DatePicker
                    hintText="Pilih tanggal akhir"
                    mode="landscape"
                    value = {this.state.endDate}
                    onChange={(event, date)=>this.handleChangeEventEndDate(event, date)}
                  />
                </Col>
                <Col md="12" xs="12">
                  Jam Akhir
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
        dataRuangan: state.ruangan,
        userInfo: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchRuangan:fetchRuangan,
        deleteRuangan: deleteRuangan,
        newRuangan: newRuangan,
        editRuangan: editRuangan,
        edit: tempEditRuangan,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(windowDimensions()(timta_mng_ruangan));
