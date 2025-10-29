var player = {
  cash: 1,
  cashPerSec: 1,

  upgrades: {
    IncreaseBase: {
      Name: "IncreaseBase",
      BaseCost: 10,
      OwnedAmount: 0,
      Effect: 1,
      CostScaling: { Type: "add", amount: 1.5, multScaling: 0.1, push: 0 },
    },
    MultiplyBase: {
      Name: "MultiplyBase",
      BaseCost: 100,
      OwnedAmount: 0,
      Effect: 2,
      CostScaling: { Type: "add", amount: 2, multScaling: 2, push: 0 },
    },
    MultiplyBase2: {
      Name: "MultiplyBase2",
      BaseCost: 500,
      OwnedAmount: 0,
      Effect: 5,
      CostScaling: { Type: "add", amount: 5, multScaling: 5, push: 0},
    },
    MultiplyByLog: {
      Name: "MultiplyByLog",
      BaseCost: 5000,
      OwnedAmount: 0,
      Effect() {
        return Math.log10(player.cash + 1);
      },
      CostScaling: { Type: "multi", amount: 2, multScaling: 1.75, push: 0},
    },
  },

  prestige: {
    points: 0,
    upgrades: {
      MultiplyCash: {
        Name: "MultiplyCash",
        BaseCost: 1,
        OwnedAmount: 0,
        Effect: 2,
        CostScaling: { Type: "add", amount: 1.4, multScaling: 0.1, push: 0 }
      },
      MultiplypPoints: {
        Name: "MultiplypPoints",
        BaseCost: 2,
        OwnedAmount: 0,
        Effect: 2,
        CostScaling: { Type: "add", amount: 5, multScaling: 5, push: 0}
      },
      IncreaseMBEffect: {
        Name: "IncreaseMBEffect",
        BaseCost: (1/250),
        OwnedAmount: 0,
        Effect: 0.5,
        CostScaling: { Type: "multi", amount: 10, multScaling: 1.38, push: 4 }
      },
    },
  },
};
