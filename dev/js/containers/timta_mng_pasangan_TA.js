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
import imgProfile from '../../scss/public/images/imgprofile.jpg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
      mahasiswa: [],
      topic: "",
      dosenPembimbing: "",
      dosenPengujiTA1: "",
      dosenPengujiAkhir: "",
      dataTA : this.props.dataTA
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
    let tempDataTA = this.state.dataTA;
    tempDataTA[this.state.selectedMhs].topik = this.state.topic;
    this.setState({dataTA: tempDataTA});
    this.setState({topic: ""});
    this.handleCloseEditTopic();
  }

  handleTambahMahasiswa() {
    let tempDataElemenMhs = [];
    this.state.mahasiswa.forEach(function(item, i) {
      let tempMhs = {
        nama: item,
        topik: "",
        dosenPembimbing: [],
        dosenPengujiTA1: [],
        dosenPengujiAkhir: []
      }
      tempDataElemenMhs.push(tempMhs);
      console.log("tempDataElemenMhs:", tempDataElemenMhs);
    })
    let tempDataTA = this.state.dataTA;
    tempDataTA = tempDataTA.concat(tempDataElemenMhs);
    console.log("data Mhs:", tempDataTA);
    this.setState({dataTA: tempDataTA});
    this.setState({mahasiswa: []});
    this.handleCloseTambahMahasiswa();
  }

  handleDeleteMahasiswa(i) {
    let tempDataTA = this.state.dataTA;
    tempDataTA.splice(i,1);
    console.log("data Mhs:",i," ", tempDataTA);
    this.setState({dataTA: tempDataTA});
  }

  handleTambahDosenPembimbing() {
    let tempDataTA = this.state.dataTA;
    console.log("Dosen pembimbing tmbah:", this.state.dosenPembimbing);
    tempDataTA[this.state.selectedMhs].dosenPembimbing.push(this.state.dosenPembimbing);
    console.log("data Mhs:", tempDataTA);
    this.setState({dataTA: tempDataTA});
    this.setState({dosenPembimbing: ""});
    this.handleCloseTambahDosenPembimbing();
  }

  handleDeleteDosenPembimbing(i) {
    let tempDataTA = this.state.dataTA;
    tempDataTA[this.state.selectedMhs].dosenPembimbing.splice(i,1);
    console.log("data Mhs:",i," ", tempDataTA);
    this.setState({dataTA: tempDataTA});
  }

  handleTambahDosenPengujiTA1() {
    let tempDataTA = this.state.dataTA;
    console.log("Dosen peguji 1 tmbah:", this.state.dosenPengujiTA1);
    tempDataTA[this.state.selectedMhs].dosenPengujiTA1.push(this.state.dosenPengujiTA1);
    console.log("data Mhs:", tempDataTA);
    this.setState({dataTA: tempDataTA});
    this.setState({dosenPengujiTA1: ""});
    this.handleCloseTambahDosenPengujiTA1();
  }

  handleDeleteDosenPengujiTA1(i) {
    let tempDataTA = this.state.dataTA;
    tempDataTA[this.state.selectedMhs].dosenPengujiTA1.splice(i,1);
    console.log("data Mhs:",i," ", tempDataTA);
    this.setState({dataTA: tempDataTA});
  }

  handleTambahDosenPengujiAkhir() {
    let tempDataTA = this.state.dataTA;
    console.log("Dosen peguji 1 tmbah:", this.state.dosenPengujiAkhir);
    tempDataTA[this.state.selectedMhs].dosenPengujiAkhir.push(this.state.dosenPengujiAkhir);
    console.log("data Mhs:", tempDataTA);
    this.setState({dataTA: tempDataTA});
    this.setState({dosenPengujiAkhir: ""});
    this.handleCloseTambahDosenPengujiAkhir();
  }

  handleDeleteDosenPengujiAkhir(i) {
    let tempDataTA = this.state.dataTA;
    tempDataTA[this.state.selectedMhs].dosenPengujiAkhir.splice(i,1);
    console.log("data Mhs:",i," ", tempDataTA);
    this.setState({dataTA: tempDataTA});
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
        <AppBar
          title="Dashboard Tim TA - Daftar Pasangan Tugas Akhir"
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
                <Subheader>Daftar Mahasiswa Tugas Akhir</Subheader>
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
                  {this.state.dataTA.length !== 0 &&
                  <ScrollArea
                    horizontal={false}
                    style={{height: 400}}
                    speed={0.8}
                  >
                    <List>
                      {this.state.dataTA.map((mhs, i) => (
                        <Row>
                          <Col md="8" xs="8">
                            <ListItem key={i} onTouchTap={()=>this.setState({selectedMhs:i})}>
                            {mhs.nama}
                            </ListItem>
                          </Col>
                          <Col md="4" xs ="4" style={{marginTop:7}}>
                            <FlatButton
                              labelPosition="after"
                              icon={<i className="material-icons" style={{color:'black'}}>close</i>}
                              onClick={()=>this.handleDeleteMahasiswa(i)}
                            />
                          </Col>
                        </Row>
                      ))}
                    </List>
                  </ScrollArea>
                  }
                  {this.state.dataTA.length === 0 &&
                    <p style={{fontSize:14}}><i>Tidak ada mahasiswa</i></p>
                  }
                </Row>
              </div>
            </Col>
            <Col md="8" xs="12">
              {this.state.dataTA.length > 0 &&
              <div>
                <div>
                  <p style={{fontSize:25, alignItems:'center', fontWeight: 'bold'}}>{this.state.dataTA[this.state.selectedMhs].nama}</p>
                  <br/>
                  <p style={{fontSize:16}}>Topik Tugas Akhir</p>
                  <Row>
                    <Col md="10" xs="10">
                      <p style={{fontSize: 20}}>{this.state.dataTA[this.state.selectedMhs].topik}</p>
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
                      <Subheader>Dosen Pembimbing</Subheader>
                      {this.state.dataTA[this.state.selectedMhs].dosenPembimbing.length < 2 &&
                        <RaisedButton
                          label="Tambah Dosen"
                          labelPosition="after"
                          backgroundColor="rgb(166, 233, 255)"
                          icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                          onClick={()=>this.handleOpenTambahDosenPembimbing()}
                        />
                      }

                      {this.state.dataTA[this.state.selectedMhs].dosenPembimbing.length > 0 &&
                        <List>
                          {this.state.dataTA[this.state.selectedMhs].dosenPembimbing.map((item, i) =>(
                            <Row>
                              <Col md="10" xs="10">
                                <ListItem key={i}>
                                  {item}
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
                      {this.state.dataTA[this.state.selectedMhs].dosenPembimbing.length == 0 &&
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
                      <Subheader>Daftar Dosen Penguji TA 1</Subheader>
                      {this.state.dataTA[this.state.selectedMhs].dosenPengujiTA1.length < 2 &&
                        <RaisedButton
                          label="Tambah Dosen Penguji TA 1"
                          labelPosition="after"
                          backgroundColor="rgb(166, 233, 255)"
                          icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                          onClick={()=>this.handleOpenTambahDosenPengujiTA1()}
                        />
                      }

                      {this.state.dataTA[this.state.selectedMhs].dosenPengujiTA1.length > 0 &&
                        <List>
                          {this.state.dataTA[this.state.selectedMhs].dosenPengujiTA1.map((item, i) =>(
                            <Row>
                              <Col md="8" xs="10">
                              <ListItem key={i}>
                                {item}
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
                      {this.state.dataTA[this.state.selectedMhs].dosenPengujiTA1.length == 0 &&
                          <p style={{fontSize:14}}><i>Belum ada dosen penguji seminar TA 1</i></p>
                      }
                    </Col>
                    <Col md="6" xs="12">
                      <Subheader>Daftar Dosen Penguji Sidang Akhir</Subheader>
                      {this.state.dataTA[this.state.selectedMhs].dosenPengujiAkhir.length < 2 &&
                        <RaisedButton
                          label="Tambah Dosen Penguji Sidang Akhir"
                          labelPosition="after"
                          backgroundColor="rgb(166, 233, 255)"
                          icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                          onClick={()=>this.handleOpenTambahDosenPengujiAkhir()}
                        />
                      }

                      {this.state.dataTA[this.state.selectedMhs].dosenPengujiAkhir.length > 0 &&
                        <List>
                          {this.state.dataTA[this.state.selectedMhs].dosenPengujiAkhir.map((item, i) =>(
                            <Row>
                              <Col md="8" xs="10">
                              <ListItem key={i}>
                                {item}
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
                      {this.state.dataTA[this.state.selectedMhs].dosenPengujiAkhir.length == 0 &&
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
          <MenuItem insetChildren={true}style={{backgroundColor:'#b0bec5'}} >Daftar Pasangan</MenuItem>
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
            multiple={true}
            hintText="Select a name"
            value={this.state.mahasiswa}
            onChange={(event, index, mahasiswa)=>this.handleChangeMahasiswa(event, index, mahasiswa)}
          >
          {this.props.mahasiswa.map((item) => (
            <MenuItem
              key={item}
              insetChildren={true}
              checked={this.state.mahasiswa && this.state.mahasiswa.indexOf(item) > -1}
              value={item}
              primaryText={item}
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
          defaultValue = {this.state.dataTA.length !== 0 ? this.state.dataTA[this.state.selectedMhs].topik : ""}
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
              key={item}
              insetChildren={true}
              checked={this.state.dosenPembimbing === item}
              value={item}
              primaryText={item}
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
              key={item}
              insetChildren={true}
              checked={this.state.dosenPengujiTA1 === item}
              value={item}
              primaryText={item}
            />
          ))
          }
          </SelectField>
        </Dialog>

        <Dialog
          title="Tambah Dosen Penguji Sidang Akhir"
          actions= {actionsTambahDosenPengujiAkhir}
          modal={false}
          open={this.state.modalTambahDosenPenguji}
          onRequestClose={()=>this.handleCloseTambahDosenPenguji()}
        >
          <SelectField
            multiple={false}
            hintText="Select a name"
            value = {this.state.dosenPengujiAkhir}
            onChange={(event, index, dosenPengujiAkhir) =>this.handleChangeDosenPenguji(event, index, dosenPengujiAkhir) }
          >
          {this.props.dosen.map((item) => (
            <MenuItem
              key={item}
              insetChildren={true}
              checked={this.state.dosenPengujiAkhir === item}
              value={item}
              primaryText={item}
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
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(timta_mng_pasangan_TA);
