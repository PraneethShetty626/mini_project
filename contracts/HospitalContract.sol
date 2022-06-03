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
    

    mapping(address=>Hospital)internal hosital_list;

    function addHospital( 
        address hospital_account_address,
        string memory name,
        string memory hospital_address,
        uint hospital_number
        )  
        
        public
        
        {

        require((msg.sender==administrator),"YOU ARE NOT PERMITTED TO DO THIS");
        Hospital memory newHp;
        newHp.hospital_account_address=hospital_account_address;
        newHp.name=name;
        newHp.hospital_address=hospital_address;
        newHp.hospital_number=hospital_number;
        hosital_list[hospital_account_address]=newHp;


    }

    //.....Deletion of hospital by administrator

    function removeHospital(address hospital_account_address) public returns(bool){
        require((msg.sender==administrator),"You are not permitted");
        require((hosital_list[hospital_account_address].hospital_account_address!=hospital_account_address),"Hospital dont exists");
        delete hosital_list[hospital_account_address];
        return true;
    }
   
   


   //...Recruitement of doctor by the hospital
    //    struct Doctor{
    //     address doctor_account_address;
    //     address current_hospital_address;
    //     string name;
    //     string[] specializations;
    // }

 

}

///////////////////



