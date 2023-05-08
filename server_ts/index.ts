import { findSmaOfDay, goThroughDays } from './src/logic/logic'
/*
    0) write a function to go through each day for the last 3 years
    3) Process for 3 years how it would do based on SMA buy/sell (golden cross)
    4) log each time it buys
    5) log each time it sells and the difference over starting amount
*/
async function main() {
    let startingMoney = 10000
    let bought = false
    let stock = 'TSLA'
    let netGain = 0
    const today = new Date().toISOString() 
    // await findSmaOfDay(new Date().toISOString(), 'SPY', 20, (err: any) => {}, (r: any) => {})
    // await findSmaOfDay(new Date().toISOString(), 'SPY', 50, (err: any) => {}, (r: any) => {})
    await goThroughDays(today, 300, async currDay => {
        const sma20Value = await findSmaOfDay(currDay, stock, 20, (err: any) => {}, (r: any) => {})
        const sma50Value = await findSmaOfDay(currDay, stock, 50, (err: any) => {}, (r: any) => {})
        if (!bought) { // check if sma20 > sma50
            // console.log("Date:", currDay, "CHECKING TO BUY", sma20Value.value, sma50Value.value)
            if (sma20Value.value > sma50Value.value) {
                bought = true
                console.log("BOUGHT AT:", sma20Value.closingPrice)
                netGain -= sma20Value.closingPrice

            }
        } else { // check if sma20 < sma50
            if (sma20Value.value < sma20Value.closingPrice) {
                bought = false
                console.log("SOLD AT:", sma20Value.closingPrice)
                netGain += sma20Value.closingPrice
            }
        }


        console.log("Date:", currDay,"SMA-20 value", sma20Value.value, "SMA-50 value", sma50Value.value, "CLOSING PRICE", sma20Value.closingPrice, "NET GAIN", netGain)
    })
}

main()


