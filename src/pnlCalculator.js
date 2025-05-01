export class PnlCalculator {
  constructor() {
    this.holdings = {};
  }

  // Add or update holding for a token
  updateHolding(tokenAddress, amount, price) {
    if (!this.holdings[tokenAddress]) {
      this.holdings[tokenAddress] = { amount: 0, costBasis: 0 };
    }
    const holding = this.holdings[tokenAddress];
    // Weighted average cost basis calculation
    const totalCost = holding.costBasis * holding.amount + price * amount;
    holding.amount += amount;
    holding.costBasis = totalCost / holding.amount;
  }

  // Calculate PnL for a token given current price
  calculatePnl(tokenAddress, currentPrice) {
    const holding = this.holdings[tokenAddress];
    if (!holding) return 0;
    const marketValue = holding.amount * currentPrice;
    const costValue = holding.amount * holding.costBasis;
    return marketValue - costValue;
  }

  // Get total PnL across all holdings
  getTotalPnl(currentPrices) {
    let totalPnl = 0;
    for (const tokenAddress in this.holdings) {
      const currentPrice = currentPrices[tokenAddress] || 0;
      totalPnl += this.calculatePnl(tokenAddress, currentPrice);
    }
    return totalPnl;
  }
}
