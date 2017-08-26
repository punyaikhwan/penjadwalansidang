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

class dosen_setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      calendarList: [
        {calId: 1, calName: "primary", status: true},
        {calId: 2, calName: "secondary calendar", status: true},
        {calId: 3, calName: "third calendar", status: true}
      ],
      dataUser: {
        nama: "Dessi Puji Lestari",
        email: "dessipuji@informatika.org",
        peran: "Dosen"
      }
    };
  }


  handleSelect(i){
      let tempCalList = this.state.calendarList;
      tempCalList[i].status = !this.state.calendarList[i].status;
      this.setState({calendarList: tempCalList});
      console.log(this.state.calendarList);
  }

  handleSave(){
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
                  <CardTitle title={this.state.dataUser.nama}/>
                  <CardText>
                    Email: {this.state.dataUser.email}                        
                  </CardText>
                </Card>
                <br/>
              </Col>
            </Row>
          </Col>
          <Col md="6" xs ="12">
            <p style={{fontSize: 20}}>Shared Calendar</p>
              <List>
                {this.state.calendarList.map((item, i) => (
                  <ListItem key={i} primaryText={item.calName} leftCheckbox={<Checkbox checked={this.state.calendarList[i].status} onCheck={()=>this.handleSelect(i)}/>}/>
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
                  <Col className="nameProfile">{this.state.dataUser.nama}</Col>
                  <Col className="emailProfile">{this.state.dataUser.email}</Col>
                  <Col className="emailProfile">{this.state.dataUser.peran}</Col>
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
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(windowDimensions()(dosen_setting));
