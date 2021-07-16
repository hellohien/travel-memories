import { format, parse } from 'date-fns';

export default function DateFNS(props) {
  let date = props;
  date = date.slice(0, 10);
  const parsedDate = parse(date, 'yyyy-mm-dd', new Date());
  const formattedDate = format(parsedDate, 'mm-dd-yyyy');
  return formattedDate;
}
