// importing the mam client library
const Mam = require("@iota/mam");

// import the converter module
const Converter = require("@iota/converter");

// define the entry point into the tange
const provider = "https://nodes.devnet.iota.org:443";

// change mode of operation of MAM
const mode = "private"; // public | private | restricted

// add a sidekey
const sideKey =
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

// initialize the mam object
let state = Mam.init(provider);

if (mode == "private") {
  Mam.changeMode(state, "private");
} else {
  Mam.changeMode(state, "restricted", sideKey);
}

//console.log(state);

// define the function to send the message
const publish = async function(packet) {
  const trytes = Converter.asciiToTrytes(JSON.stringify(packet));

  const message = Mam.create(state, trytes);
  state = message.state;
  //console.log(state);

  await Mam.attach(message.payload, message.address);
  console.log(message.root);
  return message.root;
};

// generate random, JSON formatted data
const sensorData = () => {
  return JSON.stringify({
    time: new Date(),
    data: Math.floor(Math.random() * 100 + 1)
  });
};

// publish sensor data
setInterval(() => {
  publish(sensorData());
}, 10000);

//publish("**ping**");
