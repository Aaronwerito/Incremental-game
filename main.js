<!DOCTYPE html>
<html>
<head>
<title>Incremental testing game</title>
<style>
  body {
    background-color: #788282; 
    
    
  }
  .button {
    padding: 20px;
    border-radius: 100px;
    background-color: black;
		color: white
  }
  #currencyText {
    padding-top: 10px;
    text-align: center;
  	text-shadow: 1px 1px;
    font-size: 25px;
  }
 
  
  
  
</style>
  
  
  
</head>
<body id="htmlbody">
<p id="currencyText"> currency </p>
<p id="cashRateText" > currency </p>

  
  
<button onclick="buyUpgrade('IncreaseBase')" id="button1" class="button">click button</button>
<button onclick="buyUpgrade('MultiplyBase')" id="button2" class="button">click button</button>
  

  

  
  
<script>
  var cash = 0;
  var cashPerSec = 1;
  var lastUpdate = Date.now()
  
  var upgrades = {
    IncreaseBase: {
      Name: "IncreaseBase",
      BaseCost: 10,
      OwnedAmount: 0,
      Effect: 1,
      CostScaling: { Type: "multi", amount: 1.5}
    },
    
    MultiplyBase: {
      Name: "MultiplyBase",
      BaseCost: 10,
      OwnedAmount: 0,
      Effect: 2,
      CostScaling: { Type: "multi", amount: 5}
    }
  }
  
  
  
  
  
  function update(){

    let now = Date.now();
    let diff = (now - lastUpdate)/1000 //diff = seconds
    lastUpdate = now;
    cash += cashPerSec * diff;
    updateText();
    
    
    
    
    
    requestAnimationFrame(update);
  }
  
  
  function updateText(){
		document.getElementById("currencyText").innerHTML = "Money: " + cash.toFixed(3);
    
    document.getElementById("cashRateText").innerHTML = "Money per Sec: " + cashPerSec.toFixed(2);
    
    document.getElementById("button1").innerHTML = upgrades.IncreaseBase.Name +  "<br> cost: " + calcCost("IncreaseBase").toFixed(2) + "<br> Owned: " + upgrades.IncreaseBase.OwnedAmount;
    
    document.getElementById("button2").innerHTML = upgrades.MultiplyBase.Name +  "<br> cost: " + calcCost("MultiplyBase").toFixed(2) + "<br> Owned: " + upgrades.MultiplyBase.OwnedAmount;
    
  }
  
  function calcCost(upgrade){
    if (upgrades[upgrade].CostScaling.Type === "multi"){
      let baseCost = upgrades[upgrade].BaseCost;
      let costScaling = upgrades[upgrade].CostScaling.amount;
      let ownedUpg = upgrades[upgrade].OwnedAmount;
      let thisCost = baseCost * (costScaling ** ownedUpg);
      return thisCost 
    }
  }
  
  function buyUpgrade(upgrade){
    if (cash >= calcCost(upgrade)){
      cash -= calcCost(upgrade)
      upgrades[upgrade].OwnedAmount += 1
      calcCashPerSec()
    }
  }
  
  function calcCashPerSec() {
		let cashPerSecBase = 1 + upgrades.IncreaseBase.OwnedAmount;
    cashPerSecBase *= (upgrades.MultiplyBase.Effect ** upgrades.MultiplyBase.OwnedAmount)

  	cashPerSec = cashPerSecBase
  }
  
  
  update()
</script>
</body>
</html>


  
