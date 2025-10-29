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
var lastUpdate = Date.now();
var lastTimestamp50 = 0;
var lastTimestamp500 = 0;



//TODO fix cuurency text to be a function
function update(timestamp) {
  let now = Date.now();
  let diff = (now - lastUpdate) / 1000; //diff = seconds
  lastUpdate = now;
  player.cash += player.cashPerSec * diff * 1;
  if (timestamp - lastTimestamp50 > 50){
    updateText();
    player.cashPerSec = calcCashPerSec();
    lastTimestamp50 = timestamp;
  }
  if (timestamp - lastTimestamp500 > 500){
    //autoBuy();
    checkMilestones();
    lastTimestamp500 = timestamp;
    prestige.calcPoints();
  }

  requestAnimationFrame(update);
}

function updateText() {
  document.getElementById("currencyText").textContent = "Money: " + formatNumber(player.cash)

  document.getElementById("cashRateText").textContent = "Money per Sec: " + formatNumber(calcCashPerSec());
  
  document.getElementById("button1").textContent = player.upgrades.IncreaseBase.Name + "\ncost: " + formatNumber(calcCost("IncreaseBase")) + "\nOwned: " + player.upgrades.IncreaseBase.OwnedAmount;
  
  document.getElementById("button2").textContent = player.upgrades.MultiplyBase.Name + "\n cost: " + formatNumber(calcCost("MultiplyBase")) +  "\n Owned: " + player.upgrades.MultiplyBase.OwnedAmount;
  
  document.getElementById("button3").textContent = player.upgrades.MultiplyBase2.Name + "\n cost: " + formatNumber(calcCost("MultiplyBase2")) +  "\n Owned: " + player.upgrades.MultiplyBase2.OwnedAmount;

  document.getElementById("button4").textContent = player.upgrades.MultiplyByLog.Name + "\n cost: " + formatNumber(calcCost("MultiplyByLog")) +  "\n Owned: " + player.upgrades.MultiplyByLog.OwnedAmount + "\n Effect: " + formatNumber(player.upgrades.MultiplyByLog.Effect())

document.getElementById("prestigeButton").textContent = "Prestige for: " + formatNumber(prestige.calcPoints())

  document.getElementById("pPointsText").textContent = formatNumber(player.prestige.points)

  document.getElementById("pButton1").textContent = player.prestige.upgrades.MultiplyCash.Name + "\n cost: " + formatNumber(prestige.calcCost("MultiplyCash")) +  "\n Owned: " + player.prestige.upgrades.MultiplyCash.OwnedAmount;
  
  document.getElementById("pButton2").textContent = player.prestige.upgrades.MultiplypPoints.Name + "\n cost: " + formatNumber(prestige.calcCost("MultiplypPoints")) +  "\n Owned: " + player.prestige.upgrades.MultiplypPoints.OwnedAmount;

  document.getElementById("pButton3").textContent = player.prestige.upgrades.IncreaseMBEffect.Name + "\n cost: " + formatNumber(prestige.calcCost("IncreaseMBEffect")) +  "\n Owned: " + player.prestige.upgrades.IncreaseMBEffect.OwnedAmount
}

// current formula baseCost(CostScaling.Amount + owned(multScaling))^owned
//https://www.desmos.com/calculator/9ofpmfj9wo

function calcCost(upgrade) {
  if (player.upgrades[upgrade].CostScaling.Type === "add") {
    let baseCost = player.upgrades[upgrade].BaseCost;
    let multiplier = player.upgrades[upgrade].CostScaling.amount;
    let multScaling = player.upgrades[upgrade].CostScaling.multScaling;
    let ownedUpg = player.upgrades[upgrade].OwnedAmount;
    let thisCost = baseCost * (multiplier + multScaling * ownedUpg) ** ownedUpg;
    return thisCost;
  }
  if (player.upgrades[upgrade].CostScaling.Type === "multi"){
    let baseCost = player.upgrades[upgrade].BaseCost;
    let startingE = player.upgrades[upgrade].CostScaling.amount;
    let multScaling = player.upgrades[upgrade].CostScaling.multScaling;
    let ownedUpg = player.upgrades[upgrade].OwnedAmount;
    let thisCost = baseCost * (startingE ** (multScaling ** ownedUpg))
    return thisCost;
  }
}

function buyUpgrade(upgrade) {
  if (player.cash >= calcCost(upgrade)) {
    player.cash -= calcCost(upgrade);
    player.upgrades[upgrade].OwnedAmount += 1;
    calcCashPerSec();
  }
}
function calcCashPerSec() {
  updateEffects();
  let cashPerSecBase = 1 + player.upgrades.IncreaseBase.OwnedAmount;
  cashPerSecBase *= player.upgrades.MultiplyBase.Effect ** player.upgrades.MultiplyBase.OwnedAmount;
  cashPerSecBase *= player.upgrades.MultiplyBase2.Effect ** player.upgrades.MultiplyBase2.OwnedAmount
  cashPerSecBase *= (player.upgrades.MultiplyByLog.Effect())** player.upgrades.MultiplyByLog.OwnedAmount
  cashPerSecBase *= player.prestige.upgrades.MultiplyCash.Effect ** player.prestige.upgrades.MultiplyCash.OwnedAmount
  return cashPerSecBase;
}
function buyMax(){
  for (let upgrade in player.upgrades){
    while (player.cash >= calcCost(upgrade)){
      buyUpgrade(upgrade)
    }
  }
}
function updateEffects(){
  player.upgrades.MultiplyBase.Effect = 2 + player.prestige.upgrades.IncreaseMBEffect.Effect * player.prestige.upgrades.IncreaseMBEffect.OwnedAmount
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
  alert(number + " is not a number")
}
