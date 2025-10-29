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
      if (player.cash >= milestones[milestone].Milestone.req){
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
function autoBuy(){
  if (milestones.unlock1.Unlocked === true){
    buyMax();
  }
}
