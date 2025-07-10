import { format,parseISO } from "date-fns";
function DisplayDate({date}) {
    let parseDate = parseISO(date);
    let formatDate = format(parseDate,"dd/MM/yyyy")
    return ( <>
        {formatDate}
    </> );
}

export default DisplayDate;