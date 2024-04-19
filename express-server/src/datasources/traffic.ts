import { User } from "../models";

async function generateTraffic(email: string, fieldId: number) {
  const user = await User.findOne({ email: email });
  if (!user) {
    return { message: "User not found", status: "404" };
  }
  const field = user.fields.find((field) => field.fieldId === fieldId);

  if (!field) {
    return { message: "Field not found", status: "404" };
  }

  const numGates = field.Gates.length;

  let idealWaterLevel = 5; // this variable would be water the farmer sets it to be and will be passed in
  let threshold = 2; // this variable would be the maximum allowed change in water level and is set by the farmer and will be passed in

  for (let gateId = 1; gateId <= numGates; gateId++) {
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
      const randomAmount =
        (Math.floor(Math.random() * 15) + 1) * 0.1 * threshold;
      const directionNumber = Math.floor(Math.random() * 3) - 1; // water level: increase +1, decrease -1, or stay the same 0
      const finalChange = (randomAmount * directionNumber).toFixed(1);
      return finalChange;
    };
    actualWaterLevel += parseFloat(changeWaterLevel());

    //--------------------------------------------------------------------------------
    // Generate status changes on gates
    //--------------------------------------------------------------------------------
    const randomAlertChance = Math.floor(Math.random() * chance);
    // Choose an error to throw, 0 = no error, 1 = connection error, 2 = low battery
    if (randomAlertChance === 0) {
      randomStatus = Math.floor(Math.random() * numOfErrors) + 1;
    } else {
      randomStatus = 0;
    }

    connectionError = true ? randomStatus == 1 : false;
    lowBattery = true ? randomStatus == 2 : false;
    // TODO: Add more errors here

    // Determine status of gate
    //TODO: Move to backend
    if (connectionError) {
      status = "Red";
    } else if (lowBattery) {
      status = "Yellow";
    } else if (
      actualWaterLevel > idealWaterLevel + threshold ||
      actualWaterLevel < idealWaterLevel - threshold
    ) {
      status = "Yellow";
    } else {
      status = "Green";
    }

    // Get the gate with the gateId
    const currGate = field.Gates.find((gate) => gate.gateId === gateId);
    if (!currGate) {
      return { message: "Gate not found", status: "404" };
    }

    // Update the gate with the new values
    currGate.actualWaterLevel = actualWaterLevel;
    currGate.connectionError = connectionError;
    currGate.lowBattery = lowBattery;
    currGate.status = status;
    currGate.idealWaterLevel = idealWaterLevel;
    currGate.threshold = threshold;
  }
  await user.save();
  return { message: "Traffic generated", status: "200" };
}

async function getTraffic(userId: string, fieldId: number) {
  const generatorInfo = await generateTraffic(userId, fieldId);
  return generatorInfo;
}

export default getTraffic;
