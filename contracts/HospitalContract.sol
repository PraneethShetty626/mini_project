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
        address current_hospital_address;
        string name;
        string[] specializations;
    }

    struct Patient{
        address patient_account_address;
        EHR[] medical_records;
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

    Doctor[] doctor_list;

    function addDoctor(
        address doctor_account_address,
        string memory name,
        string[] memory specializations
    )
        public isHospital returns(bool)
    {
        doctor_list.push(Doctor(doctor_account_address,msg.sender,name,specializations));
        return true;
    }


    function removeDoctor(address doctor_account_address) public isHospital returns(bool){
        for(uint i=0; i<doctor_list.length; i++){
            if(doctor_list[i].doctor_account_address==doctor_account_address && doctor_list[i].current_hospital_address==msg.sender){
                delete doctor_list[i];
                return true;
            }
        }     
           revert("Either doctor is not recruited or hospital not registered");                
    }




  


    

}

///////////////////



