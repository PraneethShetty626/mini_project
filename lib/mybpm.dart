import 'dart:async';

import 'package:flutter/material.dart';

import 'package:heart_bpm/heart_bpm.dart';
import 'package:square_progress_bar/square_progress_bar.dart';

class HeartMeasure extends StatefulWidget {
  const HeartMeasure({Key? key}) : super(key: key);

  @override
  HeartMeasureState createState() => HeartMeasureState();
}

class HeartMeasureState extends State<HeartMeasure> {
  // List<SensorValue> data = [];
  List<int> bpmValues = [];
  int sum = 0;
  bool start = false;
  int time = 0;

  void bpmavg() {
    for (var i in bpmValues) {
      sum += i;
    }

    sum = (sum / bpmValues.length).abs().toInt();

    bpmValues.clear();

    setState(() {
      start = false;
      sum;
    });
  }

  void startMeasure() {
    setState(() {
      start = true;
      time = 10;
    });

    Timer.periodic(
      const Duration(seconds: 1),
      ((timer) {
        if (time == 0) {
          timer.cancel();
          bpmavg();
        } else {
          setState(() {
            time--;
          });
        }
      }),
    );
  }

  Widget get mybp => HeartBPMDialog(
        context: context,
        alpha: 0.90,
        sampleDelay: 1000 ~/ 20,
        onRawData: (val) {},
        onBPM: (val) {
          if (val > 50 && val < 100) {
            bpmValues.add(val);
          }
        },
      );

  Widget get progress => SquareProgressBar(
        width: 110, // default: max available space
        height: 110, // default: max available space
        progress: time / 10, // provide the progress in a range from 0.0 to 1.0
        isAnimation: false, // default: false, animate the progress of the bar
        solidBarColor: const Color.fromARGB(
            255, 255, 7, 7), // default: blue, main bar color
        emptyBarColor: const Color.fromARGB(255, 255, 47, 0)
            .withOpacity(0.2), // default: gray, empty bar color
        strokeWidth: 20, // default: 15, bar width
        barStrokeCap:
            StrokeCap.round, // default: StrokeCap.round, bar cap shape
        isRtl: true, // default: false, bar start point

        gradientBarColor: const LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          colors: <Color>[Colors.red, Colors.amber],
          tileMode: TileMode.repeated,
        ), // default: null, if you pass gradient color it will be used instead of solid color for the main bar
        child: Padding(
          padding: EdgeInsets.all(4),
          child: Center(
            child: mybp,
          ),
        ),
      );

  ///////
  ///
  ///
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        alignment: Alignment.center,
        child: start
            ? progress
            : Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    sum.toString(),
                    style: TextStyle(fontSize: 100),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 50),
                    child: IconButton(
                      icon: const Icon(
                        Icons.favorite,
                        color: Colors.red,
                      ),
                      onPressed: startMeasure,
                      iconSize: 150,
                    ),
                  )
                ],
              ),
      ),
      
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton:start? null:Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          FloatingActionButton(
            backgroundColor: Colors.red,
            tooltip: "Add HBPM to Blockchain",
            child:const Icon(Icons.add),
            onPressed: () {

              //


              
            },
          ),

          FloatingActionButton(
             backgroundColor: Colors.red,
            tooltip: "View HBPM history",
            child:const Icon(Icons.linear_scale_sharp),
            onPressed: () {
              //



            },
          ),
        ],
      ),
    );
  }
}
