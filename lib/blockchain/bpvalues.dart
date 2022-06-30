import 'dart:convert';
import 'dart:ffi';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart';
import 'package:web3dart/web3dart.dart';


class BP extends ChangeNotifier {
  List<dynamic> bpvalues = [];
  List<dynamic> dates=[];


  final String _rpcUrl = "HTTP://192.168.150.187:7545";
  // final String _wsUrl = "ws://127.0.0.1:7545/";

  final String _privateKey =
      "4369c0c2bebaa8a3b5a88d2e36f967e240c51b3b3f912df780c2ab596b094ef9";

  Web3Client? _client;
  String? _abiCode;

  Credentials? _credentials;
  EthereumAddress? _contractAddress;
  DeployedContract? _contract;

  ContractFunction? addBp;
  ContractFunction? getBp;
  ContractFunction? getDate;
  



  BP() {
    init();
  }

  init() async {
    _client = Web3Client(_rpcUrl, Client());
    await getAbi();
    await getCreadentials();
    await getDeployedContract();
  }

  Future<void> getAbi() async {
    String abiStringFile = await rootBundle
        .loadString("assets/Notes.json");
    var jsonAbi = jsonDecode(abiStringFile);
    _abiCode = jsonEncode(jsonAbi['abi']);
    _contractAddress =
        EthereumAddress.fromHex(jsonAbi["networks"]["5777"]["address"]);

    print("\n1\n");
  }

  Future<void> getCreadentials() async {
    // ignore: deprecated_member_use
    _credentials = await _client!.credentialsFromPrivateKey(_privateKey);
    print("\n2\n");

  }

  Future<void> getDeployedContract() async {
    _contract = DeployedContract(
        ContractAbi.fromJson(_abiCode!, "NotesContract"), _contractAddress!);
    addBp = _contract!.function("addBp");
    getBp=_contract!.function("getBp");
    getDate=_contract!.function("getDate");

    print("\n3\n");

    
  }


  Future<void> add(int val) async{
    try{
              var r=await _client!.sendTransaction(_credentials!, Transaction.callContract(contract: _contract!, function: addBp!, parameters: [BigInt.from(val),DateTime.now().toString()]));

              print(r);
    }
    catch (e) {
          rethrow;
    }

  }

  Future<void>  get() async{
     bpvalues= (await _client!.call(contract: _contract!, function: getBp!, params: [],sender: EthereumAddress.fromHex("0x332658f80B5640231cf40B92aaED42a72911279E")))[0];
     dates=(await _client!.call(contract: _contract!, function: getDate!, params: [],sender: EthereumAddress.fromHex("0x332658f80B5640231cf40B92aaED42a72911279E")))[0];

     print(bpvalues);

  }




}
