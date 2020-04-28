const moment = require('moment');
require("moment-timezone");
const prettyMilliseconds = require('pretty-ms');

function minsLeft(deploymentStartedOn){
  const to =  moment().utc().diff(deploymentStartedOn)//.fromNow()
  //return prettyMilliseconds(to)
  return to/(1000*60)
  //const current = moment("April 25th 2020, 11:18:32 pm")//.format("MMMM Do YYYY, h:mm:ss a")
  //differenceInMs = current.diff(to); // diff yields milliseconds
  //duration = moment.duration(differenceInMs); // moment.duration accepts ms
  //differenceInMinutes = duration.asMinutes();
};
const mins = minsLeft("2020-04-27T05:59:47.176Z")

//console.log(mins)



const inventory = [
  {name: 'apples', quantity: 2},
  {name: 'apples', quantity: 0},
  {name: 'cherries', quantity: 5}
];

function isCherries(fruit) {
  return fruit.name === 'apples1';
}

console.log(inventory.find(isCherries));
// { name: 'cherries', quantity: 5 }

