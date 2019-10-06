// importing the mam client library
const Mam = require("@iota/mam");

// define the entry point into the tange
const provider = "https://nodes.devnet.iota.org:443";

// initialize the mam object
let state = Mam.init(provider);
console.log(state);
