import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import '../../scss/mahasiswa.scss';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import dateFormat from 'dateformat';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/imgprofile.jpg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchMhsEvent} from '../actions/event/fetch-mhs-event'


class mhs_jadwal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount(){
    this.props.fetchMhsEvent(this.props.userInfo.id)
  }

  handleToggle() {this.setState({open: !this.state.open})};

  handleClose() {this.setState({open: false})};

  renderEvent(event){
    if (event.tipe_event == 1){
      return (
          (<div>
            <p className="tableTitle">Jadwal Seminar Kerja Praktik Anda</p>
            <br/>
            <Row className="infoSidang">
              <Col md="6" xs="12">
                <Card>
                  <CardTitle title="Rincian Anda"/>
                  <CardText>
                    <Table selectable={false}>
                      <TableBody displayRowCheckbox={false}>
                        <TableRow>
                          <TableRowColumn className="attributeTable">Kelompok</TableRowColumn>
                          <TableRowColumn>{event.mahasiswa.id}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn className="attributeTable">Topik</TableRowColumn>
                          <TableRowColumn>{event.topik}</TableRowColumn>
                        </TableRow>
                          {event.mahasiswa.map((item, i)=>(
                              <TableRow>
                                <TableRowColumn className="attributeTable">Nama</TableRowColumn>
                                <TableRowColumn>{item.user.nama}</TableRowColumn>
                              </TableRow>
                          ))}
                          {event.mahasiswa.map((item, i)=>(
                              <TableRow>
                                <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                                <TableRowColumn>{item.user.NIM}</TableRowColumn>
                              </TableRow>
                          ))}
                          {event.dosen.map((item, i)=>(
                              <TableRow key={i}>
                                <TableRowColumn className="attributeTable">{"Pembimbing "+(i+1)}</TableRowColumn>
                                <TableRowColumn>{item.user.nama}</TableRowColumn>
                              </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardText>
                </Card>
                <br/>
              </Col>
              <Col md="6" xs="12">
                <Card>
                  <CardTitle title="Jadwal Anda"/>
                  <CardText>
                    <Table selectable={false}>
                      <TableBody displayRowCheckbox={false}>
                        <TableRow>
                          <TableRowColumn className="attributeTable">Tanggal Sidang</TableRowColumn>
                          <TableRowColumn>{dateFormat(event.start, "dddd, dd mmmm yyyy")}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn className="attributeTable">Waktu</TableRowColumn>
                          <TableRowColumn>{dateFormat(event.start, "HH.MM")+"-"+dateFormat(event.end, "HH.MM")}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn className="attributeTable">Ruang</TableRowColumn>
                          <TableRowColumn>7601</TableRowColumn>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardText>
                </Card>
              </Col>
            </Row>
            <br/>
          </div>)
      )
    } else if (event.tipe_event == 2){
        return (
            (<div>
              <p className="tableTitle">Jadwal Seminar TA1</p>
              <br/>
              <Row className="infoSidang">
                <Col md="6" xs="12">
                  <Card>
                    <CardTitle title="Rincian Anda"/>
                    <CardText>
                      <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Topik</TableRowColumn>
                            <TableRowColumn>{event.topik}</TableRowColumn>
                          </TableRow>
                            {event.mahasiswa.map((item, i)=>(
                                <TableRow>
                                  <TableRowColumn className="attributeTable">Nama</TableRowColumn>
                                  <TableRowColumn>{item.user.nama}</TableRowColumn>
                                </TableRow>
                            ))}
                            {event.mahasiswa.map((item, i)=>(
                                <TableRow>
                                  <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                                  <TableRowColumn>{item.user.NIM}</TableRowColumn>
                                </TableRow>
                            ))}
                            {event.dosen.map((item, i)=>(
                                <TableRow key={i}>
                                  <TableRowColumn className="attributeTable">{"Pembimbing "+(i+1)}</TableRowColumn>
                                  <TableRowColumn>{item.user.nama}</TableRowColumn>
                                </TableRow>
                            ))}
                            {event.dosen.map((item, i)=>(
                                <TableRow key={i}>
                                  <TableRowColumn className="attributeTable">{"Penguji "+(i+1)}</TableRowColumn>
                                  <TableRowColumn>{item.user.nama}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardText>
                  </Card>
                  <br/>
                </Col>
                <Col md="6" xs="12">
                  <Card>
                    <CardTitle title="Jadwal Anda"/>
                    <CardText>
                      <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Tanggal Sidang</TableRowColumn>
                            <TableRowColumn>{dateFormat(event.start, "dddd, dd mmmm yyyy")}</TableRowColumn>
                          </TableRow>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Waktu</TableRowColumn>
                            <TableRowColumn>{dateFormat(event.start, "HH.MM")+"-"+dateFormat(event.end, "HH.MM")}</TableRowColumn>
                          </TableRow>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Ruang</TableRowColumn>
                            <TableRowColumn>7601</TableRowColumn>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <br/>
            </div>)
        )
    } else if (event.tipe_event == 3){
        return (
            (<div>
              <p className="tableTitle">Jadwal Seminar TA 2 Anda</p>
              <br/>
              <Row className="infoSidang">
                <Col md="6" xs="12">
                  <Card>
                    <CardTitle title="Rincian Anda"/>
                    <CardText>
                      <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Topik</TableRowColumn>
                            <TableRowColumn>{event.topik}</TableRowColumn>
                          </TableRow>
                            {event.mahasiswa.map((item, i)=>(
                                <TableRow>
                                  <TableRowColumn className="attributeTable">Nama</TableRowColumn>
                                  <TableRowColumn>{item.user.nama}</TableRowColumn>
                                </TableRow>
                            ))}
                            {event.mahasiswa.map((item, i)=>(
                                <TableRow>
                                  <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                                  <TableRowColumn>{item.user.NIM}</TableRowColumn>
                                </TableRow>
                            ))}
                            {event.dosen.map((item, i)=>(
                                <TableRow key={i}>
                                  <TableRowColumn className="attributeTable">{"Pembimbing "+(i+1)}</TableRowColumn>
                                  <TableRowColumn>{item.user.nama}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardText>
                  </Card>
                  <br/>
                </Col>
                <Col md="6" xs="12">
                  <Card>
                    <CardTitle title="Jadwal Anda"/>
                    <CardText>
                      <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Tanggal Sidang</TableRowColumn>
                            <TableRowColumn>{dateFormat(event.start, "dddd, dd mmmm yyyy")}</TableRowColumn>
                          </TableRow>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Waktu</TableRowColumn>
                            <TableRowColumn>{dateFormat(event.start, "HH.MM")+"-"+dateFormat(event.end, "HH.MM")}</TableRowColumn>
                          </TableRow>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Ruang</TableRowColumn>
                            <TableRowColumn>7601</TableRowColumn>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <br/>
            </div>)
        )
    } else if (event.tipe_event == 4){
        return (
            (<div>
              <p className="tableTitle">Jadwal Sidang Akhir Anda</p>
              <br/>
              <Row className="infoSidang">
                <Col md="6" xs="12">
                  <Card>
                    <CardTitle title="Rincian Anda"/>
                    <CardText>
                      <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Topik</TableRowColumn>
                            <TableRowColumn>{event.topik}</TableRowColumn>
                          </TableRow>
                            {event.mahasiswa.map((item, i)=>(
                                <TableRow>
                                  <TableRowColumn className="attributeTable">Nama</TableRowColumn>
                                  <TableRowColumn>{item.user.nama}</TableRowColumn>
                                </TableRow>
                            ))}
                            {event.mahasiswa.map((item, i)=>(
                                <TableRow>
                                  <TableRowColumn className="attributeTable">NIM</TableRowColumn>
                                  <TableRowColumn>{item.user.NIM}</TableRowColumn>
                                </TableRow>
                            ))}
                            {event.dosen.map((item, i)=>(
                                <TableRow key={i}>
                                  <TableRowColumn className="attributeTable">{"Pembimbing "+(i+1)}</TableRowColumn>
                                  <TableRowColumn>{item.user.nama}</TableRowColumn>
                                </TableRow>
                            ))}
                            {event.dosen.map((item, i)=>(
                                <TableRow key={i}>
                                  <TableRowColumn className="attributeTable">{"Penguji "+(i+1)}</TableRowColumn>
                                  <TableRowColumn>{item.user.nama}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardText>
                  </Card>
                  <br/>
                </Col>
                <Col md="6" xs="12">
                  <Card>
                    <CardTitle title="Jadwal Anda"/>
                    <CardText>
                      <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Tanggal Sidang</TableRowColumn>
                            <TableRowColumn>{dateFormat(event.start, "dddd, dd mmmm yyyy")}</TableRowColumn>
                          </TableRow>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Waktu</TableRowColumn>
                            <TableRowColumn>{dateFormat(event.start, "HH.MM")+"-"+dateFormat(event.end, "HH.MM")}</TableRowColumn>
                          </TableRow>
                          <TableRow>
                            <TableRowColumn className="attributeTable">Ruang</TableRowColumn>
                            <TableRowColumn>7601</TableRowColumn>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardText>
                  </Card>
                </Col>
              </Row>
            </div>)
        )
    }
  }

  render() {
        return (
            <MuiThemeProvider>
              <div>
                <AppBar
                    title="Halaman Mahasiswa - Jadwal"
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

                  {this.props.eventMhs !== 0 &&
                  <div>
                  {this.props.eventMhs.map((event, idx) =>(
                      this.renderEvent(event)
                  ))}
                  </div>
                  }

                  {this.props.eventMhs.length === 0 &&
                  <div style={{marginTop: 50}}>
                  <Row>
                    <Col md = "2" xs="2">
                    </Col>
                    <Col md = "8" xs="8">
                      <Card>  
                        <CardTitle title="Jadwal Anda"/>
                        <CardText>
                          Belum ada jadwal.
                        </CardText>
                      </Card>
                    </Col>                  
                    <Col md = "2" xs="2">
                    </Col>
                  </Row>
                  </div>
                  }

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
                          <Col className="emailProfile">{"Mahasiswa"}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                  <hr/>
                  <MenuItem insetChildren={true} href="/mhs_jadwal" style={{backgroundColor:'#b0bec5'}}>Jadwal</MenuItem>
                  <MenuItem insetChildren={true} href="/mhs_profile">Profil</MenuItem>

                  <br/>
                </Drawer>
              </div>
            </MuiThemeProvider>
        );
  }
}

function mapStateToProps(state) {
    return {
        eventMhs: state.eventMhs,
        userInfo: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchMhsEvent: fetchMhsEvent,

    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(mhs_jadwal);
