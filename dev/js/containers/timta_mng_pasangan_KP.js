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

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import imgProfile from '../../scss/public/images/imgprofile.jpg';

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
        daftarMahasiswa : [
          'Oliver Hansen',
          'Van Henry',
          'April Tucker',
          'Ralph Hubbard',
          'Omar Alexander',
          'Carlos Abbott',
          'Miriam Wagner',
          'Bradley Wilkerson',
          'Virginia Andrews',
          'Kelly Snyder',
        ],
      daftarDosen: [
        'Rinaldi Munir',
        'Masayu',
        'Ayu Purwarianti',
        'Bayu Hendrajaya',
      ],
      dataKelompok: [
        {
          anggota: [
            'Ikhwanul Muslimin',
            'Febi Agil Ifdillah',
            'Hasna Nur Karimah'
          ],
          topik: "Implementasi X pada YYYY",
          dosen: [
            'Rinaldi Munir'
          ]
        },
        {
          anggota: [
            'Dani Sirait',
            'Hendrikus Bimawan',
            'Naufal Malik Rabbani'
          ],
          topik: "Penggunaan Sistem X pada Komputer",
          dosen: [
            'Masayu'
          ]
        },
        {
          anggota: [
            'Fachrudin Muhlis',
            'Harfi Maulana',
            'Fahmi Kurniawan'
          ],
          topik: "Perbandingan Algoritma X dan Y untuk Sistem Z",
          dosen: [
            'Ayu Purwarianti',
            'Bayu Hendrajaya'
          ]
        },
      ]
    };
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
    let tempDataKelompok = this.state.dataKelompok;
    tempDataKelompok[this.state.selectedKelompok].dosen.splice(i,1);
    console.log("data Kelompok:", tempDataKelompok);
    this.setState({dataKelompok: tempDataKelompok});
  }

  handleEditTopic() {
    let tempDataKelompok = this.state.dataKelompok;
    console.log(this.state.topic);
    tempDataKelompok[this.state.selectedKelompok].topik = this.state.topic;
    this.setState({dataKelompok: tempDataKelompok});
    this.handleCloseEditTopic();
  }

  handleTambahKelompok() {
    let data = {
      anggota: [],
      topik: "",
      dosen: []
    };
    let tempDataKelompok = this.state.dataKelompok;
    tempDataKelompok.push(data);
    this.setState({dataKelompok: tempDataKelompok});
  }

  handleDeleteKelompok(i) {
    this.state.dataKelompok.splice(this.state.selectedKelompok,1)
    console.log(this.state.dataKelompok);
  }

  handleTambahMahasiswa() {
    let tempDataKelompok = this.state.dataKelompok;
    console.log(tempDataKelompok[this.state.selectedKelompok].anggota);
    console.log(this.state.values);
    tempDataKelompok[this.state.selectedKelompok].anggota = tempDataKelompok[this.state.selectedKelompok].anggota.concat(this.state.values);
    console.log("data Kelompok:", tempDataKelompok);
    this.setState({dataKelompok: tempDataKelompok});
    this.handleCloseTambahMahasiswa();
  }

  handleDeleteMahasiswa(i) {
    let tempDataKelompok = this.state.dataKelompok;
    tempDataKelompok[this.state.selectedKelompok].anggota.splice(i,1);
    console.log("data Kelompok:", tempDataKelompok);
    this.setState({dataKelompok: tempDataKelompok});
    this.setState({values: []})
  }

  handleTambahDosen() {
    let tempDataKelompok = this.state.dataKelompok;
    console.log("Dosen tmbah:", this.state.dosen);
    tempDataKelompok[this.state.selectedKelompok].dosen.push(this.state.dosen);
    console.log("data Kelompok:", tempDataKelompok);
    this.setState({dataKelompok: tempDataKelompok});
    this.setState({dosen: ""});
    this.handleCloseTambahDosen();
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
                <ScrollArea
                  horizontal={false}
                  style={{height: 500, borderLeftWidth: 2}}
                  speed={0.8}
                >
                  <RaisedButton
                    label="Tambah kelompok"
                    labelPosition="after"
                    backgroundColor="rgb(166, 233, 255)"
                    icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                    onTouchTap={()=>this.handleTambahKelompok()}
                  />
                  <List>
                    {this.state.dataKelompok.map((item, i) => (
                      <Row>
                        <Col md="8" xs="8">
                          <ListItem key={i} onTouchTap={()=>this.setState({selectedKelompok:i})}>
                            {"Kelompok "+(i+1)}
                          </ListItem>
                        </Col>
                        <Col md="4" xs ="4" style={{marginTop:7}}>
                          <FlatButton
                            labelPosition="after"
                            icon={<i className="material-icons" style={{color:'black'}}>close</i>}
                            onClick={()=>this.handleDeleteKelompok(i)}
                          />
                        </Col>
                      </Row>
                    ))
                    }
                  </List>
                </ScrollArea>
              </div>
            </Col>
            <Col md="8" xs="12">
              <p style={{fontSize:20, fontWight:'bold', textAlign: 'center'}}>{"Kelompok "+(this.state.selectedKelompok+1)}</p>
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

                  {this.state.dataKelompok.length > 0 &&
                    <List>
                    {this.state.dataKelompok[this.state.selectedKelompok].anggota.map((item, i)=> (
                        <Row>
                          <Col md="8" xs="8">
                            <ListItem key={i}>
                              {item}
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
                  }
                  {this.state.dataKelompok.length == 0 &&
                    <p style={{fontSize:14}}><i>Tidak ada mahasiswa</i></p>
                  }
                </ScrollArea>
              </div>
              <br/>
              <br/>
              <p style={{fontSize:16}}>Topik Kerja Praktik</p>
              <Row>
                <Col md="10" xs="10">
                {this.state.dataKelompok.length > 0 &&
                  <p style={{fontSize: 20}}>{this.state.dataKelompok[this.state.selectedKelompok].topik}</p>
                }
                {this.state.dataKelompok.length == 0 &&
                  <p style={{fontSize:14}}><i>Tidak ada kelompok</i></p>
                }
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
              {this.state.dataKelompok[this.state.selectedKelompok].dosen.length < 2 &&
                <RaisedButton
                  label="Tambah Dosen"
                  labelPosition="after"
                  backgroundColor="rgb(166, 233, 255)"
                  icon={<i className="material-icons" style={{color:'black'}}>add</i>}
                  onClick={()=>this.handleOpenTambahDosen()}
                />
              }

              {this.state.dataKelompok.length > 0 &&
                this.state.dataKelompok[this.state.selectedKelompok].dosen.length > 0 &&
                <List>
                  {this.state.dataKelompok[this.state.selectedKelompok].dosen.map((item, i) =>(
                    <Row>
                      <Col md="8" xs="8">
                        <ListItem key={i}>
                          {item}
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
              {this.state.dataKelompok.length > 0 &&
                this.state.dataKelompok[this.state.selectedKelompok].dosen.length == 0 &&
                  <p style={{fontSize:14}}><i>Belum ada dosen.</i></p>
              }
              {this.state.dataKelompok.length == 0 &&
                <p style={{fontSize:14}}><i>Tidak ada kelompok</i></p>
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
            value={this.state.values}
            onChange={(event, index, values)=>this.handleChangeMahasiswa(event, index, values)}
          >
          {this.state.daftarMahasiswa.map((item) => (
            <MenuItem
              key={item}
              insetChildren={true}
              checked={this.state.values && this.state.values.indexOf(item) > -1}
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
          defaultValue = {this.state.dataKelompok.length !== 0 ? this.state.dataKelompok[this.state.selectedKelompok].topik : ""}
          style={{width:500}}
          onChange={(event)=>this.handleChangeTopic(event)}
        />
        </Dialog>

        <Dialog
          title="Tambah Dosen Penguji"
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
          {this.state.daftarDosen.map((item) => (
            <MenuItem
              key={item}
              insetChildren={true}
              checked={this.state.dosen && this.state.values.indexOf(item) > -1}
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

export default timta_mng_pasangan_KP;
