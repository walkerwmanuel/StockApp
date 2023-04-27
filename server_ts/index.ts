import { findSmaOfDay } from './src/logic/logic'
/*
0) write a function to go through each day for the last 3 years
1) write functions to calculate SMA of given data set
2) Set a starting finance amount
3) Process for 3 years how it would do based on SMA buy/sell (golden cross)
4) log each time it buys 
5) log each time it sells and the difference over starting amount
*/
function main() {
    findSmaOfDay(new Date().toISOString(), 'AAPL', 3, (err: any) => {}, (r: any) => {})
}

main()


