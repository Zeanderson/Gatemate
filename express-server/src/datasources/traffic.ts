

// async function RandomNumberGenerator() {
//   const tick = 1000; // change tick speed
//   //--------------------------------------------------------------------------------
//   // Generate change in water level
//   //--------------------------------------------------------------------------------
//   // const [randomAmount, setRandomNumber1] = useState<number | null>(null);
//   // const [directionNumber, setRandomNumber2] = useState<number | null>(null);
//   // const finalChange = (randomAmount !== null && directionNumber !== null) ? (randomAmount * directionNumber).toFixed(1) : 'Calculating...';
  
//   // Function to generate a random number between 1 and 10
//   // const generateRandomNumber = () => {
//   //   const newRandomAmount = (Math.floor(Math.random() * 10) + 1) * 0.1;
//   //   const newDirectionNumber = Math.floor(Math.random() * 3) - 1; // water level: increase +1, decrease -1, or stay the same 0
//   //   setRandomNumber1(newRandomAmount);
//   //   setRandomNumber2(newDirectionNumber);
//   // };



  



//   //--------------------------------------------------------------------------------
//   // Generate status changes on gates
//   //--------------------------------------------------------------------------------

//   // NOTE: Some of this will need to be moved to another file seeing as the traffic generator file will not exist in a real life deployment
//   // NOTE: This is just a simulation for 1 gate at the moment, will need to be scaled for all gates
//   const status = ['Green', 'Yellow', 'Red'];
//   let randomStatus: number;
//   let connectionError: boolean; // threat level red
//   let lowBattery: boolean; // threat level yellow
//   const waterLevel = ['Normal', 'High', 'Low']; // threat level yellow

//   const chance = 3; // Change this variable to however often we want something to go wrong

  

//   const generateRandomAlert = () => {
//     // Chance for something to go wrong
//     const randomAlertChance = Math.floor(Math.random() * chance);

//     randomStatus = randomAlertChance === 0 ? Math.floor(Math.random() * 2) + 1 : 0; // Choose an error to throw, 0 = no error, 1 = connection error, 2 = low battery

//     // Set of errors
//     connectionError = true ? randomStatus == 1 : false;
//     lowBattery = true ? randomStatus == 2 : false;
//     // TODO: Add more errors here
//   }



//   const callAllFunctions = () => {
//     // generateRandomNumber();
//     generateRandomAlert();
//   }


  // front end
  // Use useEffect to automatically generate a new number every tick
  // useEffect(() => {
  //   const interval = setInterval(callAllFunctions, tick);
  //   // 1000 milliseconds = 1 second
  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, []);






  // return (
  //   <div className="p-4">
  //     <h1 className="text-2xl font-bold mb-4">Traffic Generator</h1>
  //     <p className="text-lg mb-2">Change in water level: {finalChange}</p>
  //   </div>
  // );
// }







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

async function generateTraffic() {
  // Logic goes here : )
  return "Hello World"
}


async function getTraffic() {
  const traffic = await generateTraffic();
  return traffic
}

export default getTraffic;
