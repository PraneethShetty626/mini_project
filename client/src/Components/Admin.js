import React, { Component } from "react";
import "./main.css";


class Admin extends Component {
  constructor(props) {
    super(props);
    this.registerHospital = this.registerHospital.bind(this);
    this.addInsuranceComp = this.addInsuranceComp.bind(this);
    this.addUserByAdhaar = this.addUserByAdhaar.bind(this);
  }

  //async methods and states here
  contract = this.props.contract["OPT"];
  doctorAddRecord = this.props.contract["DAR"];
  accounts = this.props.Acc;

  async registerHospital(event) {
    event.preventDefault();
    let id = document.getElementById("hosp_id").value;
    let name = document.getElementById("hosp_name").value;
    let location = document.getElementById("hosp_location").value;
    let license = document.getElementById("hosp_license").value;
    console.log(name);
    console.log(id);
    console.log(location);
    console.log(license);
    try {
      let result = await this.contract.methods
        .addHospital(id, name, location, license)
        .send({ from: this.accounts[0] });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  async addInsuranceComp(event) {
    event.preventDefault();
    let id = document.getElementById("company_id").value;
    let name = document.getElementById("company_name").value;
    let complicense = document.getElementById("complicense").value;
    console.log(id);
    console.log(name);
    console.log(complicense);
    try {
      let result = await this.contract.methods
        .regInsuranceComp(id, name, complicense)
        .send({ from: this.accounts[0] });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  async addUserByAdhaar(event) {
    event.preventDefault();
    try {
      let user_type = document.getElementById("adhaar_user_type").value;
      let user_name = document.getElementById("user_name").value;
      let adhaar_blockchain_id = document.getElementById("adhaar_blockchain_id")
        .value;
      let adhaar_number = document.getElementById("adhaar_number").value;
      let dob = document.getElementById("dob").value;
      let pincode = document.getElementById("pincode").value;

      console.log(pincode);

      if (user_type === "patient") {
        await this.contract.methods
          .addPatientAdhaarInfo(
            adhaar_blockchain_id,
            user_name,
            dob,
            pincode,
            adhaar_number
          )
          .send({ from: this.accounts[0] });
      } else {
        await this.contract.methods
          .addDoctorAdhaarInfo(
            adhaar_blockchain_id,
            user_name,
            dob,
            pincode,
            adhaar_number
          )
          .send({ from: this.accounts[0] });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="container">
        <div
          className="mb-5 row mt-2"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <center>
            <div className="mt-5 text-bold w-full ">
              <div className="col pt-4 w-full rounded-md bg-green-300 pb-4">
                <h4 style={{ align: "centre" }}>Add Hospital</h4>
                <div>
                  <form onSubmit={this.registerHospital}>
                    <div className="label mt-2  ">
                      <b>Blockchain Address:</b>
                    </div>
                    <input
                      className="py-1 px-1 rounded-full w-full"
                      type="text"
                      name="name"
                      id="hosp_id"
                      placeholder="Id"
                    ></input>

                    <br></br>
                    <div className="label mt-2">
                      <b>Name:</b>
                    </div>
                    <input
                      className="py-1 px-1 rounded-full w-full"
                      type="text"
                      name="name"
                      id="hosp_name"
                      placeholder="Name"
                    ></input>

                    <br></br>
                    <div className="label mt-2">
                      <b>License Number:</b>
                    </div>
                    <input
                      className="py-1 px-1 rounded-full w-full"
                      type="text"
                      name="name"
                      id="hosp_license"
                      placeholder="License Number"
                    ></input>

                    <br></br>
                    <div className="label mt-2">
                      <b>Location:</b>
                    </div>
                    <input
                      className="py-1 px-1 rounded-full w-full"
                      type="text"
                      name="name"
                      id="hosp_location"
                      placeholder="Location"
                    ></input>

                    <br></br>

                    <br />
                    <button
                      className="py-2 px-4  text-pink-100 transition-colors duration-150 bg-pink-600 rounded-full hover:bg-blue-700"
                      type="submit"
                    >
                      Add Hospital
                    </button>
                    <br />
                  </form>
                  <br />
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
          </center>
          <div className="m-3" />
          <center>
            <div className="mt-5 text-bold ">
              <div className="col pt-4 w-full rounded-md bg-violet-300 pb-4">
                <h4 style={{ align: "centre" }}>Register Insurance Company</h4>
                <div>
                  <form className="font-bold" onSubmit={this.addInsuranceComp}>
                    <div className="label mt-2">Name:</div>
                    <input
                      type="text"
                      className="py-1 px-1 rounded-full w-full"
                      id="company_name"
                      placeholder="Name"
                    ></input>
                    <br></br>
                    <div className="label mt-2">Blockchain Address:</div>
                    <input
                      type="text"
                      className="py-1 px-1 rounded-full w-full"
                      id="company_id"
                      placeholder="Id"
                    ></input>
                    <br></br>
                    <div className="label mt-2">License Number:</div>
                    <input
                      type="text"
                      className="py-1 px-1 rounded-full w-full"
                      id="complicense"
                      placeholder="License"
                    ></input>
                    <br></br>
                    <br />
                    <button
                      className="py-2 px-4  text-pink-100 transition-colors duration-150 bg-pink-600 rounded-full hover:bg-blue-700"
                      type="submit"
                    >
                      Create Company
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </center>
        </div>
        <center>
          <div className="mt-5 text-bold " className="patient-doctor">
            <div className="col pt-4 w-full rounded-md bg-violet-300 pb-4">
              <h4>Add User by Adhaar</h4>
              <div>
                <form className="font-bold" onSubmit={this.addUserByAdhaar}>
                  <select
                    className="bg-pink-400 p-2 text-white rounded-md"
                    id="adhaar_user_type"
                    name="adhaar_user_type"
                  >
                    <option
                      className="p-2 text-white rounded-md"
                      value="patient"
                    >
                      Patient
                    </option>
                    <br></br>
                    <option
                      className="p-2 text-white rounded-md"
                      value="doctor"
                    >
                      Doctor
                    </option>
                  </select>
                  <br></br>
                  <br></br>
                  <div className="label mt-2">Name:</div>

                  <input
                    type="text"
                    className="py-1 px-1 rounded-full w-70"
                    id="user_name"
                    placeholder="Name"
                  ></input>
                  <br></br>
                  <br></br>
                  <div className="label mt-2">Blockchain Address:</div>
                  <input
                    type="text"
                    className="py-1 px-1 rounded-full w-70"
                    id="adhaar_blockchain_id"
                    placeholder="Blockchain Id"
                  ></input>
                  <br></br>
                  <br></br>
                  <div className="label mt-2">Adhaar number:</div>
                  <input
                    type="text"
                    className="py-1 px-1 rounded-full w-70"
                    id="adhaar_number"
                    placeholder="Adhaar"
                  ></input>
                  <br></br>
                  <br></br>
                  <div className="label mt-2">Certificate Number:</div>
                  <input
                    type="text"
                    className="py-1 px-1 rounded-full w-70"
                    id="certificate"
                    placeholder="Certificate Number"
                  ></input>
                  <br></br>
                  <br></br>
                  <div className="label mt-2">DOB:</div>
                  <input
                    type="text"
                    className="py-1 px-1 rounded-full w-70"
                    id="dob"
                    placeholder="DD/MM/YYYY"
                  ></input>
                  <br></br>
                  <br></br>
                  <div className="label mt-2">pincode:</div>
                  <input
                    type="text"
                    className="py-1 px-1 rounded-full w-70"
                    id="pincode"
                    placeholder="pincode"
                  ></input>

                  <br></br>
                  <br />
                  <br></br>
                  <button
                    className="py-2 pb-8 px-4  text-pink-100 transition-colors duration-50 bg-pink-600 rounded-full hover:bg-blue-700"
                    type="submit"
                  >
                    ADD to EHR
                  </button>
                </form>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Admin;
