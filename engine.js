'use strict';

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
let currentDegrees = 10;

five.Board().on('ready', function() {
    console.log('Arduino is ready.');
    app.post('/move', () => {
        var claw = new five.Servo(9);
        var arm = new five.Servo(10);
        var incrementer = 10;
        var last;


        this.loop(25, function() {
            if (currentDegrees >= 180 || currentDegrees === 0) {
                incrementer *= -1;
            }
            currentDegrees += incrementer;
            if (currentDegrees === 180) {
                if (!last || last === 90) {
                    last = 180;
                } else {
                    last = 90;
                }
                arm.to(last);
            }
            claw.to(currentDegrees);
        });
    });

    app.post('/back', () => {
        var claw = new five.Servo(9);
        var arm = new five.Servo(10);
        var incrementer = 10;
        var last;

        this.loop(25, function() {
            if (currentDegrees >= 180 || currentDegrees === 0) {
                incrementer *= -1;
            }
            currentDegrees -= incrementer;
            if (currentDegrees === 180 || currentDegrees === 0) {
                if (!last || last === 90) {
                    last = 0;
                } else {
                    last = 90;
                }
                arm.to(last);
            }
            claw.to(currentDegrees);
        });
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on http://0.0.0.0:${port}`);
