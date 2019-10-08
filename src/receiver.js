const Mam = require("@iota/mam");
const Converter = require("@iota/converter");

const provider = "https://nodes.devnet.iota.org:443";

const root =
  "M99QQELMUXLXRSABDPWAMDCWMGLGBCULTLWUJWVOVAET9AMOLFZOMOQN9BIXVIGKJTERFFKBDUZVMHW9H";

let state = Mam.init(provider);

// function to receive messages
async function receiveMessage(nextRoot) {
  const resp = await Mam.fetch(nextRoot, "public");
  resp.messages.map(message => logger(message));
}

// print out the messages
function logger(data) {
  const json = JSON.parse(Converter.trytesToAscii(data));
  console.log(json);
}

receiveMessage(root);
