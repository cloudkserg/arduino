const {Board, Servo, Servos} = require("johnny-five");

module.exports = class TestBoard {
    constructor() {
        this.board = new Board();
    }

    async init() {
        this.base = new Servo({
            pin: 2,
            range: [0, 180],
            startAt: 0
        });
        this.leftServo = new Servo({
            pin: 8,
            range: [0, 180],
            startAt: 0
        });
        this.rightServo = new Servo({
            pin: 5,
            range: [0, 360],
            startAt: 0
        });
        this.claw = new Servo({
            pin: 6,
            range: [0, 180],
            startAt: 0
        });
        this.servos = new Servos([this.leftServo, this.rightServo]);
        return new Promise(res => res);
        return new Promise(res => this.board.on("ready", () => res));
    }


    async left() {
        return new Promise(res => {
            this.claw.to(40, 1000);
            this.claw.to(100, 1000);
            setTimeout(res, 1000);
        });
    }

    async take() {
        return new Promise(res => {
            this.claw.to(110, 1000);
            this.claw.to(40, 3000);
            setTimeout(res, 2000);
        });
    }

    async downClaw() {
        return new Promise(res => {
            this.leftServo.to(50, 2000);
            this.rightServo.to(50, 2000);
            setTimeout(res, 2000);
        });
    }

    async baseToTarget() {
        return new Promise(res => {
            this.base.to(100, 2000);
            setTimeout(res, 2000);
        });
    }

    async upClaw() {
        return new Promise(res => {
            this.leftServo.to(0, 2000);
            this.rightServo.to(0, 2000);
            setTimeout(res, 2000);
        });
    }

    async baseToRevert() {
        return new Promise(res => {
            this.base.to(0, 2000);
            setTimeout(res, 2000);
        });
    }

    async asyncMain() {
        await this.take();
        //await upClaw();
        await this.baseToTarget();
        await this.downClaw();
        await this.left();
        await this.upClaw();
        await this.baseToRevert();
        await this.take();
    }

    moveTo() {
        return this.asyncMain();
    }

    repl() {
        // Add servo to REPL (optional)
        this.board.repl.inject({
            servos: this.servos,
            leftServo: this.leftServo,
            rightServo: this.rightServo,
            base: this.base,
            claw: this.claw
        });
    }
}


