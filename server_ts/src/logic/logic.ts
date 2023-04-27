import yf from "yahoo-finance2";
import { sub, format, add } from "date-fns";
const dateFormat = "yyyy-MM-dd";

export const findSmaOfDay = async (
    day: string,
    ticker: string,
    n: number,
    onErr: (err: any) => void,
    onSuccess: (result: any) => void
): Promise<void> => {
const startingDate = format(new Date(day), dateFormat);
const targetDate = format(
  sub(new Date(startingDate), { days: n * 5 }),
  dateFormat
);
try {
    console.log("STARTING DATE:", targetDate)
    console.log("ENDING DATE:", startingDate)
    const result = await yf.historical(
        ticker,
        { 
            period1: targetDate,
            period2: startingDate
        },
      )
    console.log(result)
} catch(err) {
    console.log(err)
}

}