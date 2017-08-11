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

import imgProfile from '../../scss/public/images/imgprofile.jpg';
import '../../scss/timTA.scss';
import events from './events';
import moment from 'moment';
import dateFormat from 'dateformat';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class timta_mng_calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      events: events.result,
      selectedEvent: null,
      modalEvent: false,
      openSnackbar: false,
    };
    this.moveEvent = this.moveEvent.bind(this)
  }

  handleToggle(){this.setState({open: !this.state.open})};

  handleClose() {
    this.setState({open: false});
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;
    const idx = events.indexOf(event);
    let updatedEvent = event;
    updatedEvent.start = start;
    updatedEvent.end = end;

    const nextEvents = events
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({events: nextEvents})
  }

  handleSelectedEvent(event) {
    this.setState({selectedEvent: event});
    this.setState({modalEvent: true});
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
          title="Dashboard Tim TA - Manajemen Jadwal Seminar KP"
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
          <MenuItem insetChildren={true} href="/timta_mng_pasangan">Daftar Pasangan</MenuItem>
          <br/>
          <p className="menuTitle">Manajemen Jadwal</p>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarKP" style={{backgroundColor:'#b0bec5'}}>Seminar KP</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA1">Seminar TA 1</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA2">Seminar TA 2</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_sidangTA">Sidang Akhir</MenuItem>
        </Drawer>

        <div className="containerCalendar">
          <RaisedButton
            label="Finalisasi"
            backgroundColor="#0FC722"
            labelColor= "#fff"
            style={{marginBottom: 20}}
          />
          <DragAndDropCalendar
            selectable
            events={this.state.events}
            onEventDrop={this.moveEvent}
            defaultView='month'
            defaultDate={this.state.events[1].start}
            onSelectEvent= {event => this.handleSelectedEvent(event)}
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
                  <TableRowColumn className="attributeTable">Topik</TableRowColumn>
                  <TableRowColumn>{this.state.selectedEvent.topik}</TableRowColumn>
                </TableRow>
                {this.state.selectedEvent.anggota.map((item, i) => (
                  <TableRow key={i} displayBorder={false}>
                    <TableRowColumn className="attributeTable">{i===0 ? "Mahasiswa":""}</TableRowColumn>
                    <TableRowColumn>{item}</TableRowColumn>
                  </TableRow>
                ))}
                {this.state.selectedEvent.dosen.map((item, i) => (
                <TableRow key={i} displayBorder={false}>
                  <TableRowColumn className="attributeTable">{i === 0 ? "Dosen": ""}</TableRowColumn>
                  <TableRowColumn>{item}</TableRowColumn>
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

export default DragDropContext(HTML5Backend)(timta_mng_calendar);
