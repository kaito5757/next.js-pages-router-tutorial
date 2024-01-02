import { parseISO, format } from 'date-fns';

interface DateProps {
  date: string | Date;
}

export default function Date(props: DateProps) {
  const date = typeof props.date == "string" ? parseISO(props.date) : props.date;
  return (
    <time dateTime={date.toDateString()}>
      { format(date, "LLLL d, yyyy") }
    </time>
  )
}