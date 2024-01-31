
// Zack's notes: -----------------------------------------------------
// Return array of objects 
// ex 
//  [
//      {gate: "Gate 1", status: "Green", waterLevel: "Normal", connectionError: false, lowBattery: false},  
//      {gate: "Gate 2", status: "Red", waterLevel: "High", connectionError: true, lowBattery: false},
//  ]

// How to test : 
// Run server 
// Navigate to --> 
// localhost:4001/api/v1/traffic/gen1
// -------------------------------------------------------------------


async function generateTraffic() {
  // Logic goes here : )

  // TODO: Ultimately some of these values will need to be passed in from the front end, things like the fieldID, gateID, and optionally waterLevel can be updated within the generator, or the generator can provide a value to update the waterLevel with
  // TODO the status(green, yellow, red) will likely be handled by something else that is not the traffic generator but for now it is included here
  let fieldID = 1;
  let gateID = 69;
  let idealWaterLevel = 5; // this variable would be water the farmer sets it to be and will be passed in
  let threshold = 1; // this variable would be the maximum allowed change in water level and will be passed in
  let actualWaterLevel = 5; // this variable would be the actual water level and will be passed in
  let connectionError = false;
  let lowBattery = false;
  let status = "Green";

  const numOfErrors = 2; // Change this variable to however many errors we want to generate
  const chance = 3; // Change this variable to however often we want something to go wrong
  let randomStatus = 0;

  //--------------------------------------------------------------------------------
  //Generate change in water level
  //--------------------------------------------------------------------------------
  const changeWaterLevel = () => {
    const randomAmount = (Math.floor(Math.random() * 10) + 1) * 0.1;
    const directionNumber = Math.floor(Math.random() * 3) - 1; // water level: increase +1, decrease -1, or stay the same 0
    const finalChange = (randomAmount * directionNumber).toFixed(1);
    return finalChange
  }
  actualWaterLevel += parseFloat(changeWaterLevel());



  //--------------------------------------------------------------------------------
  // Generate status changes on gates
  //--------------------------------------------------------------------------------
  const randomAlertChance = Math.floor(Math.random() * chance);
  // Choose an error to throw, 0 = no error, 1 = connection error, 2 = low battery
  if (randomAlertChance === 0) {
    randomStatus = Math.floor(Math.random() * numOfErrors) + 1
  }
  else {
    randomStatus = 0
  }

  connectionError = true ? randomStatus == 1 : false;
  lowBattery = true ? randomStatus == 2 : false;
  // TODO: Add more errors here

  // Determine status of gate
  if (connectionError) {
    status = "Red"
  }
  else if (lowBattery) {
    status = "Yellow"
  }
  else if (actualWaterLevel > idealWaterLevel + threshold || actualWaterLevel < idealWaterLevel - threshold) {
    status = "Yellow"
  }
  else {
    status = "Green"
  }

  // gate = [fieldID, gateID, status, waterLevel, threshold, connectionError, lowBattery]
  return status;
}


async function getTraffic() {
  const traffic = await generateTraffic();
  return traffic
}

export default getTraffic;
