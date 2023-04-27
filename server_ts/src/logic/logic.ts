import yf from "yahoo-finance2";
import { sub, format, add } from "date-fns";
import { SMA_Value } from "../types/types";
const dateFormat = "yyyy-MM-dd";

export const findSmaOfDay = async (
    day: string,
    ticker: string,
    n: number,
    onErr: (err: any) => void,
    onSuccess: (result: any) => void
): Promise<SMA_Value> => {
    const startingDate = format(
        new Date(day),
        dateFormat
    );
    const targetDate = format(
        sub(new Date(startingDate),
            { days: n * 3 }),
            dateFormat
    );
    try {
        const result = await yf.historical(
            ticker,
            { 
                period1: targetDate,
                period2: startingDate
            },
        )
        let smaVal = 0;
        let closingPrice = 0
        for (let i = 0; i < n; i++) {
            smaVal += result[i].close;
            if (i === n-1) {
                closingPrice = result[i].close
            }
        }
        smaVal /= n;
        return {
            value: smaVal,
            closingPrice: closingPrice
        }
    } catch(err) {
        console.log(err)
        return {
            value: -1,
            closingPrice: -1
        }
    }
}

export const goThroughDays = async (startingDay: string, numDays: number, onEachDay: (day: string) => Promise<void> ): Promise<void> => {
    const startingDate = format(new Date(startingDay), dateFormat);
    let pastDate = format(
        sub(new Date(startingDate), 
        { days:  numDays }),
        dateFormat
        )
    for (; pastDate !== startingDate; pastDate = format(add(new Date(pastDate), { days: 2 }), dateFormat)) {
            await onEachDay(pastDate)
    }
}