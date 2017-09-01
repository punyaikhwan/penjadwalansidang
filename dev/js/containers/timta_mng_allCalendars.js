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
import imgProfile from '../../scss/public/images/dosenprofile.jpg';
import '../../scss/timTA.scss';
import moment from 'moment';
import dateFormat from 'dateformat';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchEvent} from '../actions/event/fetch-events';
import {moveEvent} from '../actions/event/move-event';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);


const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class timta_mng_allCalendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedEvent: null,
      selectedDate: null,
      modalEvent: false,
      openSnackbar: false,
      disabled: true,
      dataUser: {
        nama: "Dessi Puji Lestari",
        email: "dessipuji@informatika.org",
        peran: "Dosen"
      }
    };

    this.moveEvent = this.moveEvent.bind(this)
  }

  componentDidMount(){
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
    this.setState({disabled: false});
    // this.setState({events: nextEvents})
  }

  handleSave() {
    this.setState({disabled: true});
    //Add function to change events in DB
  }
  render() {
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
          title="Dashboard Tim TA - Kalender"
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
            <MenuItem insetChildren={true} href="/timta_mng_pasangan_TA">Daftar Pasangan TA</MenuItem>
            <br/>
            <p className="menuTitle">Manajemen Jadwal</p>
            <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA1">Seminar TA 1</MenuItem>
            <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA2">Seminar TA 2</MenuItem>
            <MenuItem insetChildren={true} href="/timta_mng_jadwal_sidangTA">Sidang Akhir</MenuItem>
            <hr/>
            <MenuItem insetChildren={true} style={{backgroundColor:'#b0bec5'}} href="/timta_allcalendars">Manajemen Kalender</MenuItem>
          <hr/>
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
            onSelectSlot={(slotInfo) => {
              this.setState({selectedDate: slotInfo.start});
              console.log(this.state.selectedDate);
            }}
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
                    <TableRowColumn>{this.state.selectedEvent.room_id}</TableRowColumn>
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
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.events)
  return {
        events: state.events
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
      fetchEvent: fetchEvent,
      move: moveEvent,
    }, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, matchDispatchToProps)(timta_mng_allCalendars));
