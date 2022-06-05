//SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.1;


contract HospitalContract{
    ////
    ///...Different objects

    struct Hospital{
        address hospital_account_address;
        string name;
        string hospital_address;
        uint hospital_number; 
        bool isRegistered;
        
    }
    
    struct Doctor{
        address doctor_account_address;
        string name;
        string specializations;
    }

    struct Patient{
        address patient_account_address;
        string name;
        string perm_address;
        int8 age;
        string gender;
        bool registered;
    }


    struct EHR{
        string date; 
        string disease_name;
        string medicines_prescribed;
        string ipfshash_of_documnet;
    }

    ////....Creating the administrator of the system

    address internal administrator;
    constructor(){
        administrator=msg.sender;
    }

    //.....Creation of  Hospital by administrator
    

    mapping(address=>Hospital) public hosital_list;

    modifier isOwner(){
        require((msg.sender==administrator),"YOU ARE NOT PERMITTED TO DO THIS");
        _;
    }
    

    function addHospital( 
        address hospital_account_address,
        string memory name,
        string memory hospital_address,
        uint hospital_number
        )  
        
        public
        
        isOwner
        {

        
        Hospital memory newHp;
        newHp.hospital_account_address=hospital_account_address;
        newHp.name=name;
        newHp.hospital_address=hospital_address;
        newHp.hospital_number=hospital_number;
        newHp.isRegistered=true;
        hosital_list[hospital_account_address]=newHp;


    }

    //.....Deletion of hospital by administrator

    function removeHospital(address hospital_account_address) public  isOwner returns(bool){
        
        require((hosital_list[hospital_account_address].isRegistered),"Hospital dont exists");
        delete hosital_list[hospital_account_address];
        return true;
    }
   

   /////.......recruitement of doctor by hospital

    modifier isHospital(){
        require((hosital_list[msg.sender].isRegistered),"Only hospital have this access");
        _;
    }

  
    mapping(address=>Doctor[]) doctors_in_hospital;

    function addDoctor(
        address doctor_account_address,
        string memory name,
        string memory specializations
    )
        public isHospital returns(bool)
    {
        
        doctors_in_hospital[msg.sender].push(Doctor(doctor_account_address,name,specializations));
        return true;
    }


    function removeDoctor(address doctor_account_address) public isHospital returns(bool){
        for(uint i=0; i<doctors_in_hospital[msg.sender].length; i++){
            if(doctors_in_hospital[msg.sender][i].doctor_account_address==doctor_account_address){
                delete doctors_in_hospital[msg.sender][i];
                return true;
            }
        }     
        revert("Either doctor is not recruited or hospital not registered");                
    }



    ////adding patient to the block chain by hospital 
  

    mapping(address=>Patient) public patients;

    modifier isPatient(address patient_address){
        require((patients[patient_address].registered),"patient not registered");
        _;
    }

    function addPatint(
        address patient_account_address,
        string memory name,
        string memory perm_address,
        int8 age,
        string memory gender
        
    ) isHospital public returns(bool){
        Patient memory pat;
        pat.patient_account_address=patient_account_address;
        pat.name=name;
        pat.perm_address=perm_address;
        pat.age=age;
        pat.gender=gender;
        pat.registered=true;
        patients[patient_account_address]=pat;
        return true;
    }   


    mapping (address=>EHR[]) patientEhrs;

    function addEHR(
        address patient_address,
        string memory date,
        string memory disease_name,
        string memory medicines_prescribed,
        string memory ipfshash_of_document    
        ) public isPatient(patient_address)  returns(bool) {
            EHR memory ehr= EHR(
                    date,
                    disease_name,
                    medicines_prescribed,
                    ipfshash_of_document
                );
            patientEhrs[patient_address].push(ehr);
            return true;
    }
}

///////////////////



