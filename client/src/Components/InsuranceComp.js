import React, { Component } from "react";
// import "./css/InsuranceComp.css"
import DisplayPatientToCompany from "./display_patient_to_company";

class InsuranceComp extends Component {
    //async methods and states here
    contract = this.props.contract['OPT'];
    doctorAddRecord = this.props.contract['DAR'];
    contracts = [this.contract, this.doctorAddRecord];
    accounts = this.props.Acc;

    state = {
        name: "",
        id: "",
        patient_list: [],
        count: 0
    }



    componentDidMount() {
        this.loadCompany();
    }

    componentDidUpdate(prevProps, prevState) {
        console.warn("Updated")
        if (this.state.load_patient != null && this.state.count === 0) {
            this.setState({ load_patient: null })
        }
        console.log(prevState.count, this.state.count)
    }

    async loadCompany() {
        let res = await this.contract.methods.getInsuranceCompInfo().call({ from: this.accounts[0] });
        console.log(res);
        this.setState({ id: res[0], name: res[1], complicense: res[2], patient_list: res[3] });
    }

    render() {
        let { name, patient_list, complicense, id } = this.state;
        return (
            <section class="w-full body-font">
                <div class="container px-5 mx-auto">
                    <div class="text-center">
                        <h1 class="rounded-lg bg-yellow-200 mt-2 sm:text-3xl text-2xl font-medium text-center title-font text-blue-900">{name} <br></br><span className="text-[20px]">License No - {complicense}</span><br></br><p class="text-center text-base leading-relaxed">{id}</p></h1>
                    </div>
                    <h2 className="text-center">Patients List </h2>
                    <div class="flex flex-wrap items-center justify-center lg:w-full sm:mx-auto sm:mb-2 -mx-2">
                        <div class="flex flex-column p-2 sm:w-1/2 w-full flex items-center justify-center">
                            {
                                patient_list.map((patient) => {
                                    return <>
                                    <a href="#pData">
                                    <div class="mb-2 flex justify-center items-center bg-gray-100 rounded flex p-4" onClick={() => { this.setState({ load_patient: patient, count: 1 - this.state.count });}}>
                                        <button className="p-2 rounded-[20px] mr-2 bg-blue-200 text-black cursor-pointer">View Records</button><span class="title-font font-medium">{patient}</span>
                                    </div>
                                    </a>
                                    </>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='container' id="pData">
                    <div className='row mt-3'>
                        <div className='col'>
                            {
                                this.state.load_patient ?
                                    <div> <h5>Patient's Data <DisplayPatientToCompany contract={this.contracts} accounts={this.accounts} patient_address={this.state.load_patient} /> </h5></div> :
                                    <div></div>
                            }
                        </div>
                    </div>

                </div>
            </section>

        )
    }
}

export default InsuranceComp;