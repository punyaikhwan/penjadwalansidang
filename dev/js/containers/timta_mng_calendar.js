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
import TextField from 'material-ui/TextField';
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

import imgProfile from '../../scss/public/images/admin.png';
import '../../scss/timTA.scss';
import events from '../reducers/events';
import moment from 'moment';
import dateFormat from 'dateformat';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {moveEvent} from '../actions/event/move-event'
import {fetchEvent} from '../actions/event/fetch-events'
import {finalize} from '../actions/event/finalize'
import {Router, Redirect} from 'react-router'
import {logout} from '../actions/auth/logout'


BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class timta_mng_calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      statusJadwal: 0,
      /*
        0: menunggu finalisasi
        1: sudah difinalisasi
      */
      selectedEvent: null,
      selectedDate: null,
      modalEvent: false,
      openSnackbar: false,
    };
    this.moveEvent = this.moveEvent.bind(this)
  }

  componentDidMount(){
    document.title = "Finalisasi Jadwal"

    // setTimeout(()=> {
    //   if (this.props.events.length !== 0) 
    //     this.setState({selectedDate: this.props.events[0].start});
    //     console.log("DATEEEEE", this.state.selectedDate);
    // }, 1000)

  }

  handleToggle(){this.setState({open: !this.state.open})};

  handleClose() {
    this.setState({open: false});
  }

  moveEvent({ event, start, end }) {
    console.log("start ", start, "end ",end);
    let events = this.props.events;
    const idx = this.props.events.indexOf(event);
    let updatedEvent = event;
    updatedEvent.start = start;
    updatedEvent.end = end;

    const nextEvents = events
    nextEvents.splice(idx, 1, updatedEvent)
    this.props.move(nextEvents);
  }

  handleSelectedEvent(event) {
    console.log(this.props.events)
    this.setState({selectedEvent: event});
    this.setState({modalEvent: true});
    console.log(this.props.events);
  }

  finalize(){
    this.props.finalize(this.props.tipe, this.props.events)
    setTimeout(()=> {
      this.setState({statusJadwal: 1})
    }, 1000);
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
        else if(this.props.userInfo.peran == 2) {
            if (this.state.statusJadwal === 0) {
                const actionsModalEvent = [
                  <FlatButton
                      label="OK"
                      primary={true}
                      onClick={() => this.setState({modalEvent: false})}
                  />
                ];
                return (
                    <MuiThemeProvider>
                      <div>
                        <AppBar
                            title="Dashboard Tim TA - Finalisasi Kalender"
                            iconElementLeft={
                              <IconButton onClick={() => this.handleToggle()}>
                                <i className="material-icons" style={{color: 'white'}}>menu</i>
                              </IconButton>
                            }
                            iconElementRight={
                              <RaisedButton
                                  label="Logout"
                                  backgroundColor="#F44336"
                                  labelColor="#fff"
                                  onTouchTap={() => this.handleLogout()}
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

                        <div className="containerCalendar">
                            {this.state.statusJadwal === 0 &&
                            <RaisedButton
                                label="Finalisasi"
                                backgroundColor="#0FC722"
                                labelColor="#fff"
                                style={{marginBottom: 20}}
                                onTouchTap={() => this.finalize()}
                            />
                            }
                            {this.state.statusJadwal === 1 &&
                            <RaisedButton
                                label="Sudah difinalisasi"
                                backgroundColor="#0FC722"
                                labelColor="#fff"
                                disabled
                                style={{marginBottom: 20}}
                            />
                            }
                          <DragAndDropCalendar
                              selectable
                              events={this.props.events}
                              onEventDrop={this.moveEvent}
                              defaultView='month'
                              onSelectEvent={event => this.handleSelectedEvent(event)}
                              onSelectSlot={(slotInfo) => {
                                  this.setState({selectedDate: slotInfo.start});
                                  console.log(this.state.selectedDate);
                              }}
                          />
                        </div>

                          {this.state.selectedEvent !== null &&
                          <Dialog
                              title={this.state.selectedEvent.title}
                              actions={actionsModalEvent}
                              modal={false}
                              contentStyle={{width: 600}}
                              open={this.state.modalEvent}
                              onRequestClose={() => this.setState({modalEvent: false})}
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
                                  {this.state.selectedEvent.anggota.map((item, i) => (
                                      <TableRow key={i} displayBorder={false}>
                                        <TableRowColumn
                                            className="attributeTable">{i === 0 ? "Mahasiswa" : ""}</TableRowColumn>
                                        <TableRowColumn>{item.user.NIM + " " + item.user.nama}</TableRowColumn>
                                      </TableRow>
                                  ))}
                                  {this.state.selectedEvent.dosen.map((item, i) => (
                                      <TableRow key={i} displayBorder={false}>
                                        <TableRowColumn
                                            className="attributeTable">{i === 0 ? "Dosen" : ""}</TableRowColumn>
                                        <TableRowColumn>{item.user.nama}</TableRowColumn>
                                      </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </Dialog>
                          }
                      </div>
                    </MuiThemeProvider>
                );
            } else {
                return (
                    <div>
                      <Redirect to="/timta_allcalendars"/>
                    </div>
                )
            }
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
        events: state.calonEvent,
        tipe: state.tipeEvent,
        userInfo: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        move: moveEvent,
        fetchEvent: fetchEvent,
        finalize: finalize,
        logout: logout
    }, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, matchDispatchToProps)(timta_mng_calendar));
