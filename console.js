const {Board, Servo, Servos} = require("johnny-five");
const board = new Board();


board.on("ready", () => {
  const base = new Servo({
    pin: 2,
    range: [0, 180],
    startAt: 0
  });
  const leftServo = new Servo({
    pin: 8,
    range: [0, 180],
    startAt: 0
  });
  const rightServo = new Servo({
    pin: 5,
    range: [0, 360],
    startAt: 0
  });
  const claw = new Servo({
    pin: 6,
    range: [0, 180],
    startAt: 0
  });
  const servos = new Servos([leftServo, rightServo]);


  // Add servo to REPL (optional)
  board.repl.inject({
    servos, leftServo, rightServo, base, claw
  });

  const left = async () => {
    return new Promise(res => {
      claw.to(40, 1000);
      claw.to(100, 1000);
      setTimeout(res, 1000);
    });
  };

  const take = async () => {
    return new Promise(res => {
      claw.to(110, 1000);
      claw.to(40, 3000);
      setTimeout(res, 2000);
    });
  };

  const downClaw = async () => {
    return new Promise(res => {
      leftServo.to(50, 2000);
      rightServo.to(50, 2000);
      setTimeout(res, 2000);
    });
  };

  const baseToTarget = async () => {
    return new Promise(res => {
      base.to(100, 2000);
      setTimeout(res, 2000);
    });
  };

  const upClaw = async () => {
    return new Promise(res => {
      leftServo.to(0, 2000);
      rightServo.to(0, 2000);
      setTimeout(res, 2000);
    });
  };

  const baseToRevert = async () => {
    return new Promise(res => {
      base.to(0, 2000);
      setTimeout(res, 2000);
    });
  };

  const asyncMain = async function () {
    await take();
    //await upClaw();
    await baseToTarget();
    await downClaw();
    await left();
    await upClaw();
    await baseToRevert();
    await take();
  };

  asyncMain().then(res => {
    console.log('ended');
  });


});

