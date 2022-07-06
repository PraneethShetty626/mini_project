import React, { Component } from 'react';
import { Input, message, Tag, Card, Collapse } from 'antd';
import healthRecord from "../contracts/DoctorAddRecord.json"
import getWeb3 from '../getWeb3';
import notes from "../contracts/Notes.json";
import DisplayFiles from "./common/display_file";
import DisplayConsultation from "./common/displayConsultation";
import './css/patient.css'

import ipfs from "./ipfs-util"


class Patient extends Component {

    constructor(props) {
        super(props);
        this.uploadFile = this.uploadFile.bind(this);
        this.getFile = this.getFile.bind(this);
        this.addPatientToInsuranceComp = this.addPatientToInsuranceComp.bind(this);

    }

    contract = this.props.contract['OPT'];
    doctorAddRecord = this.props.contract['DAR'];
    bpnote = this.props.contract['NOTE'];
    accounts = this.props.Acc;

    state = {
        name: "",
        DOB: "",
        files: [],
        doctor_list: [],
        filesInfo: [],
        showPopup: [],
        doctorId: null,
        secret: null,
        visible: false,
        loaded: false,
        buffer: null,
        doctorConsultation: [],
        doctorAddedFiles: [],
        Bp: [],
        BpDate: [],
        contact_info: "",
        file: null
    }


    async loadcontract() {
        var web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        var deployedNetwork = healthRecord.networks[networkId];

        this.doctorAddRecord = new web3.eth.Contract(
            healthRecord.abi,
            deployedNetwork && deployedNetwork.address,
        );

        var deployedNetworks1 = notes.networks[networkId];

        this.doctorAddRecord = new web3.eth.Contract(
            notes.abi,
            deployedNetworks1 && deployedNetworks1.address,
        );
    }




    componentDidMount() {

        this.loadPatient();
    }



    async loadFiles() {
        const files = await this.contract.methods.getUserFiles(this.accounts[0]).call({ from: this.accounts[0] });
        console.log('files', files);
        if (files[0])
            this.setState({ files: files });
        // console.log(accounts);

    }
    async loadPatient() {
        let res = await this.contract.methods.getPatientInfo().call({ from: this.accounts[0] });
        console.log(this.bpnote.methods.getBp)
        const resBp = await this.bpnote.methods.getBp().call({ from: this.accounts[0] });
        const resDate = await this.bpnote.methods.getDate().call({ from: this.accounts[0] });
        // let len = res2.length;
        this.setState({ Bp: resBp })
        this.setState({ BpDate: resDate })

        this.setState({ name: res[0], DOB: res[2], files: res[3], doctor_list: res[4], contact_info: res[6] },
            () => {
                this.loadFiles();
                console.log("before")
                this.loadcontract();
                console.log("after");
                this.loadDoctorAddedFiles();
                this.loadDoctorConsultation();
            });
    }

    async loadDoctorConsultation() {
        const data = await this.doctorAddRecord.methods.getDoctorConsultationForPatient().call({ from: this.accounts[0] });

        if (data)
            this.setState({ doctorConsultation: data });

        console.log('doctor consultation', this.state.doctorConsultation);

    }

    async loadDoctorAddedFiles() {
        try {
            const data = await this.doctorAddRecord.methods.getDoctorAddedFiles(this.accounts[0]).call({ from: this.accounts[0] });
            if (data)
                this.setState({ doctorAddedFiles: data });

            console.log('doctor added files', this.state.doctorAddedFiles);
        }
        catch (e) {
            console.log(e);
        }
    }

    async grantAccess() {


        if (this.state.doctorId) {
            let res = await this.contract.methods.grantAccessToDoctor(this.state.doctorId)
                .send({ "from": this.accounts[0] });

            if (res) {
                message.success('access successful');
                console.log("access successful")
                this.setState({ doctorId: null });
            }
        }
    }


    async revokeAccess() {


        if (this.state.doctorId) {
            let res = await this.contract.methods.revokeAccessFromDoctor(this.state.doctorId)
                .send({ "from": this.accounts[0] });

            if (res) {
                message.success('access revoked');
                console.log("access revoked")
                this.setState({ doctorId: null });
            }
        }
    }

    onTextChange(type, e) {
        if (e && e.target)
            this.setState({ [type]: e.target.value });
    }


    updateFileHash = async (name, type, ipfshash) => {

        //sending transaction and storing result to state variables

        let res = await this.contract.methods.addUserFiles(name, type, ipfshash).send({ "from": this.accounts[0] });
        console.log(res);
        if (res)
            console.log("file upload successful");
        else
            console.log("file upload unsuccessful");
    }

    async uploadFile(event) {
        event.preventDefault();

        ipfs.files.add(this.state.buffer, (err, res) => {
            if (err) {
                console.error(err)
                return
            }

            this.updateFileHash(this.state.file.name, this.state.file.type, res[0].hash)
        })
    }
    getFile(event) {
        event.preventDefault();
        console.log("getfile");
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result), file });
            console.log('buffer', file);
        }
    }

    showFile(hash) {
        let { files, doctorAddedFiles } = this.state;
        if (files.indexOf(hash) > -1 || doctorAddedFiles.indexOf(hash) > -1) {
            let path = `https://ipfs.io/ipfs/${hash[2]}`
            console.log(path);
            window.open(path);
        }
    }


    async addPatientToInsuranceComp(event) {
        event.preventDefault();
        let addr1 = document.getElementById('added_patient').value;
        let addr2 = document.getElementById('added_to_company').value;
        try {
            let result = await this.contract.methods.addPatientToInsuranceComp(addr2, addr1).send({ "from": this.accounts[0] });
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        let { name, DOB, files, doctor_list, doctorConsultation, doctorAddedFiles, contact_info } = this.state;

        return (
            <div className='container' >
                <div>
                    <div className="rounded-[20px] text-center w-full">
                        <h1 className="rounded-lg bg-[#7C3AED] mt-2 sm:text-3xl text-2xl font-medium text-center title-font text-white">{name} <br></br><span className="text-[20px]">DOB - {DOB}</span><br></br><p className="text-center text-white text-[20px] leading-relaxed">{contact_info}</p>
                        </h1>
                    </div>

                </div>

                <div className='row mt-3' style={{ paddingTop: '25px' }}>
                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                        <h6>Grant Access</h6>
                        <Card bordered={true}>
                            <div style={flexStyle}>
                                <Input className='emailId' value={this.state.doctorId} onChange={this.onTextChange.bind(this, 'doctorId')} size="small" placeholder="Grant Address" />
                                <br></br>
                                <button className='mt-2 text-white bg-[#22C55E] py-2 ' type="primary" onClick={this.grantAccess.bind(this)} htmlType="submit" >
                                    Grant Access
                                </button>
                            </div>
                        </Card>
                    </div>

                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                        <h6>Revoke Access</h6>
                        <Card bordered={true}>
                            <div style={flexStyle}>
                                <Input className='emailId' value={this.state.doctorId} onChange={this.onTextChange.bind(this, 'doctorId')} size="small" placeholder="Revoke Address" />
                                <br></br>
                                <button className="mt-2 text-white bg-[#B91C1C] py-2" type="primary" onClick={this.revokeAccess.bind(this)} htmlType="submit" >
                                    Revoke Access
                                </button>
                            </div>
                        </Card>
                    </div>

                </div>
                <br></br>
                <h4 style={{ align: 'centre' }}>Health Status :</h4>
                <div className='row mt-2'>
                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                    <h5>Heart Rate :</h5>
                        {
                            this.state.Bp.map((bps, i) => {
                                return <div>
                                    <h5 id={i} className='label mt-2'><span className='text-orange-500'>{i+1}</span>. {bps} ❤️</h5>
                                </div>
                            })
                        }
                    </div>
                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                    <h5>Checked Date :</h5>
                        {
                            this.state.BpDate.map((dts, i) => {
                                {
                                    dts = dts.split(" ");
                                    console.log(dts[0])
                                }
                                return <div>
                                    <h5 id={i} className='label mt-2'>
                                        <span className='text-orange-500'>{i+1}</span>. {dts[0]}</h5>
                                </div>
                            })
                        }
                    </div>
                </div>

                <div className='row mt-3' style={{ paddingTop: '25px' }}>

                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                        <h6 className='pt-3 '>Upload File</h6>
                        <Card bordered={true}>
                            <form onSubmit={this.uploadFile.bind(this)}>
                                {/* accept only .pdf and images as ipfs stores images, pdfs, videos*/}
                                <input type="file" accept='application/pdf, image/*' onChange={this.getFile.bind(this)}></input>
                                <input type="submit"></input>
                            </form>
                        </Card>
                    </div>

                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                        <Collapse className='folderTab' defaultActiveKey={['1']}>
                            <h6>Your Files</h6>
                            {
                                files.length > 0 ? files.map((fhash, i) => {

                                    return <DisplayFiles that={this} props={fhash} />
                                }) : <p>You have not uploaded files</p>
                            }
                        </Collapse>
                    </div>

                </div>

                <div className='row mt-3' style={{ paddingTop: '25px' }}>
                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                        <Collapse>
                            <h6 style={{ align: 'centre' }}>Doctor List</h6>
                            {
                                doctor_list.map((doctor) => {
                                    return <Tag>{doctor} <br></br></Tag>
                                })
                            }
                        </Collapse>
                    </div>
                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                        <Collapse className='folderTab' defaultActiveKey={['1']}>
                            <h6>Doctor Consultations </h6>
                            {
                                doctorConsultation.length > 0 ? doctorConsultation.map((doc, i) => {
                                    let doctor_id = this.state.doctorConsultation[i] ? this.state.doctorConsultation[i][0] : null;
                                    let consultation_advice = this.state.doctorConsultation[i] ? this.state.doctorConsultation[i][1] : null;
                                    let medicine = this.state.doctorConsultation[i] ? this.state.doctorConsultation[i][2] : null;
                                    let time_period = this.state.doctorConsultation[i] ? this.state.doctorConsultation[i][3] : null;

                                    let consultProps = { doctor_id, consultation_advice, medicine, time_period };

                                    return <DisplayConsultation that={this} props={consultProps} />
                                }) : <p>You have not authorised any doctors </p>
                            }
                        </Collapse>
                    </div>

                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>

                        <Collapse className='folderTab' defaultActiveKey={['1']}>
                            <h6>Doctor Added Files</h6>
                            {
                                doctorAddedFiles.length > 0 ? doctorAddedFiles.map((fhash, i) => {

                                    return <DisplayFiles props={fhash} that={this} />
                                }) : <p>Doctors haven't added any files </p>
                            }
                        </Collapse>
                    </div>
                </div>

                <div className='row mt-2'>
                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                        <h4 style={{ align: 'centre' }}>Register To Insurance Comp.</h4>
                        <div>
                            <form onSubmit={this.addPatientToInsuranceComp}>
                                <div className='label mt-2'>Patient Address:</div>
                                <input type="text" id="added_patient" value={this.accounts[0]} placeholder='Patient address' disabled></input>
                                <br></br>
                                <div className='label mt-2'>Company Address:</div>
                                <input type="text" id="added_to_company" placeholder='Company Address'></input>
                                <br></br>
                                <button variant="dark" className="button" type="submit">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

const flexStyle = {
    display: "flex",
    flexDirection: "column"
}


export default Patient;

