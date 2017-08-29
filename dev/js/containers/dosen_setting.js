import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import '../../scss/timTA.scss';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import windowDimensions from 'react-window-dimensions';
import imgProfile from '../../scss/public/images/dosenprofile.jpg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import {fetchCalendar} from '../actions/calendar/fetch-calendar'
import {selectCalendar} from '../actions/calendar/select-calendar'
import {changeStatus} from '../actions/calendar/change-status'

class dosen_setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount(){
    this.props.fetchCalendar(this.props.dataUser.id)
  }
  
  handleSelect(i){
      let tempCalList = this.props.calendarList;
      tempCalList[i].status = !this.props.calendarList[i].status;
      // this.setState({calendarList: tempCalList});
      this.props.changeStatus(tempCalList);
      console.log(this.props.calendarList);
  }

  handleSave(){
    let arr = []
    this.props.calendarList.forEach(function(item){
      if (item.status == 1){
        let obj = {
          id: item.calendar_id,
          name: item.calendar_name
        }
        arr.push(obj)
      }
    })
      let objs = {
        calendarList: arr,
          user_id: this.props.dataUser.id
      }
      console.log(objs)
    this.props.selectCalendar(objs)
    //kirim data calendarlist ke BE
  }
  
  handleToggle() {this.setState({open: !this.state.open})};

  handleClose() {this.setState({open: false})};
  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBar
          title="Halaman Dosen - Profil dan Pengaturan"
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
        
        <Row style={{marginTop: 70}}>
          <Col md="6" xs ="12">
            <Row>
              <Col md="3" xs="12" style={{alignItems: 'center', textAlign: 'center'}}>
                <img src={imgProfile} className="imgProfileBig"/>
              </Col>
              <Col md="9" xs="12">
                <Card className="infoProfile">
                  <CardTitle title={this.props.dataUser.nama}/>
                  <CardText>
                    Email: {this.props.dataUser.email}                        
                  </CardText>
                </Card>
                <br/>
              </Col>
            </Row>
          </Col>
          <Col md="6" xs ="12">
            <p style={{fontSize: 20}}>Shared Calendar</p>
              <List>
                {this.props.calendarList.map((item, i) => (
                  <ListItem key={i} primaryText={item.calendar_name} leftCheckbox={<Checkbox checked={this.props.calendarList[i].status} onCheck={()=>this.handleSelect(i)}/>}/>
                ))}
              </List>
              <RaisedButton
                backgroundColor="#F1D600"
                label="SAVE"
                labelPosition="after"
                icon={<i className="material-icons" style={{color:'black'}}>save</i>}
                onTouchTap={()=>this.handleSave()}
              />
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
                  <Col className="nameProfile">{this.props.dataUser.nama}</Col>
                  <Col className="emailProfile">{this.props.dataUser.email}</Col>
                  <Col className="emailProfile">{this.props.dataUser.peran}</Col>
                </Row>
              </Col>
            </Row>
          </div>
          <hr/>
          <MenuItem insetChildren={true} href="/dosen_calendar">Kalender</MenuItem>
          <MenuItem insetChildren={true}style={{backgroundColor:'#b0bec5'}} href="/dosen_setting">Profil dan Pengaturan</MenuItem>
          <br/>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
      dataUser: state.activeUser,
        calendarList: state.calendar
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchCalendar: fetchCalendar,
        selectCalendar: selectCalendar,
        changeStatus: changeStatus
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(windowDimensions()(dosen_setting));
