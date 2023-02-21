import { DateTime } from "luxon";

export default function parseDate(dateString) {
    if (dateString[0] === '+') {
        let date = DateTime.now();
    
        const dates = dateString.replace('+', '').split(',');
        
        for (const d of dates) {
            const [, count, type] = d.match(/(\d+)(\w+)/);
    
            date = date.plus({[type]: count})
        }

        return date;
    } else {
        return DateTime.fromISO(dateString);
    }
}
