const prestige = {
  points: 0,
  prestigeReq: 1e36,

  calcPoints(){
    let cashE = Math.log10(cash) / 2;
    let pPoints = Math.pow((Math.log(cash) / Math.log(25)), cashE);
    pPoints = Math.floor(pPoints / 1e25);
    document.getElementById("testButton").textContent = "Prestige Points: " + pPoints
  },
  
  prestige(){
    if (cash >= prestige.prestigeReq){
      prestige.points += prestige.calcPoints();
      //prestige.prestigeReq *= 1e10; //placeholder
      cash = 100; 
      for (let upgrade in upgrades){
        upgrades[upgrade].OwnedAmount = 0;
      }
    }
  },
  
  upgrades: {
    MultiplyCash: {
      Name: "MultiplyCash",
      BaseCost: 3,
      OwnedAmount: 0,
      Effect: 1.1,
      CostScaling: { Type: "add", amount: 1.5, multScaling: 0.1 }
    }
  },
  
  calcCost(upgrade){
    if (prestige.upgrades[upgrade].CostScaling.Type === "add") {
      let baseCost = prestige.upgrades[upgrade].BaseCost;
      let multiplier = prestige.upgrades[upgrade].CostScaling.amount;
      let multScaling = prestige.upgrades[upgrade].CostScaling.multScaling;
      let ownedUpg = prestige.upgrades[upgrade].OwnedAmount;
      let thisCost = baseCost * (multiplier + multScaling * ownedUpg) ** ownedUpg;
      return thisCost;
    }
  },
  
}
