import 'package:block_fog/blockchain/bpvalues.dart';
import 'package:flutter/material.dart';

class ViewBp extends StatefulWidget {
  BP bp;
  ViewBp(this.bp, {Key? key}) : super(key: key);

  @override
  State<ViewBp> createState() => _ViewBpState();
}

class _ViewBpState extends State<ViewBp> {
  BP? bp;

  List<BPvalues> chartData = [];

  void addData() {
    chartData = [];
    for (int i = 0; i < bp!.bpvalues.length; i++) {
      chartData.add(BPvalues(bp!.dates[i].toString(), bp!.bpvalues[i]));
    }
    print(chartData);
    // setState(() {});
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    bp = widget.bp;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        title: const Text("HBPM history"),
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              icon: Icon(Icons.exit_to_app))
        ],
      ),
      body: FutureBuilder(
        future: bp!.get(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            addData();

            return ListView.builder(
              itemCount: chartData.length,
              itemBuilder: (context, index) {
                return Container(
                  height: 50,
                  child: Row(
                    children: [
                      Text("Time : ${chartData[index].date}"),
                      const SizedBox(
                        width: 10,
                      ),
                      Text("HBPM value : ${chartData[index].value}"),
                    ],
                  ),
                );
                // return ListTile(leading: Text(chartData[index].date),title: Text(chartData[index].value.toString()),);
              },
            );
          }
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    );
  }
}

class BPvalues {
  String date;
  BigInt value;

  BPvalues(this.date, this.value);
}
