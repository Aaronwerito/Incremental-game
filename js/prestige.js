const prestige = {
  prestigeReq: 1e36,

  calcPoints(){
    let pPoints = Math.pow((player.cash / 1e36), 0.25);
    pPoints *= player.prestige.upgrades.MultiplypPoints.Effect ** player.prestige.upgrades.MultiplypPoints.OwnedAmount
    pPoints = Math.floor(pPoints)
    return pPoints;
  },

  //https://www.desmos.com/calculator/fqjcypban3
  prestige(){
    if (player.cash >= prestige.prestigeReq){
      player.prestige.points += prestige.calcPoints()
      player.cash = 100;
      player.cashPerSec = 1;
      //prestige.prestigeReq *= 1e10; //placeholder
      for (let upgrade in player.upgrades){
        player.upgrades[upgrade].OwnedAmount = 0;
      }
      player.cash = 100;
    } else {
      alert("You need 1e36 (1Ud) cash to prestige")
    }
  },

  calcCost(upgrade){
    if (player.prestige.upgrades[upgrade].CostScaling.Type === "add") {
      let baseCost = player.prestige.upgrades[upgrade].BaseCost;
      let multiplier = player.prestige.upgrades[upgrade].CostScaling.amount;
      let multScaling = player.prestige.upgrades[upgrade].CostScaling.multScaling;
      let ownedUpg = player.prestige.upgrades[upgrade].OwnedAmount;
      let push = player.prestige.upgrades[upgrade].CostScaling.push
      
      let thisCost = baseCost * (multiplier + multScaling * (ownedUpg + push)) ** (ownedUpg + push);
      return thisCost;
    }
    if (player.prestige.upgrades[upgrade].CostScaling.Type === "multi"){
      let baseCost = player.prestige.upgrades[upgrade].BaseCost;
      let startingE = player.prestige.upgrades[upgrade].CostScaling.amount;
      let multScaling = player.prestige.upgrades[upgrade].CostScaling.multScaling;
      let ownedUpg = player.prestige.upgrades[upgrade].OwnedAmount;
      let push = player.prestige.upgrades[upgrade].CostScaling.push
      
      let thisCost = baseCost * (startingE ** (multScaling ** (ownedUpg + push)))
      return thisCost;
    }
  },
  buyUpgrade(upgrade){
    if (player.prestige.points >= prestige.calcCost(upgrade)){
      player.prestige.points -= prestige.calcCost(upgrade);
      player.prestige.upgrades[upgrade].OwnedAmount += 1;
    }
  }
}
