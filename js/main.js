//
//
//Player.js file things below
//
//







//
//
//Main.js file things below
//
//
var cash = 0;
var cashPerSec = 1;
var lastUpdate = Date.now();
var lastTimestamp = 0;
var lastTimestamp2 = 0;


var upgrades = {
  IncreaseBase: {
    Name: "IncreaseBase",
    BaseCost: 10,
    OwnedAmount: 0,
    Effect: 1,
    CostScaling: { Type: "add", amount: 1.5, multScaling: 0.1 },
  },
  MultiplyBase: {
    Name: "MultiplyBase",
    BaseCost: 100,
    OwnedAmount: 0,
    Effect: 2,
    CostScaling: { Type: "add", amount: 2, multScaling: 2 },
  },
  MultiplyBase2: {
    Name: "MultiplyBase2",
    BaseCost: 500,
    OwnedAmount: 0,
    Effect: 5,
    CostScaling: { Type: "add", amount: 5, multScaling: 5 },
  },
  MultiplyByLog: {
    Name: "MultiplyByLog",
    BaseCost: 5000,
    OwnedAmount: 0,
    Effect: (Math.log10(cash + 1)),
    CostScaling: { Type: "add", amount: 10, multScaling: 15 }
  }
  
  
};

function update(timestamp) {
  let now = Date.now();
  let diff = (now - lastUpdate) / 1000; //diff = seconds
  lastUpdate = now;
  cash += cashPerSec * diff * 1;
  
  if (timestamp - lastTimestamp > 50){
    updateText();
    lastTimestamp = timestamp;
  }
  if (timestamp - lastTimestamp2 > 1000){
    checkMilestones();
    //autoBuy();
    lastTimestamp2 = timestamp;
  }

  requestAnimationFrame(update);
}

function updateText() {
  document.getElementById("currencyText").textContent = "Money: " + formatNumber(cash)
  
  document.getElementById("cashRateText").textContent = "Money per Sec: " + formatNumber(cashPerSec);
  
  document.getElementById("button1").textContent = upgrades.IncreaseBase.Name + "\ncost: " + formatNumber(calcCost("IncreaseBase")) + "\nOwned: " + upgrades.IncreaseBase.OwnedAmount;
  
  document.getElementById("button2").textContent = upgrades.MultiplyBase.Name + "\n cost: " + formatNumber(calcCost("MultiplyBase")) +  "\n Owned: " + upgrades.MultiplyBase.OwnedAmount;
  
  document.getElementById("button3").textContent = upgrades.MultiplyBase2.Name + "\n cost: " + formatNumber(calcCost("MultiplyBase2")) +  "\n Owned: " + upgrades.MultiplyBase2.OwnedAmount;

  document.getElementById("button4").textContent = upgrades.MultiplyByLog.Name + "\n cost: " + formatNumber(calcCost("MultiplyByLog")) +  "\n Owned: " + upgrades.MultiplyByLog.OwnedAmount;
}

// current formula baseCost(CostScaling.Amount + owned(multScaling))^owned
//https://www.desmos.com/calculator/9ofpmfj9wo

function calcCost(upgrade) {
  if (upgrades[upgrade].CostScaling.Type === "add") {
    let baseCost = upgrades[upgrade].BaseCost;
    let multiplier = upgrades[upgrade].CostScaling.amount;
    let multScaling = upgrades[upgrade].CostScaling.multScaling;
    let ownedUpg = upgrades[upgrade].OwnedAmount;
    let thisCost = baseCost * (multiplier + multScaling * ownedUpg) ** ownedUpg;
    return thisCost;
  }
}

function buyUpgrade(upgrade) {
  if (cash >= calcCost(upgrade)) {
    cash -= calcCost(upgrade);
    upgrades[upgrade].OwnedAmount += 1;
    calcCashPerSec();
  }
}
function calcCashPerSec() {
  let cashPerSecBase = 1 + upgrades.IncreaseBase.OwnedAmount;
  cashPerSecBase *= upgrades.MultiplyBase.Effect ** upgrades.MultiplyBase.OwnedAmount;
  cashPerSecBase *= upgrades.MultiplyBase2.Effect ** upgrades.MultiplyBase2.OwnedAmount
  cashPerSecBase *= upgrades.MultiplyByLog.Effect ** upgrades.MultiplyByLog.OwnedAmount
  cashPerSec = cashPerSecBase
}
function buyMax(){
  for (let upgrade in upgrades){
    while (cash >= calcCost(upgrade)){
      buyUpgrade(upgrade)
    }
  }
}
function autoBuy(){
  if (milestones.unlock1.Unlocked === true){
    buyMax();
  }
}
update();


//
//
//Format.js file things below
//
//
const SUFFIXES = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td"]
function formatNumber(number){
  if (number < 1000){
      return number.toFixed(2);
  }
  if (number < 1e45){
    let suffixIndex = Math.floor(Math.log10(number) / 3);
    let suffix = SUFFIXES[suffixIndex];
    let scaledNumber = number / Math.pow(10, suffixIndex * 3);
    return scaledNumber.toFixed(3) + suffix;
  }
  if (number >= 1e45){
    return number.toExponential(3)
  }
}



//
//
//Unlockables.js file things below
//These unlock after a certain milestone is reached
//

const milestones ={
  unlock1: {
    Name: "Buy Max",
    Milestone: {type: "money", req: 1e20},
    Unlocked: false,
    id: "buyMaxButton",
  }
}

function checkMilestones(){
  for (let milestone in milestones){
    if (milestones[milestone].Milestone.type === "money"){
      if (cash >= milestones[milestone].Milestone.req){
        milestones[milestone].Unlocked = true;
        establishMilestones();
      }
    }

    
  }
}

function establishMilestones(){
  for (let milestone in milestones){
    if (milestones[milestone].Unlocked === true){
      document.getElementById("buyMaxButton").style.visibility = "visible";
    }
  }
}
