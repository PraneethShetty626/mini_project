import React, { Component } from "react";
import Home from './Home';


import "./css/DocLogin.css";

const App = () => {
  const slides = [
    { url: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg" },
    { url: "https://thumbs.dreamstime.com/b/hand-holding-glass-globe-ball-tree-growing-green-nature-blur-background-eco-concept-161081206.jpg" },
    { url: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg" },
    { url: "https://thumbs.dreamstime.com/b/hand-holding-glass-globe-ball-tree-growing-green-nature-blur-background-eco-concept-161081206.jpg" },
    { url: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"},
  ];
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };
};

class DocLogin extends Component {

  state = { textvalue: "", formNum: -1, age: 0, pat_reg_login: 0, showMob: false };
  cont = this.props.state.contract;
  Acc = this.props.state.accounts;




  async checkDoc(event) {
    event.preventDefault(true);
    var result = null
    try {
      let adhaar_number = document.getElementById('doc_adhaar_number').value;
      result = await this.cont['OPT'].methods.checkDoctorInfo(adhaar_number).call({ from: this.Acc[0] });
      console.log(result);
      if (result[1] === '0x0000000000000000000000000000000000000000') {
        alert('Invalid Doctor Account !')
      }
      else {
        this.props.onlogin(result[0], 0);
      }
    }
    catch (err) {
      alert('Invalid Credentials. ');
      // console.log(result)
    }

  }

  handleMob() {
    this.state.showMob ? this.setState({ showMob: false }) : this.setState({ showMob: true });
  }

  async registerPat(event) {
    event.preventDefault(true);
    let name = document.getElementById('patient_name').value;
    let gender = document.getElementById('patient_gender').value;
    let contact_info = document.getElementById('patient_cont').value;
    await this.cont['OPT'].methods.signupPatient(name, contact_info, gender).send({ from: this.Acc[0] });
    console.log(name);
    console.log(gender);
    console.log(contact_info);
  }


  async checkPat(event) {
    event.preventDefault(true);

    var result = null;
    try {
      let adhaar_number = document.getElementById('pat_adhaar_number').value;
      result = await this.cont['OPT'].methods.checkPatientInfo(adhaar_number).call({ from: this.Acc[0] });
      console.log(result);
      if (result[1] === '0x0000000000000000000000000000000000000000') {
        alert('Invalid Patient Account !');
      }
      else {
        this.props.onlogin(result[0], 1);

      }
    }
    catch (err) {
      alert('Invalid Credentials. Make sure Account Address and Adhaar Number is entered correctly');
    }

  }

  async checkHospital(event) {
    event.preventDefault();
    var result = null;

    try {
      result = await this.cont['OPT'].methods.getHospitalInfo().call({ from: this.Acc[0] });
      console.log(result[0]);
      this.props.onlogin(result[0], 2);
    }
    catch (err) {
      alert('Admin has not created your hospital account');
    }

    console.log("Hospital check");
  }

  async checkAdmin(event) {
    event.preventDefault();
    var result = null;

    try {
      result = await this.cont['OPT'].methods.getAdminInfo().call({ from: this.Acc[0] });
      console.log(result);
      this.props.onlogin(result[0], 3);

    }
    catch (err) {
      alert('You are not the Admin');
    }
    console.log("Admin check");
  }

  async checkInsuranceComp(event) {
    event.preventDefault();
    var result = null;
    try {
      result = await this.cont['OPT'].methods.getInsuranceCompInfo().call({ from: this.Acc[0] });
      if (result[1] === '0x0000000000000000000000000000000000000000') {
        alert('Invalid Insurance Account !')
      }
      else {
        this.props.onlogin(result[0], 4);
      }
    }
    catch (e) {
      alert('You are not registered by the Admin')
    }
  }

  patientLoginForm() {
    this.setState({ pat_reg_login: 1 });
  }

  patientRegisterForm() {
    this.setState({ pat_reg_login: 0 });
  }

  render() {
    this.checkDoc = this.checkDoc.bind(this);
    this.registerPat = this.registerPat.bind(this);
    this.checkPat = this.checkPat.bind(this);
    this.checkHospital = this.checkHospital.bind(this);
    this.checkAdmin = this.checkAdmin.bind(this);
    this.checkInsuranceComp = this.checkInsuranceComp.bind(this);
    this.patientLoginForm = this.patientLoginForm.bind(this);
    this.patientRegisterForm = this.patientRegisterForm.bind(this);
    this.handleMob = this.handleMob.bind(this);

    const AdminForm =
      <div className="container">
        <br></br>
        <br></br>
        <h3 style={{ align: 'centre' }}>Admin</h3>

        <div style={{ marginLeft: '20px' }}>
          <form>

            <br></br>
            <button class="py-2 px-4  text-white-300 transition-colors duration-150 bg-yellow-200
            rounded-full hover:bg-green-700"  onClick={this.checkAdmin}>Connect Wallet</button>
          </form>
        </div>
      </div>;

    const hospitalForm =

      <div className="container">
        <br></br>
        <br></br>
        <h3 style={{ align: 'centre' }}>Hospital</h3>

        <div style={{ marginLeft: '20px' }}>
          <form>

            <br></br>
            <button class="py-2 px-4  text-white-200 transition-colors duration-150 bg-yellow-200 rounded-full hover:bg-green-700" onClick={this.checkHospital}>Login By Address</button>
          </form>
        </div>
      </div>;

    const insuranceCompForm =
      <div className="container">
        <br></br>
        <br></br>
        <h3 style={{ align: 'centre' }}>Insurance Company</h3>

        <div style={{ marginLeft: '20px' }}>
          <form>

            <br></br>
            <button class="py-2 px-4  text-white-200 transition-colors duration-150 bg-pink-600 rounded-full hover:bg-green-700" onClick={this.checkInsuranceComp}>Connect to Wallet</button>
          </form>
        </div>
      </div>

    const docForm =
      <div className="container">
        <br>
        </br>
        <br></br>
        <h3 className="textAlign:center">Doctor</h3><br />

        <div style={{ marginLeft: '20px' }}>
          <form>
            <div className="label mt-2"><b>Adhaar Number</b></div>
            <input type="text" className="py-1 px-1 pl-2 rounded-full border-2 border-indigo-800" name="adhaar_number" id="doc_adhaar_number" placeholder="Adhaar Number"></input>
            <br></br>
            <br />

            <button class="h-10 px-5 m-2 text-blue-300 transition-colors duration-150 bg-blue-600 rounded-full focus:shadow-outline hover:bg-blue-700" onClick={this.checkDoc}>Login As Doctor</button>
          </form>
        </div>
      </div>;

    const patForm =
      <div>
        <div><h3 style={{ align: 'centre' }}>Patient</h3></div>
        <button class="h-10 px-5 m-2 text-pink-100 transition-colors duration-150 bg-pink-600 rounded-full focus:shadow-outline hover:bg-pink-700" variant="dark" onClick={this.patientRegisterForm}>Register Patient</button>
        <button class="h-10 px-5 m-2 text-blue-300 transition-colors duration-150 bg-blue-600 rounded-full focus:shadow-outline hover:bg-blue-700" variant="dark" onClick={this.patientLoginForm}>Login</button>

        {this.state.pat_reg_login === 0 ?
          <div>
            <form onSubmit={this.registerPat}>
              <div className="label mt-2"><b>Enter Name</b></div>

              <input type="text" className="py-1 px-1 rounded-full border-2 border-indigo-800 " name="name" id="patient_name" placeholder="Name" />

              <br></br>
              <br />

              <div className="label mt-2"><b>Address</b></div>

              <input type="text" className="py-1 px-1 rounded-full border-2 border-indigo-800 " name="address" id="patient_address" placeholder="Address"></input>
              <br></br>
              <br />

              <div className="label mt-2"><b>Gender</b></div>

              <select id="patient_gender" name="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Others">Others</option>
              </select>
              <br></br>
              <br />

              <div className="label mt-2"><b>Contact Info</b></div>

              <input type="text" className="py-1 px-1 rounded-full border-2 border-indigo-600 " name="contact info" id="patient_cont" placeholder="Contact Info"></input>
              <br></br>


              <button class="h-10 px-5 m-2 text-indigo-300 transition-colors duration-150 bg-indigo-600 rounded-full focus:shadow-outline hover:bg-indigo-700" variant="dark" type="submit">Register Patient</button>
            </form>
            <br />
          </div>
          :

          <div>
            <div className="label mt-2"><b>Adhaar Number</b></div>

            <input type="text" className="py-1 px-1 rounded-full border-2 border-indigo-600" name="adhaar_number" id="pat_adhaar_number" placeholder="Adhaar Number"></input>
            <br></br>

            <button class="h-10 px-5 m-2 text-blue-300 transition-colors duration-150 bg-blue-600 rounded-full focus:shadow-outline hover:bg-blue-700" variant="dark" onClick={this.checkPat.bind(this)}>Login As Patient</button>

          </div>
        }

      </div>;


    const fNum = this.state.formNum;

    let loadForm;
    if (fNum === 0)
      loadForm = docForm;
    else if (fNum === 1)
      loadForm = patForm;
    else if (fNum === 2)
      loadForm = hospitalForm;
    else if (fNum === 3)
      loadForm = AdminForm;
    else if (fNum === 4)
      loadForm = insuranceCompForm;



    return (

      <div className="App h-full bg-white w-full">
        <nav class="bg-green-600">
          <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
              <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" onClick={this.handleMob} class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
                <div class="hidden sm:block sm:ml-6">
                  <div class="flex space-x-4">
                  <a href="#" onClick={(event) => this.setState({ formNum: -1 })} class="text-white hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md text-[25px] font-large" ><b>Home</b></a>
                    <a href="#" onClick={(event) => this.setState({ formNum: 3 })} class="text-white hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md text-[25px] font-large" ><b>Admin</b></a>

                    <a href="#" onClick={(event) => this.setState({ formNum: 0 })} class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-[25px] font-medium"><b>Doctor</b></a>

                    <a href="#" onClick={(event) => this.setState({ formNum: 1 })} class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-[25px] font-medium"><b>Patient</b></a>

                    <a href="#" onClick={(event) => this.setState({ formNum: 2 })} class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-[25px] font-medium"><b>Hospital</b></a>

                    <a href="#" onClick={(event) => this.setState({ formNum: 4 })} class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-[25px] "> <b>Insurance Company </b> </a>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.state.showMob && <div id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1">
             
            <p href="#" onClick={(event) => this.setState({ formNum: -1})} class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-lg italic">Home</p>

              <p href="#" onClick={(event) => this.setState({ formNum: 3 })} class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-lg italic">Admin</p>

              <a href="#" onClick={(event) => this.setState({ formNum: 0 })} class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-lg italic">Doctor</a>

              <a href="#" onClick={(event) => this.setState({ formNum: 1 })} class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium italic">Patient</a>

              <a href="#" onClick={(event) => this.setState({ formNum: 2 })} class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium italic">Hospital</a>

              <a href="#" onClick={(event) => this.setState({ formNum: 4 })} class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium italic">Insurance Company</a>
            </div>
          </div>}
        </nav>
        <br></br>
        {
          this.state.formNum === -1 ? <Home/> : <div/>
        }

        <fieldset>

          {loadForm}
        </fieldset>
      </div>

    );
  }
}


export default DocLogin;