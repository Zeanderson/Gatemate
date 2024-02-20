
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
// http://localhost:4001/api/v1/traffic/gen1?userId=1&fieldId=60
// -------------------------------------------------------------------

type Gate = {
  gateId: number,
  idealWaterLevel: number,
  threshold: number,
  actualWaterLevel: number,
  connectionError: boolean,
  lowBattery: boolean,
  status: string
}

type TrafficReturn = {
  userId: string,
  fieldId: string,
  gates: Gate[],
}

async function generateTraffic(userId: string, fieldId: string) {
  // TODO: Ultimately some of these values will need to be passed in, things like waterLevel can be updated within the generator, or the generator can provide a value to update the waterLevel with
  // TODO the status(green, yellow, red) will likely be handled by something else that is not the traffic generator but for now it is included here
  let idealWaterLevel = 5; // this variable would be water the farmer sets it to be and will be passed in
  let threshold = 2; // this variable would be the maximum allowed change in water level and is set by the farmer and will be passed in

  const gates = [];

  for (let gateId = 0; gateId < 3; gateId++) {
    
    // TODO: Call up to the database to get the users preferred water level and threshold from the usersId from mongoDB
    let actualWaterLevel = idealWaterLevel; // this variable will start out as the ideal water level and will be randomly updated by the generator
    let connectionError = false;
    let lowBattery = false;
    let status = "Green";

    const numOfErrors = 2; // Change this variable to however many errors we want to generate e.g right now it is 2 because we have connection error and low battery, if we added another error possibility we would change this to 3
    const chance = 3; // Change this variable to however often we want something to go wrong
    let randomStatus = 0;

    //--------------------------------------------------------------------------------
    //Generate change in water level
    //--------------------------------------------------------------------------------
    const changeWaterLevel = () => {
      const randomAmount = (Math.floor(Math.random() * 15) + 1) * 0.1 * threshold;
      const directionNumber = Math.floor(Math.random() * 3) - 1; // water level: increase +1, decrease -1, or stay the same 0
      const finalChange = (randomAmount * directionNumber).toFixed(1);
      return finalChange
    };
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

    const gateData = {
      gateId: gateId,
      idealWaterLevel: idealWaterLevel,
      threshold: threshold,
      actualWaterLevel: actualWaterLevel,
      connectionError: connectionError,
      lowBattery: lowBattery,
      status: status
    };
    gates.push(gateData);
  }


  const traffic = {
    userId: userId,
    fieldId: fieldId,
    gates: gates,
  };

  return traffic;
}


async function getTraffic(userId: string, fieldId: string) {
  const traffic: TrafficReturn = await generateTraffic(userId, fieldId);
  return traffic
}

export default getTraffic;
