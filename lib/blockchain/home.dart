import 'package:flutter/material.dart';
import 'bpvalues.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  BP? bp;
  int count = 1;

  @override
  void initState() {
    bp = BP();
    super.initState();
  }

  List<BPvalues> chartData = [];

  void addData() {
    for (int i = 0; i < bp!.bpvalues.length; i++) {
      chartData.add(BPvalues(bp!.dates[i].toString(), bp!.bpvalues[i]));
    }
    print(chartData);
  }

  int c = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemBuilder: (context, i) {
          return ListTile(
            subtitle: Text(bp!.dates[i].toString()),
            title: Text(bp!.bpvalues[i].toString()),
          );
        },
        itemCount: bp!.bpvalues.length,
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          FloatingActionButton(onPressed: () {
            bp!.add(count++);
          }),
          FloatingActionButton(onPressed: () {
            bp!.get();
            setState(() {});
          }),
        ],
      ),
    );
  }
}

class BPvalues {
  String date;
  BigInt value;

  BPvalues(this.date, this.value);
}
