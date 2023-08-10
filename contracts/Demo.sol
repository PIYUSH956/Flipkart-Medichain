// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "hardhat/console.sol";
contract Demo{
     struct file{
        string hashId;
        string fileName; 
        address patientId;
        address doctorId;
        uint256 timeAdded;
    }
   

    struct Patient{
        address add;
        string name;
        string email;
        string password;
        string aadhar;
        
    }
    struct Doctor{
        string name;
        string aadhar;
        string email;
    }
   

    mapping (address=>Patient) public Patients;
    mapping (address=>Doctor) public Doctors;
    mapping (address => file[]) public  patientFiles;
    mapping (string=>address) public aadharToAddress;
    mapping(address=>mapping(address=>uint256)) public patientToDocAccess;
    mapping (address=>address[]) public docToPatient;
    string[] public aadharList;//for testing
    
    function createUser(string memory _aadhar,string memory _name,string memory _email, string memory _password) public{
            require(aadharToAddress[_aadhar]==0x0000000000000000000000000000000000000000,"exit") ;
            
            Patients[msg.sender].add=msg.sender;
            Patients[msg.sender].name=_name;
            Patients[msg.sender].email=_email;
            Patients[msg.sender].password=_password;
            Patients[msg.sender].aadhar=_aadhar;
            aadharList.push(_aadhar); //for testing dont delete user
            aadharToAddress[_aadhar]=msg.sender;
    }

    function deleteUser() public {
        string memory _aadhar=Patients[msg.sender].aadhar;
        delete aadharToAddress[_aadhar];
        delete Patients[msg.sender];
    }
    function registerDoctor(string memory _aadhar,string memory _name,string memory _email) public {
        require(aadharToAddress[_aadhar]==0x0000000000000000000000000000000000000000,"exit") ;
        
        Doctors[msg.sender]=Doctor(_name,_aadhar,_email);
        aadharToAddress[_aadhar]=msg.sender;
    }

    function addFiles(string memory _aadhar,string memory _fileHash,string memory _fileName) public{
        address userAdd=aadharToAddress[_aadhar];
        require(userAdd!=0x0000000000000000000000000000000000000000,"does not exist");
        file memory temp;
        temp.hashId=_fileHash;
        temp.fileName=_fileName;
        temp.patientId=userAdd;
        temp.doctorId=msg.sender;
        temp.timeAdded=block.timestamp;

        patientFiles[userAdd].push(temp);
    }

    function grantAccess(string memory _aadharDoc,uint256 _time) public {
       
        require(aadharToAddress[_aadharDoc]!=0x0000000000000000000000000000000000000000,"does not exist");
        address temp=aadharToAddress[_aadharDoc];
        patientToDocAccess[msg.sender][temp]=block.timestamp+_time;
        docToPatient[temp].push(msg.sender);

    }

    function revokeAccess(string memory _aadharDoc) public{
        require(aadharToAddress[_aadharDoc]!=0x0000000000000000000000000000000000000000,"does not exist");
        address temp=aadharToAddress[_aadharDoc];
        patientToDocAccess[msg.sender][temp]=0;
        delete docToPatient[msg.sender];
    }

    // function filesAccessibleToDoctor() public returns( file[] memory){
    //     //address[] memory arr;
    //     file[] memory temp;
    //     // msg.sender is the current doctor
    //     for(uint i=0;i<docToPatient[msg.sender].length;i++){
    //         if(patientToDocAccess[docToPatient[msg.sender][i]][msg.sender]>=block.timestamp){
    //             //address of patients
    //             //arr.push(docToPatient[msg.sender][i]);
    //             for(uint j=0;j<patientFiles[docToPatient[msg.sender][i]].length;j++){
    //                 temp.push(patientFiles[docToPatient[msg.sender][i]][j]);
    //             }
    //         }
    //     }

    // }
    // function getAllusers() public view{
    //     for(uint i=0;i<aadharList.length;i++){
    //         address temp=aadharToAddress[aadharList[i]];
    //         console.log(Patients[temp].add,Patients[temp].name,patientFiles[temp].length);
    //     }
    // }

}