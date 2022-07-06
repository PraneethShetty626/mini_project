import React, { Component} from 'react';
import DisplayPatient from "./display_patient";
import notes from "../contracts/Notes.json";
import getWeb3 from '../getWeb3';
import './css/doctor.css'
class Doctor extends Component {
    healthRecord =this.props.contract["OPT"];
    doctorAddFiles= this.props.contract["DAR"];
    contracts=[this.healthRecord, this.doctorAddFiles];
    bpnote = this.props.contract['NOTE'];
    contracts=[this.healthRecord, this.doctorAddFiles,this.bpnote];

    Acc =this.props.Acc;
    state = {
        name: "",
        patient_list: [],
        contact:"",
        doc_address:"",
        specialization:"",
        load_patient:"",
        count:0
    }

    async loadcontract() {  

        var web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        var deployedNetworks1 = notes.networks[networkId];

        this.doctorAddRecord = new web3.eth.Contract(
            notes.abi,
            deployedNetworks1 && deployedNetworks1.address,
        );
    }

    componentDidMount(){ 
        this.loadDoctor();
    }

    componentDidUpdate(prevProps,prevState){
        console.warn("Updated")
        if(this.state.load_patient != null && this.state.count===0)   
        {
            this.setState({load_patient :null})
        }
        console.log(prevState.count, this.state.count)
    }
    

   
    async loadDoctor(){
        let res = await this.healthRecord.methods.getDoctorInfo().call({from :this.Acc[0]});
        
        this.setState({name:res[0],patient_list:res[2],doc_address:res[3], contact:res[3], specialization:res[4]});
        console.log(res);
    }
 
    render() {
        let { name,contact,specialization, patient_list} = this.state;
        return (
            <div className='container bg-[#BAE6FD]'>
                <div className='w-full'>
                    <div className="rounded-[20px] text-center w-full">
                        <h1 className="rounded-lg bg-[#0EA5E9] mt-2 sm:text-3xl text-2xl font-medium text-center title-font text-white">{name} <br></br><span className="text-[20px]">Contact - {contact}</span><br></br><p className="text-center text-white text-[20px] leading-relaxed">{specialization}</p>
                        </h1>
                    </div>

                </div>
                <h2 className="text-center">Patients List </h2>
                    <div className="flex flex-wrap items-center justify-center lg:w-full sm:mx-auto sm:mb-2 -mx-2">
                        <div className="flex flex-column p-2 sm:w-1/2 w-full flex items-center justify-center">
                            {
                                patient_list.map((patient) => {
                                    return <>
                                    <a href="#pData">
                                    <div className="mb-2 flex justify-center items-center bg-gray-100 rounded flex p-4" onClick={() => { this.setState({ load_patient: patient, count: 1 - this.state.count });}}>
                                        <button className="p-2 rounded-[20px] mr-2 bg-blue-200 text-black cursor-pointer">View Records</button><span className="title-font font-medium">{patient}</span>
                                    </div>
                                    </a>
                                    </>
                                })
                            }
                        </div>
                    </div>
                
                    <div className='col mt-2 border-[1px] border-black p-3 rounded-[20px] m-2 '>
                    <div className='row mt-3'>
                    <div className='col'>
                        {
                            this.state.load_patient ?
                            <div> <h5>Patient's Record <DisplayPatient contract ={this.contracts} Acc={this.Acc} patient_address={this.state.load_patient} /> </h5></div> :
                            <div></div>

                        }
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Doctor;
