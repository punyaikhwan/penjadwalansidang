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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/imgprofile.jpg';
import {fetchKP} from '../actions/kp/fetch-kp'
import {deleteKP} from '../actions/kp/delete-kp'
import {newKP} from '../actions/kp/new-kp'
import {editKP} from '../actions/kp/edit-kp'
import {fetchMahasiswa} from '../actions/user/fetch-mahasiswa'
import {fetchDosen} from '../actions/user/fetch-dosen'
import {tempEditKP} from '../actions/kp/temp-edit-kp'

class timta_mng_pasangan_KP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modalTambahMahasiswa: false,
      modalEditTopic: false,
      modalTambahDosen: false,
      values: [],
      topic: "",
      dosen: "",
      selectedKelompok: 0,
    };
  }

  componentDidMount(){
    this.props.fetchKP();
    this.props.fetchMahasiswa();
    this.props.fetchDosen();
  }

  handleToggle() {this.setState({open: !this.state.open})};

  handleClose () { this.setState({open: false})};

  handleOpenTambahMahasiswa() {this.setState({modalTambahMahasiswa: true})};
  handleCloseTambahMahasiswa () { this.setState({modalTambahMahasiswa: false})};
  handleChangeMahasiswa (event, index, values) {this.setState({values})};
  handleOpenEditTopic() {this.setState({modalEditTopic: true})};
  handleCloseEditTopic () { this.setState({modalEditTopic: false})};
  handleChangeTopic (event) {this.setState({topic: event.target.value})};
  handleOpenTambahDosen () {this.setState({modalTambahDosen: true})};
  handleCloseTambahDosen () { this.setState({modalTambahDosen: false})};
  handleChangeDosen(event, index, dosen) {this.setState({dosen})};

  handleDeleteDosen(i) {
    let tempDataKelompok = this.props.kelompok;
    tempDataKelompok[this.state.selectedKelompok].dosen.splice(i,1);
    console.log("data Kelompok:", tempDataKelompok);
    this.props.edit(tempDataKelompok, this.state.selectedKelompok);
    this.forceUpdate();
  }

  handleDeleteMahasiswa(i) {
      let tempDataKelompok = this.props.kelompok;
      tempDataKelompok[this.state.selectedKelompok].mahasiswa.splice(i,1);
      console.log("data Kelompok:", tempDataKelompok);
      this.props.edit(tempDataKelompok, this.state.selectedKelompok);
      this.forceUpdate();
      this.setState({values: []})
  }

  handleEditTopic() {
    let tempDataKelompok = this.props.kelompok;
    console.log(this.state.topic);
    tempDataKelompok[this.state.selectedKelompok].topik = this.state.topic;
    this.props.edit(tempDataKelompok, this.state.selectedKelompok);
    this.handleCloseEditTopic();
  }

  handleTambahKelompok() {
    this.props.newKP();
  }

  handleDeleteKelompok(i) {
    this.props.deleteKP(i);
  }

  handleTambahMahasiswa() {
    let tempDataKelompok = this.props.kelompok;
    console.log(this.state.values);
    let tempNewMhs = {
      user : this.state.values
    }
    tempDataKelompok[this.state.selectedKelompok].mahasiswa.push(tempNewMhs);
      this.props.edit(tempDataKelompok, this.state.selectedKelompok);
    this.handleCloseTambahMahasiswa();
  }

  handleTambahDosen() {
    let tempDataKelompok = this.props.kelompok;
    console.log("Dosen tmbah:", this.state.dosen);
      let tempNewDosen = {
          user : this.state.dosen
      }
    tempDataKelompok[this.state.selectedKelompok].dosen.push(tempNewDosen);
    console.log("data Kelompok:", tempDataKelompok);
    this.props.edit(tempDataKelompok, this.state.selectedKelompok);
    this.setState({dosen: ""});
    this.handleCloseTambahDosen();
  }

  handleSelect(i, data){
      this.setState({selectedKelompok:i})
  }

  handleSave(){
    this.props.editKP(this.props.kelompok);
  }

  render() {
    const actionsTambahMahasiswa = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseTambahMahasiswa()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleTambahMahasiswa()}
      />,
    ];

    const actionsEditTopic = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseEditTopic}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleEditTopic()}
      />,
    ];

    const actionsTambahDosen = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseTambahDosen}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleTambahDosen()}
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
          title="Dashboard Tim TA - Daftar Pasangan Kerja Praktik"
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
            <Col md="4" xs="12">
              <div>
                <Subheader>Daftar Kelompok</Subheader>
                <RaisedButton
                  label="Tambah kelompok"
                  labelPosition="after"
                  backgroundColor="rgb(166, 233, 255)"
                  icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                  onTouchTap={()=>this.handleTambahKelompok()}
                />
                {this.props.kelompok.length !== 0 &&
                <ScrollArea
                  horizontal={false}
                  style={{height: 500, borderLeftWidth: 2}}
                  speed={0.8}
                >
                  <List>
                    {this.props.kelompok.map((item, i) => (
                      <Row>
                        <Col md="8" xs="8">
                          <ListItem key={i} onTouchTap={()=>this.handleSelect(i, item)}>
                            {"Kelompok "+ item.id}
                          </ListItem>
                        </Col>
                        <Col md="4" xs ="4" style={{marginTop:7}}>
                          <FlatButton
                            labelPosition="after"
                            icon={<i className="material-icons" style={{color:'black'}}>close</i>}
                            onClick={()=>this.handleDeleteKelompok(item.id)}
                          />
                        </Col>
                      </Row>
                    ))
                    }
                  </List>
                </ScrollArea>
                }
                {this.props.kelompok.length === 0 &&
                  <p><i>Tidak ada kelompok</i></p>
                }
              </div>
            </Col>
            <Col md="8" xs="12">
              {this.props.kelompok.length !== 0 &&
              <div>
                <p style={{fontSize:20, fontWight:'bold', textAlign: 'center'}}>{"Kelompok "+(this.props.kelompok[this.state.selectedKelompok].id)}</p>
                <br/>
                <p style={{fontSize:16}}>Daftar Mahasiswa</p>
                <div>
                  <ScrollArea
                    horizontal={false}
                    style={{height: 250}}
                    speed={0.8}
                  >
                    <RaisedButton
                      label="Tambah mahasiswa"
                      labelPosition="after"
                      backgroundColor="rgb(166, 233, 255)"
                      icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                      onClick={()=>this.handleOpenTambahMahasiswa()}
                    />

                    <List>
                    {this.props.kelompok[this.state.selectedKelompok].mahasiswa.map((item, i)=> (
                        <Row>
                          <Col md="8" xs="8">
                            <ListItem key={i}>
                              {item.user.nama}
                            </ListItem>
                          </Col>
                          <Col md="4" xs ="4" style={{marginTop:7}}>
                            <FlatButton
                              labelPosition="after"
                              icon={<i className="material-icons" style={{color:'black', fontSize: '14px'}}>close</i>}
                              onClick={()=>this.handleDeleteMahasiswa(i)}
                            />
                          </Col>
                        </Row>
                      ))}
                      </List>
                  </ScrollArea>
                </div>
                <br/>
                <br/>
                <p style={{fontSize:16}}>Topik Kerja Praktik</p>
                <Row>
                  <Col md="10" xs="10">
                    <p style={{fontSize: 20}}>{this.props.kelompok[this.state.selectedKelompok].topik}</p>
                  </Col>
                  <Col md="2" xs ="2">
                    <FlatButton
                      icon={<i className="material-icons" style={{color:'black'}}>edit</i>}
                      onClick={() => this.handleOpenEditTopic()}
                    />
                  </Col>
                </Row>
                <br/>
                <br/>
                <p style={{fontSize:16}}>Dosen Pembimbing</p>
                {this.props.kelompok[this.state.selectedKelompok].dosen.length < 2 &&
                  <RaisedButton
                    label="Tambah Dosen"
                    labelPosition="after"
                    backgroundColor="rgb(166, 233, 255)"
                    icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                    onClick={()=>this.handleOpenTambahDosen()}
                  />
                }
                {this.props.kelompok[this.state.selectedKelompok].dosen.length > 0 &&
                  <List>
                    {this.props.kelompok[this.state.selectedKelompok].dosen.map((item, i) =>(
                      <Row>
                        <Col md="8" xs="8">
                          <ListItem key={i}>
                            {item.user.nama}
                          </ListItem>
                        </Col>
                        <Col md="4" xs ="4" style={{marginTop:7}}>
                          <FlatButton
                            icon={<i className="material-icons" style={{color:'black', fontSize:'14px'}}>close</i>}
                            onClick={()=>this.handleDeleteDosen(i)}
                          />
                        </Col>
                      </Row>
                    ))}
                  </List>
                }
                {this.props.kelompok[this.state.selectedKelompok].dosen.length == 0 &&
                    <p style={{fontSize:14}}><i>Belum ada dosen.</i></p>
                }
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
          <MenuItem insetChildren={true} href="/timta_mng_pasangan_TA">Daftar Pasangan TA</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_pasangan_KP">Daftar Pasangan KP</MenuItem>

          <br/>
          <p className="menuTitle">Manajemen Jadwal</p>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarKP">Seminar KP</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA1">Seminar TA 1</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA2">Seminar TA 2</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_sidangTA">Sidang Akhir</MenuItem>
        </Drawer>

        <Dialog
          title="Tambah Mahasiswa Baru"
          actions= {actionsTambahMahasiswa}
          modal={false}
          open={this.state.modalTambahMahasiswa}
          onRequestClose={()=>this.handleCloseTambahMahasiswa()}
        >
          <SelectField
            multiple={false}
            hintText="Select a name"
            value={this.state.values}
            onChange={(event, index, values)=>this.handleChangeMahasiswa(event, index, values)}
          >
          {this.props.mahasiswa.map((item) => (
            <MenuItem
              key={item.id}
              insetChildren={true}
              value={item}
              primaryText={item.nama}
            />
          ))
          }
          </SelectField>
        </Dialog>

        <Dialog
          title="Edit Topic"
          actions= {actionsEditTopic}
          modal={false}
          open={this.state.modalEditTopic}
          onRequestClose={()=>this.handleCloseEditTopic()}
        >
        <TextField
          hintText="Tulis topik di sini..."
          defaultValue = {this.props.kelompok[this.state.selectedKelompok] ? this.props.kelompok[this.state.selectedKelompok].topik : ""}
          style={{width:500}}
          onChange={(event)=>this.handleChangeTopic(event)}
        />
        </Dialog>

        <Dialog
          title="Tambah Dosen Pembimbing"
          actions= {actionsTambahDosen}
          modal={false}
          open={this.state.modalTambahDosen}
          onRequestClose={()=>this.handleCloseTambahDosen()}
        >
          <SelectField
            multiple={false}
            hintText="Select a name"
            value = {this.state.dosen}
            onChange={(event, index, dosen)=>this.handleChangeDosen(event, index, dosen)}
          >
          {this.props.dosen.map((item) => (
            <MenuItem
              key={item.id}
              insetChildren={true}
              value={item}
              primaryText={item.nama}
            />
          ))
          }
          </SelectField>
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
        kelompok: state.kelompokKP,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchKP:fetchKP,
        deleteKP: deleteKP,
        newKP: newKP,
        editKP: editKP,
        fetchMahasiswa: fetchMahasiswa,
        fetchDosen: fetchDosen,
        edit: tempEditKP,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(windowDimensions()(timta_mng_pasangan_KP));
