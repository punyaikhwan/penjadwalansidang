import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Dialog from 'material-ui/Dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import imgProfile from '../../scss/public/images/dosenprofile.jpg';
import '../../scss/timTA.scss';
import moment from 'moment';
import dateFormat from 'dateformat';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Subheader from 'material-ui/Subheader';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {schedule} from '../actions/event/schedule';
import {fetchEvent} from '../actions/event/fetch-events';
import {fetchTA} from '../actions/ta/fetch-ta';
import {fetchRuangan} from '../actions/ruangan/fetch-ruangan';
import {moveEvent} from '../actions/event/move-event';
import {save} from '../actions/event/save';
import {logout} from '../actions/auth/logout'
import {Router, Redirect} from 'react-router'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);


const DragAndDropCalendar = withDragAndDrop(BigCalendar);
var seminarTA1 = 2;
var seminarTA2 = 3;
var sidangAkhir = 4;

class timta_mng_allCalendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedEvent: null,
      selectedDate: null,
      modalEvent: false,
      openSnackbar: false,
      modalTambahEvent: false,
      modalEditEvent: false,
      modalConfirmDelete: false,
      disabled: true,
      eventWillAdded: null,
      tipeEvent: null,
      startDate: null,
      endDate: null,
      selectedPasangan: null,
      room: null,
      timeout: false,
    };

    this.moveEvent = this.moveEvent.bind(this)
  }

  componentDidMount(){
    this.props.fetchEvent();
    this.props.fetchTA();
    this.props.fetchRuangan();
  }

  handleToggle(){this.setState({open: !this.state.open})};

  handleClose() {
    this.setState({open: false});
  }

  // moveEvent({ event, start, end }) {
  //   const { events } = this.state;
  //   const idx = events.indexOf(event);
  //   let updatedEvent = event;
  //   updatedEvent.start = start;
  //   updatedEvent.end = end;
  //
  //   const nextEvents = events
  //   nextEvents.splice(idx, 1, updatedEvent)
  //
  //   this.setState({events: nextEvents})
  // }

  handleSelectedEvent(event) {
    console.log(event);
    this.setState({selectedEvent: event});
    this.setState({modalEvent: true});
  }

  moveEvent({ event, start, end }) {

    let events = this.props.events;
    const idx = this.props.events.indexOf(event);
    let updatedEvent = event;
    updatedEvent.start = start;
    updatedEvent.end = end;

    const nextEvents = events
    nextEvents.splice(idx, 1, updatedEvent)
    this.props.move(nextEvents);
    this.setState({disabled: false});
    // this.setState({events: nextEvents})
  }

  handleOpenTambahEvent(slotInfo) {
    this.setState({startDate: slotInfo.start, endDate: slotInfo.end});
    this.setState({modalTambahEvent: true});
  }

  handleCloseTambahEvent() {
    this.setState({
      selectedEvent: null,
      startDate: null,
      endDate: null,
      room: null,
      tipeEvent: null,
      selectedPasangan: null,
    });
    this.setState({modalTambahEvent: false});
  }

  handleChangeTipeEvent(event, index, tipe_event) {
    console.log("tipe event:", tipe_event)
    this.setState({tipeEvent: tipe_event})
  }

  handleChangeSelectedPasangan(event, index, selectedPasangan) {
    console.log("pasangan:",selectedPasangan);
    this.setState({selectedPasangan: selectedPasangan})
  }

  handleChangeRoom(event, index, room) {
    console.log("room:",room);
    this.setState({room: room})
  }

  handleChangeEventStartDate(event, date) {console.log(date); this.setState({startDate: date})};
  handleChangeEventEndDate(event, date) {this.setState({endDate: date})};

  handleTambahEvent() {
    let events = this.props.events;
    let dosen = [];
    for (var i=0; i<this.state.selectedPasangan.pembimbing.length; i++) {
      dosen.push(this.state.selectedPasangan.pembimbing[i])
    }
    for (var i=0; i<this.state.selectedPasangan.penguji.length; i++) {
      dosen.push(this.state.selectedPasangan.penguji[i])
    }
    for (var i=0; i<this.state.selectedPasangan.akhir.length; i++) {
      dosen.push(this.state.selectedPasangan.akhir[i])
    }
    let title ="";
    if (this.state.tipeEvent === seminarTA1) {
      title = "Seminar TA1";
    } else
    if (this.state.tipeEvent === seminarTA2) {
      title = "Seminar TA2";
    } else
    if (this.state.tipeEvent === sidangAkhir) {
      title = "Sidang Akhir";
    }
    console.log("DOSEN:", dosen);
    console.log("Pasangan:", this.state.selectedPasangan);
    let eventWillAdded = {
      title: title+" "+this.state.selectedPasangan.mahasiswa.nama,
      dosen: dosen,
      mahasiswa: [{user:this.state.selectedPasangan.mahasiswa}],
      start: this.state.startDate,
      end: this.state.endDate,
      topik: this.state.selectedPasangan.topik,
      ruangan : this.state.room,
      tipe_event: this.state.tipeEvent
    }
    events.push(eventWillAdded);
    this.props.move(events);
    this.handleCloseTambahEvent();
    this.setState({disabled: false});
  }

  handleOpenEditEvent() {
    let roomtemp = this.state.selectedEvent.ruangan;
    roomtemp.event = [];
    roomtemp.isEdit = 0;
    this.setState({
      tipeEvent: this.state.selectedEvent.tipe_event,
      room: roomtemp,
      startDate: this.state.selectedEvent.start,
      endDate: this.state.selectedEvent.end,
    })
    this.setState({modalEvent: false});
    this.setState({modalEditEvent: true});
    setTimeout(()=> {
      this.setState({timeout: true});
      console.log(this.state.room);
      console.log("tipe event", this.state.tipeEvent);
    }, 500)
  }

  handleCloseEditEvent() {
    this.setState({
      selectedEvent: null,
      startDate: null,
      endDate: null,
      room: null,
      tipeEvent: null,
      selectedPasangan: null
    });
    this.setState({modalEditEvent: false});
  }

  handleEditEvent() {
    let events = this.props.events;
    let idx = this.props.events.indexOf(this.state.selectedEvent);
    let updatedEvent = this.state.selectedEvent;
    updatedEvent.start = this.state.startDate;
    updatedEvent.end = this.state.endDate;
    updatedEvent.ruangan = this.state.room;
    updatedEvent.tipe_event = this.state.tipeEvent;

    events.splice(idx, 1, updatedEvent)
    this.props.move(events);
    this.setState({disabled: false});
    this.handleCloseEditEvent();
    // this.setState({events: nextEvents})
  }

  handleOpenConfirmDelete(){
    this.handleCloseEditEvent();
    this.setState({modalConfirmDelete:true})
  };
  handleCloseConfirmDelete(){this.setState({modalConfirmDelete:false})};

  handleDeleteEvent() {
    let events = this.props.events;
    let idx = this.props.events.indexOf(this.state.selectedEvent);

    events.splice(idx, 1);
    this.props.move(events);
    this.setState({disabled: false});
    this.handleCloseConfirmDelete();
  }

  handleSave() {
    console.log("SAVE:", JSON.stringify(this.props.events));
    this.props.save(this.props.events);
    this.setState({disabled: true});
    //Add function to change events in DB
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
            console.log("this ",this)
            const actionsModalEvent = [
              <IconButton onClick = {()=>this.handleOpenEditEvent()}>
                <i className="material-icons" style={{color: 'blue'}}>edit</i>
              </IconButton>,
              <IconButton onClick = {()=>this.handleOpenConfirmDelete()}>
                <i className="material-icons" style={{color: 'red'}}>delete</i>
              </IconButton>
            ];
            const actionsTambahEvent = [
              <FlatButton
                  label="Batal"
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
            const actionsEditEvent = [
              <FlatButton
                  label="Batal"
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
            const actionsConfirmDelete = [
              <FlatButton
                  label="Batal"
                  primary={true}
                  onClick={()=>this.handleCloseConfirmDelete()}
              />,
              <FlatButton
                  label="Hapus"
                  primary={true}
                  onClick={()=>this.handleDeleteEvent()}
              />,
            ];

          return (
                <MuiThemeProvider>
                  <div>
                    <AppBar
                        title="Dashboard Tim TA - Kalender"
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
                              <Col className="emailProfile">{this.props.userInfo.peran}</Col>
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
                      <MenuItem insetChildren={true} style={{backgroundColor:'#b0bec5'}} href="/timta_allcalendars">Manajemen Kalender</MenuItem>
                      <MenuItem insetChildren={true} href="/timta_mng_ruangan">Manajemen Ruangan</MenuItem>
                    </Drawer>


                    <div className="containerCalendar">
                      <Row>
                        <Col md="1" xs="3">
                          <RaisedButton
                              label="Simpan"
                              backgroundColor="#0FC722"
                              labelColor= "#fff"
                              disabled = {this.state.disabled}
                              style={{marginBottom: 20}}
                              onTouchTap = {()=>this.handleSave()}
                          />
                        </Col>
                        <Col md="11" xs="9">
                          <p style={{fontSize: 14}}><i className="material-icons" style={{color: 'black'}}>info</i> Drag and drop untuk memindahkan jadwal.</p><br/>
                        </Col>
                      </Row>
                      <DragAndDropCalendar
                          selectable
                          events={this.props.events}
                          onEventDrop={this.moveEvent}
                          defaultView='month'
                          onSelectEvent= {event => this.handleSelectedEvent(event)}
                          onSelectSlot={(slotInfo) => this.handleOpenTambahEvent(slotInfo)
                          }
                      />
                    </div>

                      {this.state.selectedEvent !== null &&
                      <Dialog
                          title={this.state.selectedEvent.title}
                          actions= {actionsModalEvent}
                          modal={false}
                          contentStyle={{width: 600}}
                          open={this.state.modalEvent}
                          onRequestClose={()=>this.setState({modalEvent: false})}
                          autoScrollBodyContent={true}
                      >
                        <Table selectable={false}>
                          <TableBody displayRowCheckbox={false}>
                            <TableRow displayBorder={false}>
                              <TableRowColumn className="attributeTable">Hari</TableRowColumn>
                              <TableRowColumn>{dateFormat(this.state.selectedEvent.start, "dddd, dd mmmm yyyy")}</TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                              <TableRowColumn className="attributeTable">Waktu</TableRowColumn>
                              <TableRowColumn>{dateFormat(this.state.selectedEvent.start, "HH.MM")}</TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                              <TableRowColumn className="attributeTable">Ruang</TableRowColumn>
                              <TableRowColumn>{this.state.selectedEvent.ruangan.nama}</TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                              <TableRowColumn className="attributeTable">Topik</TableRowColumn>
                              <TableRowColumn>{this.state.selectedEvent.topik}</TableRowColumn>
                            </TableRow>
                              {this.state.selectedEvent.mahasiswa.map((item, i) => (
                                  <TableRow key={i} displayBorder={false}>
                                    <TableRowColumn className="attributeTable">{i===0 ? "Mahasiswa":""}</TableRowColumn>
                                    <TableRowColumn>{item.user.NIM+" "+item.user.nama}</TableRowColumn>
                                  </TableRow>
                              ))}
                              {this.state.selectedEvent.dosen.map((item, i) => (
                                  <TableRow key={i} displayBorder={false}>
                                    <TableRowColumn className="attributeTable">{i === 0 ? "Dosen": ""}</TableRowColumn>
                                    <TableRowColumn>{item.user.nama}</TableRowColumn>
                                  </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </Dialog>
                      }
                      {this.state.slotInfo !== null &&
                      <Dialog
                          title="Tambah Acara"
                          actions= {actionsTambahEvent}
                          modal={false}
                          open={this.state.modalTambahEvent}
                          contentStyle={{width: 700}}
                          onRequestClose={()=>this.handleCloseTambahEvent()}
                      >
                        <SelectField
                            multiple={false}
                            hintText="Pilih Tipe Acara"
                            value={this.state.tipeEvent}
                            onChange={(event, index, tipe_event)=>this.handleChangeTipeEvent(event, index, tipe_event)}
                            style = {{width: 350}}
                        >
                          <MenuItem
                              insetChildren={true}
                              value={seminarTA1}
                              primaryText="Seminar TA1"
                          /><MenuItem
                            insetChildren={true}
                            value={seminarTA2}
                            primaryText="Seminar TA2"
                        /><MenuItem
                            insetChildren={true}
                            value={sidangAkhir}
                            primaryText="Sidang Akhir"
                        />
                        </SelectField>
                        <SelectField
                            multiple={false}
                            hintText="Pilih Mahasiswa"
                            value={this.state.selectedPasangan}
                            onChange={(event, index, selectedPasangan)=>this.handleChangeSelectedPasangan(event, index, selectedPasangan)}
                            style = {{width: 350}}
                        >
                            {this.props.dataTA.map((item, i) => (
                                <MenuItem
                                    key = {i}
                                    insetChildren={true}
                                    value={item}
                                    primaryText={item.mahasiswa.NIM+" "+item.mahasiswa.nama}
                                />
                            ))}
                        </SelectField>
                        <SelectField
                            multiple={false}
                            hintText="Pilih Ruangan"
                            value={this.state.room}
                            onChange={(event, index, room)=>this.handleChangeRoom(event, index, room)}
                            style = {{width: 350}}
                        >
                            {this.props.ruangan.map((item, i) => (
                                <MenuItem
                                    key = {i}
                                    insetChildren={true}
                                    value={item}
                                    primaryText={item.nama}
                                />
                            ))}
                        </SelectField>

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
                      }

                      {this.state.selectedEvent !== null &&
                      <Dialog
                          title="Edit Acara"
                          actions= {actionsEditEvent}
                          modal={false}
                          open={this.state.modalEditEvent}
                          contentStyle={{width: 700}}
                          onRequestClose={()=>this.handleCloseEditEvent()}
                      >
                        <SelectField
                            multiple={false}
                            hintText="Pilih Tipe Acara"
                            value={this.state.tipeEvent}
                            onChange={(event, index, tipe_event)=>this.handleChangeTipeEvent(event, index, tipe_event)}
                            style = {{width: 350}}
                        >
                          <MenuItem
                              insetChildren={true}
                              value={seminarTA1}
                              primaryText="Seminar TA1"
                          /><MenuItem
                            insetChildren={true}
                            value={seminarTA2}
                            primaryText="Seminar TA2"
                        /><MenuItem
                            insetChildren={true}
                            value={sidangAkhir}
                            primaryText="Sidang Akhir"
                        />
                        </SelectField>
                        <SelectField
                            multiple={false}
                            hintText="Pilih ruangan"
                            value={this.state.room}
                            onChange={(event, index, room)=>this.handleChangeRoom(event, index, room)}
                            style = {{width: 350}}
                        >
                            {this.props.ruangan.map((item, i) => (
                                <MenuItem
                                    key = {i}
                                    insetChildren={true}
                                    value={item}
                                    primaryText={item.nama}
                                />
                            ))}
                        </SelectField>

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
                      }
                    <Dialog
                        title="Konfirmasi Hapus"
                        actions= {actionsConfirmDelete}
                        modal={false}
                        contentStyle={{width: 400}}
                        open={this.state.modalConfirmDelete}
                        onRequestClose={()=>this.handleCloseConfirmDelete()}
                    >
                      Anda yakin ingin menghapus acara ini?
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
  console.log(state.events)
  return {
        events: state.events,
        userInfo: state.activeUser,
        dataTA: state.dataTA,
        ruangan: state.ruangan
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
      fetchEvent: fetchEvent,
      fetchTA: fetchTA,
      move: moveEvent,
      fetchRuangan: fetchRuangan,
      schedule: schedule,
      save: save,
      logout:logout
    }, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, matchDispatchToProps)(timta_mng_allCalendars));
