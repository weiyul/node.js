// From https://www.interviewcake.com/question/javascript/stock-price
// What I did is test the solution using node.js and chai
// I also extracted some of its explanation in the comments area

/*
Q1: Suppose we could access yesterday's stock prices as an array, where:
. The values are the price in dollars of Apple stock.
. A higher index indicates a later time.

So if the stock cost $500 at 10:30 am and $550 at 11:00 am, then:

stockPricesYesterday[60] =500;

Write an efficient function that takes stockPricesYesterday and return the best 
profit I could have made from 1 purchase and 1 sale of a Apple stock yesterday.

No "shorting" - you must buy before you sell. You may not buy and sell in the same time 
step (at least 1 minute must pass)

*/


/* Solution:
Gotchas

It is not sufficient to simply take the difference between the highest price and the lowest
price, because the highest price may come before the lowest price. You must buy before you sell.
What if the stock value goes down all day? In that case, the best profit will be negative.

You can do this in O(n) time and O(1) space!

*/



module.exports = function(){

	this.getMaxProfit = getMaxProfit;
}

var stockPricesYesterday =[7, 0, 1, 2, 6, 8];
//console.log(stockPricesYesterday);
console.log("the maximum profit is " + getMaxProfit(stockPricesYesterday)+"for stock prices of "+stockPricesYesterday);

var stockPricesYesterday2 =[8,7,6,5,4,3,2,1];
console.log("Should be negative profit, but we have " + getMaxProfit(stockPricesYesterday2)+ " for stock prices of "+stockPricesYesterday2);


/*
Let's see how well we can do by looping through the array only once. 
Since we're trying to loop through the set once, let's use a greedy approach, where we keep a
running maxProfit until well reach the eand. We'll start ourt maxProfit at $0. As we're 
iterating, how do we know if you've found a new maxProfit?

At each iteration, our maxProfit is either:
1. the same as the maxProfit at the last time step, or
2. the max profit we can get by selling the the currentPrice

How do we know when we have case(2)?
The max profit we can get by selling at the currentPrice is simply the difference between the 
currentPrice and the minPrice from earlier in the day. If this difference is greater than the
current maxProfit, we have a new maxProfit.

So for every price, we'll need to:
1. keep track of the lowest price we've seen so far
2. see if we can get a better profit.

How can we handle negative profit?

Two reasonable options could be:
1. return a negative profit. "What's the least badly we could have done?"
2. throw an exception. "We should not have purchased stocks yesterday!"

In this case, it's probably best to go with option(1). The advantags of returning a negative
profit are:

1. We more accurately answer the challenge. If profit is "revenue minus expenses", 
we're returning the best we could have done.
2. It's less opinionated. We'll leave decisions up to our function's users. It would be easy
to wrap our function in a helper function to decide if it's worth making a purchase.
3. We allow ourselves to collect better data. It matters if we would have lost money, 
and it matters how much we would have lost. If we're trying the get rich, we'll probably 
care about those numbers.




*/
function getMaxProfit(stockPricesYesterday){
	// If stockPricesYesterday has fewer than 2 prices
	if(stockPricesYesterday <2){
		throw new Error('Getting a profit requires at least 2 prices');
	}

	var minPrice = stockPricesYesterday[0];
	var maxProfit = stockPricesYesterday[1]-stockPricesYesterday[0];

	// go through every time
	for(var i =0; i < stockPricesYesterday.length; i++){
		var currentPrice = stockPricesYesterday[i];
		// ensure minPrice is the lowest price we've seen so far
		minPrice = Math.min(minPrice, currentPrice);

		// see what our profit would be if we bought at the
		// min price and sold at the current price

		var potentialProfit = currentPrice - minPrice;

		// update maxProfit if we can do better
		maxProfit = Math.max(maxProfit, potentialProfit);
				
	}
	return maxProfit;
}

