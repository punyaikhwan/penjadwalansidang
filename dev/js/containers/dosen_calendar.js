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
import imgProfile from '../../scss/public/images/lecturer.PNG';
import '../../scss/timTA.scss';
import moment from 'moment';
import dateFormat from 'dateformat';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchEvent} from '../actions/event/fetch-events';
import {logout} from '../actions/auth/logout'
import {Router, Redirect} from 'react-router'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);


class dosen_calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedEvent: null,
      selectedDate: null,
      modalEvent: false,
      openSnackbar: false,
    };

  }

  componentDidMount(){
    document.title = "Kalender Dosen"
    this.props.fetchEvent();
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
    this.setState({selectedEvent: event});
    this.setState({modalEvent: true});
  }

  eventStyleGetter(event, start, end, isSelected) {
     console.log(event);
    var backgroundColor = '204FA7';
     for (var i=0; i< event.pembimbing.length; i++) {
      if (event.pembimbing[i].user.email === this.props.userInfo.email) {
        console.log("halooo");
        backgroundColor = '#247510';
      }
     }
    for (var i=0; i< event.penguji.length; i++) {
      if (event.penguji[i].user.email === this.props.userInfo.email) {
        console.log("halooo");
        backgroundColor = '#247510';
      }
     }
    var style = {
        backgroundColor: backgroundColor,
    };
    return {
        style: style
    };
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
            const actionsModalEvent = [
                <FlatButton
                    label="OK"
                    primary={true}
                    onClick={()=>this.setState({modalEvent: false})}
                />
            ];
            return (
                <MuiThemeProvider>
                  <div>
                    <AppBar
                        title="Halaman Dosen - Kalender"
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
                              <Col className="emailProfile">{"Dosen"}</Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                      <hr/>
                      <MenuItem insetChildren={true} style={{backgroundColor:'#b0bec5'}} href="/dosen_calendar">Kalender</MenuItem>
                      <MenuItem insetChildren={true} href="/dosen_setting">Profil dan Pengaturan</MenuItem>
                      <br/>
                    </Drawer>

                    <div className="containerCalendar">
                      <p style={{fontSize: 20}}><i className="material-icons" style={{color: 'black'}}>info</i> Jadwal Anda yang berwarna hijau.</p><br/>
                      <BigCalendar
                          selectable
                          events={this.props.events}
                          defaultView='month'
                          onSelectEvent= {event => this.handleSelectedEvent(event)}
                          onSelectSlot={(slotInfo) => {
                              this.setState({selectedDate: slotInfo.start});
                              console.log(this.state.selectedDate);
                          }}

                          eventPropGetter={(this.eventStyleGetter.bind(this))}
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
                              {this.state.selectedEvent.pembimbing.map((item, i) => (
                                  <TableRow key={i} displayBorder={false}>
                                    <TableRowColumn className="attributeTable">{i === 0 ? "Pembimbing": ""}</TableRowColumn>
                                    <TableRowColumn>{item.user.nama}</TableRowColumn>
                                  </TableRow>
                              ))}
{this.state.selectedEvent.penguji.map((item, i) => (
                                  <TableRow key={i} displayBorder={false}>
                                    <TableRowColumn className="attributeTable">{i === 0 ? "Penguji N8": ""}</TableRowColumn>
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
        }
        else if(this.props.userInfo.peran == 2){
            return(
                <div>
                  <Redirect to="/timta_mng_user"/>
                </div>
            )
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
        userInfo: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
      fetchEvent: fetchEvent,
        logout:logout
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(dosen_calendar);
