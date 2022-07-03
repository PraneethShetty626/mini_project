import React, { Component } from 'react';
// import { Card } from 'antd';

// import healthRecord from "../contracts/DoctorAddRecord.json"
// import getWeb3 from '../getWeb3';

class Hospital extends Component {
    constructor(props) {
        super(props);
        this.grantAccess = this.grantAccess.bind(this);
        this.addPatientToInsuranceComp = this.addPatientToInsuranceComp.bind(this);
        this.registerDoc = this.registerDoc.bind(this);

    }

    contract = this.props.contract['OPT'];
    doctorAddRecord = this.props.contract['DAR'];
    accounts = this.props.Acc;

    state = {
        hosp_name: "",
        hosp_location: "",
        hosp_id: "",
        hosp_license: ""
    }
    //async methods and states here
    async loadHospital() {
        try {
            let res = await this.contract.methods.getHospitalInfo().call({ from: this.accounts[0] });
            this.setState({ hosp_id: res[0], hosp_name: res[1], hosp_location: res[2], hosp_license: res[3] });
        }
        catch (e) {
            console.log(e);
        }
    }

    async grantAccess(event) {
        event.preventDefault();
        let requestor = document.getElementById('access_requestor').value;
        let patient = document.getElementById('access_of').value;
        console.log(requestor);
        console.log(patient);
        try {
            let result = await this.contract.methods.hospitalGrantAccess(requestor, patient).send({ "from": this.accounts[0] });
            console.log(result);
        }
        catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.loadHospital();
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

    async registerDoc(event) {
        event.preventDefault(true);
        let name = document.getElementById('doc_name').value;
        let id = document.getElementById('doc_id').value;
        let contact_info = document.getElementById('doc_contact').value;
        let specialization = document.getElementById('doc_specs').value;

        console.log(name);
        console.log(id);
        console.log(contact_info);
        console.log(specialization);

        await this.contract.methods.signupDoctor(id, name, contact_info, specialization).send({ from: this.accounts[0] });

    }
    render() {
        let { hosp_name, hosp_id, hosp_location, hosp_license } = this.state;

        return (
            <div>
                <div className='container mb-3 '>
                    <div class="rounded-[20px] text-center w-full">
                        <h1 class="rounded-lg bg-[#C026D3] mt-2 sm:text-3xl text-2xl font-medium text-center title-font text-white">{hosp_name} <br></br><span className="text-[20px]">License No - {hosp_license}</span><br></br><p class="text-center text-white text-[20px] leading-relaxed">{hosp_id}</p>
                            <p class="text-center text-white leading-relaxed">{hosp_location}</p>
                        </h1>
                    </div>
                    <div className='row' style={{ border: '2px black solid', borderRadius: "20px", marginTop: "20px", padding: "20px" }}>
                        <div className='col mt-3 bg-[#FDA4AF] pt-2 rounded-[30px]'>
                            <h5 style={{ align: 'centre', style: "bold" }}><b>Grant patient access to doctor</b></h5>
                            <div>
                                <form onSubmit={this.grantAccess}>
                                    <br></br>
                                    <div className="label mt-2"><b>Grant access to:</b></div>
                                    <input class="rounded-2xl bg-white ring-1 ring-slate-900/5 space-y-3 hover:bg-sky-500 hover:ring-sky-50" type="text" name="Grant to" id="access_requestor" placeholder='Doctor address'></input>
                                    <br></br>
                                    <br></br>
                                    <div className="label mt-2"><b>Access of: </b></div>
                                    <input class="rounded-2xl bg-white ring-1 ring-slate-900/5 space-y-3 hover:bg-sky-500 hover:ring-sky-50 " type="text" name="Access of" id="access_of" placeholder="Patient Address" ></input>
                                    <br></br>
                                    <br></br>
                                    <button variant="dark" className="p-2 text-black rounded-xl bg-blue-700  text-white active:bg-green-700 m-4 " type="submit">Grant Access</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='row mt-3' style={{ border: '2px black solid', borderRadius: "20px", marginTop: "20px", padding: "20px" }}>
                        <div className='col mt-3 bg-[#FDA4AF] pt-2 rounded-[30px]'>
                            <h5 style={{ align: 'centre' }}><b>Add Patient To Insurance Comp.</b></h5>
                            <div>
                                <form onSubmit={this.addPatientToInsuranceComp}>
                                    <div className='label mt-2'>Patient Address:</div>
                                    <input type="text" class="rounded-2xl" id="added_patient" placeholder='Patient address'></input>
                                    <br></br> <br></br>
                                    <div className='label mt-2'>Company Address:</div>
                                    <input class="rounded-2xl" type="text" id="added_to_company" placeholder='Company Address'></input>
                                    <br></br>
                                    <button variant="dark" className="p-2 text-black rounded-xl bg-blue-700  text-white active:bg-green-700 m-4 " type="submit">Add Patient</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='row mt-3' style={{ border: '2px black solid', borderRadius: "20px", marginTop: "20px", padding: "20px" }}>
                        <div className='col mt-3 bg-[#FDA4AF] pt-2 rounded-[30px]'>
                            <h5 style={{ align: 'centre' }}><b>Add Doctor To Blockchain</b></h5>

                            <div style={{ marginLeft: '20px' }}>
                                <form onSubmit={this.registerDoc}>
                                    <div className="label mt-2"><b>Name:</b></div>
                                    <input class="rounded-2xl" type="text" name="name" id="doc_name" placeholder="Name"></input>
                                    <br></br>
                                    <br></br>
                                    <div className="label mt-2"><b>Blockchain Address:</b></div>
                                    <input class="rounded-2xl" type="text" name="name" id="doc_id" placeholder="Address"></input>
                                    <br></br>
                                    <br></br>
                                    <div className="label mt-2"><b>Contact Info:</b></div>
                                    <input class="rounded-2xl" type="text" name="name" id="doc_contact" placeholder="Contact Info"></input>
                                    <br></br>
                                    <br></br>
                                    <div className="label mt-2"><b>Specialization:</b></div>
                                    <input class="rounded-2xl" type="text" name="name" id="doc_specs" placeholder="Specialization"></input>
                                    <br></br>
                                    <br></br>
                                    <button variant="dark" className="p-2 text-black rounded-xl bg-blue-700  text-white active:bg-green-700 m-4 " type="submit">Add Doctor</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Hospital;