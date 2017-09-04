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
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import windowDimensions from 'react-window-dimensions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/admin.png';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchTA} from '../actions/ta/fetch-ta'
import {editTA} from '../actions/ta/edit-ta'
import {newTA} from '../actions/ta/new-ta'
import {deleteTA} from '../actions/ta/delete-ta'
import {fetchMahasiswa} from '../actions/user/fetch-mahasiswa'
import {fetchDosen} from '../actions/user/fetch-dosen'
import {tempEditTA} from '../actions/ta/temp-edit-ta'

class timta_mng_pasangan_TA extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedMhs: 0,
      modalTambahMahasiswa: false,
      modalTambahDosenPembimbing: false,
      modalTambahDosenPengujiTA1: false,
      modalTambahDosenPengujiAkhir: false,
      modalEditTopic: false,
      mahasiswa: "",
      topic: "",
      dosenPembimbing: "",
      dosenPengujiTA1: "",
      dosenPengujiAkhir: ""
    };
  }

  handleToggle() {this.setState({open: !this.state.open})};
  handleClose () {this.setState({open: false})};
  handleOpenTambahMahasiswa() {this.setState({modalTambahMahasiswa: true})};
  handleCloseTambahMahasiswa () { this.setState({modalTambahMahasiswa: false})};
  handleChangeMahasiswa (event, index, mahasiswa) {this.setState({mahasiswa})};
  handleOpenEditTopic() {this.setState({modalEditTopic: true})};
  handleCloseEditTopic () { this.setState({modalEditTopic: false})};
  handleChangeTopic (event) {this.setState({topic: event.target.value})};
  handleOpenTambahDosenPembimbing () {this.setState({modalTambahDosenPembimbing: true})};
  handleCloseTambahDosenPembimbing () { this.setState({modalTambahDosenPembimbing: false})};
  handleChangeDosenPembimbing(event, index, dosenPembimbing) {this.setState({dosenPembimbing})};
  handleOpenTambahDosenPengujiTA1 () {this.setState({modalTambahDosenPengujiTA1: true})};
  handleCloseTambahDosenPengujiTA1 () { this.setState({modalTambahDosenPengujiTA1: false})};
  handleChangeDosenPengujiTA1(event, index, dosenPengujiTA1) {this.setState({dosenPengujiTA1})};
  handleOpenTambahDosenPengujiAkhir () {this.setState({modalTambahDosenPengujiAkhir: true})};
  handleCloseTambahDosenPengujiAkhir () { this.setState({modalTambahDosenPengujiAkhir: false})};
  handleChangeDosenPengujiAkhir(event, index, dosenPengujiAkhir) {this.setState({dosenPengujiAkhir})};

  handleEditTopic() {
    let tempDataTA = this.props.dataTA;
    tempDataTA[this.state.selectedMhs].topik = this.state.topic;
    this.props.edit(tempDataTA, this.state.selectedMhs)
    this.setState({topic: ""});
    this.handleCloseEditTopic();
  }

  handleTambahMahasiswa() {
    this.props.newTA(this.state.mahasiswa.id);
    this.setState({mahasiswa: ""});
    this.handleCloseTambahMahasiswa();

  }

  componentDidMount(){
    this.props.fetchTA();
    this.props.fetchMahasiswa();
    this.props.fetchDosen();
  }

  handleDeleteMahasiswa(i) {
    this.props.deleteTA(i)
  }

  handleTambahDosenPembimbing() {
    let tempDataTA = this.props.dataTA;
    let tempNewDosen = {
        user : this.state.dosenPembimbing
    }
    tempDataTA[this.state.selectedMhs].pembimbing.push(tempNewDosen);
    this.props.edit(tempDataTA, this.state.selectedMhs);
    this.setState({dosenPembimbing: ""});
    this.handleCloseTambahDosenPembimbing();
  }

  handleDeleteDosenPembimbing(i) {
    let tempDataTA = this.props.dataTA;
    tempDataTA[this.state.selectedMhs].pembimbing.splice(i,1);
    this.props.edit(tempDataTA, this.state.selectedMhs);
    this.forceUpdate();
  }

  handleTambahDosenPengujiTA1() {
    let tempDataTA = this.props.dataTA;
    let tempNewDosen = {
        user : this.state.dosenPengujiTA1
    }
    tempDataTA[this.state.selectedMhs].penguji.push(tempNewDosen);
    this.props.edit(tempDataTA, this.state.selectedMhs);
    this.setState({dosenPengujiTA1: ""});
    this.handleCloseTambahDosenPengujiTA1();
  }

  handleDeleteDosenPengujiTA1(i) {
    let tempDataTA = this.props.dataTA;
    tempDataTA[this.state.selectedMhs].penguji.splice(i,1);
    this.props.edit(tempDataTA, this.state.selectedMhs);
    this.forceUpdate();
  }

  handleTambahDosenPengujiAkhir() {
    let tempDataTA = this.props.dataTA;
    let tempNewDosen = {
        user : this.state.dosenPengujiAkhir
    }
    tempDataTA[this.state.selectedMhs].akhir.push(tempNewDosen);
    this.props.edit(tempDataTA, this.state.selectedMhs);
    this.setState({dosenPengujiAkhir: ""});
    this.handleCloseTambahDosenPengujiAkhir();
  }

  handleDeleteDosenPengujiAkhir(i) {
    let tempDataTA = this.props.dataTA;
    tempDataTA[this.state.selectedMhs].akhir.splice(i,1);
    this.props.edit(tempDataTA, this.state.selectedMhs);
    this.forceUpdate();
  }

  handleSelect(i, data){
      this.setState({selectedMhs:i})
  }

  handleSave(){
    this.props.editTA(this.props.dataTA);
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
        onClick={()=>this.handleCloseEditTopic()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleEditTopic()}
      />,
    ];

    const actionsTambahDosenPembimbing = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseTambahDosenPembimbing()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleTambahDosenPembimbing()}
      />,
    ];

    const actionsTambahDosenPengujiTA1 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseTambahDosenPengujiTA1()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleTambahDosenPengujiTA1()}
      />,
    ];

    const actionsTambahDosenPengujiAkhir = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>this.handleCloseTambahDosenPengujiAkhir()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleTambahDosenPengujiAkhir()}
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
          title="Dashboard Tim TA - Daftar Pasangan Tugas Akhir"
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
            <Col md="4" xs="12">
              <div>
                Daftar Mahasiswa Tugas Akhir
                <Row>
                  <FlatButton
                    label="Tambah mahasiswa"
                    labelPosition="after"
                    backgroundColor="rgb(166, 233, 255)"
                    onClick={()=>this.handleOpenTambahMahasiswa()}
                    icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                  />
                </Row>
                <Row>
                  {this.props.dataTA.length !== 0 &&
                  <ScrollArea
                    horizontal={false}
                    style={{height: 400}}
                    speed={0.8}
                  >
                    <List>
                      {this.props.dataTA.map((mhs, i) => (
                        <Row>
                          <Col md="8" xs="8">
                            <ListItem key={i} onTouchTap={()=>this.handleSelect(i,mhs)}>
                            {mhs.mahasiswa.nama}
                            </ListItem>
                          </Col>
                          <Col md="4" xs ="4" style={{marginTop:7}}>
                            <FlatButton
                              labelPosition="after"
                              icon={<i className="material-icons" style={{color:'black'}}>close</i>}
                              onClick={()=>this.handleDeleteMahasiswa(mhs.id)}
                            />
                          </Col>
                        </Row>
                      ))}
                    </List>
                  </ScrollArea>
                  }
                  {this.props.dataTA.length === 0 &&
                    <p style={{fontSize:14}}><i>Tidak ada mahasiswa</i></p>
                  }
                </Row>
              </div>
            </Col>
            <Col md="8" xs="12">
              {this.props.dataTA.length > 0 &&
              <div>
                <div>
                  <p style={{fontSize:25, alignItems:'center', fontWeight: 'bold'}}>{this.props.dataTA[this.state.selectedMhs].mahasiswa.nama}</p>
                  <br/>
                  <p style={{fontSize:16}}>Topik Tugas Akhir</p>
                  <Row>
                    <Col md="10" xs="10">
                      <p style={{fontSize: 20}}>{this.props.dataTA[this.state.selectedMhs].topik}</p>
                    </Col>
                    <Col md="2" xs ="2">
                      <FlatButton
                        icon={<i className="material-icons" style={{color:'black'}}>edit</i>}
                        onClick={()=>this.handleOpenEditTopic()}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" xs="12">
                      Dosen Pembimbing
                      {this.props.dataTA[this.state.selectedMhs].pembimbing.length < 2 &&
                        <RaisedButton
                          label="Tambah Dosen"
                          labelPosition="after"
                          backgroundColor="rgb(166, 233, 255)"
                          icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                          onClick={()=>this.handleOpenTambahDosenPembimbing()}
                        />
                      }

                      {this.props.dataTA[this.state.selectedMhs].pembimbing.length > 0 &&
                        <List>
                          {this.props.dataTA[this.state.selectedMhs].pembimbing.map((item, i) =>(
                            <Row>
                              <Col md="10" xs="10">
                                <ListItem key={i}>
                                  {item.user.nama}
                                </ListItem>
                              </Col>
                              <Col md="2" xs ="2" style={{marginTop:7}}>
                                <FlatButton
                                  labelPosition="after"
                                  icon={<i className="material-icons" style={{color:'black', fontSize:'14px'}}>close</i>}
                                  onClick={()=>this.handleDeleteDosenPembimbing(i)}
                                />
                              </Col>
                            </Row>
                          ))}
                        </List>
                      }
                      {this.props.dataTA[this.state.selectedMhs].pembimbing.length == 0 &&
                          <p style={{fontSize:14}}><i>Belum ada dosen pembimbing.</i></p>
                      }
                    </Col>
                  </Row>
                </div>
                <br/>
                <br/>
                <div>
                  <Row>
                    <Col md="6" xs="12">
                      Daftar Dosen Penguji TA 1
                      {this.props.dataTA[this.state.selectedMhs].penguji.length < 2 &&
                        <RaisedButton
                          label="Tambah Dosen Penguji TA 1"
                          labelPosition="after"
                          backgroundColor="rgb(166, 233, 255)"
                          icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                          onClick={()=>this.handleOpenTambahDosenPengujiTA1()}
                        />
                      }

                      {this.props.dataTA[this.state.selectedMhs].penguji.length > 0 &&
                        <List>
                          {this.props.dataTA[this.state.selectedMhs].penguji.map((item, i) =>(
                            <Row>
                              <Col md="8" xs="10">
                              <ListItem key={i}>
                                {item.user.nama}
                              </ListItem>
                              </Col>
                              <Col md="4" xs ="2" style={{marginTop:7}}>
                                <FlatButton
                                  labelPosition="after"
                                  icon={<i className="material-icons" style={{color:'black', fontSize:'14px'}}>close</i>}
                                  onClick={()=>this.handleDeleteDosenPengujiTA1(i)}
                                />
                              </Col>
                            </Row>
                          ))}
                        </List>
                      }
                      {this.props.dataTA[this.state.selectedMhs].penguji.length == 0 &&
                          <p style={{fontSize:14}}><i>Belum ada dosen penguji seminar TA 1</i></p>
                      }
                    </Col>
                    <Col md="6" xs="12">
                      Daftar Dosen Penguji Sidang Akhir
                      {this.props.dataTA[this.state.selectedMhs].akhir.length < 2 &&
                        <RaisedButton
                          label="Tambah Dosen Penguji Sidang Akhir"
                          labelPosition="after"
                          backgroundColor="rgb(166, 233, 255)"
                          icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                          onClick={()=>this.handleOpenTambahDosenPengujiAkhir()}
                        />
                      }

                      {this.props.dataTA[this.state.selectedMhs].akhir.length > 0 &&
                        <List>
                          {this.props.dataTA[this.state.selectedMhs].akhir.map((item, i) =>(
                            <Row>
                              <Col md="8" xs="10">
                              <ListItem key={i}>
                                {item.user.nama}
                              </ListItem>
                              </Col>
                              <Col md="4" xs ="2" style={{marginTop:7}}>
                                <FlatButton
                                  labelPosition="after"
                                  icon={<i className="material-icons" style={{color:'black', fontSize:'14px'}}>close</i>}
                                  onClick={()=>this.handleDeleteDosenPengujiAkhir(i)}
                                />
                              </Col>
                            </Row>
                          ))}
                        </List>
                      }
                      {this.props.dataTA[this.state.selectedMhs].akhir.length == 0 &&
                          <p style={{fontSize:14}}><i>Belum ada dosen penguji sidang akhir.</i></p>
                      }
                    </Col>
                  </Row>
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
          <MenuItem insetChildren={true} style={{backgroundColor:'#b0bec5'}} href="/timta_mng_pasangan_TA">Daftar Pasangan TA</MenuItem>
          <br/>
          <p className="menuTitle">Manajemen Jadwal</p>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA1">Seminar TA 1</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_seminarTA2">Seminar TA 2</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_jadwal_sidangTA">Sidang Akhir</MenuItem>
          <hr/>
          <MenuItem insetChildren={true} href="/timta_allcalendars">Manajemen Kalender</MenuItem>
          <MenuItem insetChildren={true} href="/timta_mng_ruangan">Manajemen Ruangan</MenuItem>
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
            value={this.state.mahasiswa}
            onChange={(event, index, mahasiswa)=>this.handleChangeMahasiswa(event, index, mahasiswa)}
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
          defaultValue = {this.props.dataTA[this.state.selectedMhs] ? this.props.dataTA[this.state.selectedMhs].topik : ""}
          style={{width:500}}
          onChange={(event)=>this.handleChangeTopic(event)}
        />
        </Dialog>

        <Dialog
          title="Tambah Dosen Pembimbing"
          actions= {actionsTambahDosenPembimbing}
          modal={false}
          open={this.state.modalTambahDosenPembimbing}
          onRequestClose={()=>this.handleCloseTambahDosenPembimbing()}
        >
          <SelectField
            multiple={false}
            hintText="Select a name"
            value = {this.state.dosenPembimbing}
            onChange={(event, index, dosenPembimbing)=>this.handleChangeDosenPembimbing(event, index, dosenPembimbing)}
          >
          {this.props.dosen.map((item) => (
            <MenuItem
              key={item.id}
              insetChildren={true}
              checked={this.state.dosenPembimbing === item}
              value={item}
              primaryText={item.nama}
            />
          ))
          }
          </SelectField>
        </Dialog>

        <Dialog
          title="Tambah Dosen Penguji TA1"
          actions= {actionsTambahDosenPengujiTA1}
          modal={false}
          open={this.state.modalTambahDosenPengujiTA1}
          onRequestClose={()=>this.handleCloseTambahDosenPengujiTA1()}
        >
          <SelectField
            multiple={false}
            hintText="Select a name"
            value = {this.state.dosenPengujiTA1}
            onChange={(event, index, dosenPengujiTA1) =>this.handleChangeDosenPengujiTA1(event, index, dosenPengujiTA1) }
          >
          {this.props.dosen.map((item) => (
            <MenuItem
              key={item.id}
              insetChildren={true}
              checked={this.state.dosenPengujiTA1 === item}
              value={item}
              primaryText={item.nama}
            />
          ))
          }
          </SelectField>
        </Dialog>

        <Dialog
          title="Tambah Dosen Penguji Sidang Akhir"
          actions= {actionsTambahDosenPengujiAkhir}
          modal={false}
          open={this.state.modalTambahDosenPengujiAkhir}
          onRequestClose={()=>this.handleCloseTambahDosenPenguji()}
        >
          <SelectField
            multiple={false}
            hintText="Select a name"
            value = {this.state.dosenPengujiAkhir}
            onChange={(event, index, dosenPengujiAkhir) =>this.handleChangeDosenPengujiAkhir(event, index, dosenPengujiAkhir) }
          >
          {this.props.dosen.map((item) => (
            <MenuItem
              key={item.id}
              insetChildren={true}
              checked={this.state.dosenPengujiAkhir === item}
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
        mahasiswa: state.mahasiswaTA,
        dosen: state.dosen,
        dataTA: state.dataTA,
        userInfo: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchTA: fetchTA,
        newTA: newTA,
        deleteTA: deleteTA,
        editTA: editTA,
        fetchMahasiswa: fetchMahasiswa,
        fetchDosen: fetchDosen,
        edit: tempEditTA
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(windowDimensions()(timta_mng_pasangan_TA));
