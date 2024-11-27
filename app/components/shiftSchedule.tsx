import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import holidays from "@holiday-jp/holiday_jp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ShiftCategoryCardContainer from "./shiftCategoryCard";

type Props = {
  months: number[];
  shifts?: {
    id: string;
    date: Date;
    dateLabel: string;
    bgColorClass: string;
    holidayName: string;
    month: number;
    details: {
      category: string;
      roles: {
        role: string;
        members: {
          id: string;
          name: string;
          qualification: string;
          disableString: string;
          displayName: string;
        }[];
      }[];
    }[];
  }[];
};
const ShiftSchedulePresentation = ({ months, shifts }: Props) => {
  return (
    <Tabs defaultValue={String(months[0])} className="w-full">
      <TabsList className="w-full">
        {months.map((month) => (
          <TabsTrigger value={String(month)} key={month} className="w-1/4">
            {`${month}月`}
          </TabsTrigger>
        ))}
      </TabsList>
      {months.map((month) => (
        <TabsContent key={month} value={String(month)}>
          <Accordion
            type="multiple"
            defaultValue={shifts?.map((shift) => shift.id)}
          >
            {shifts?.map((shift) => {
              if (shift.month !== month) return;

              return (
                <AccordionItem
                  key={shift.id}
                  value={shift.id}
                  className={shift.bgColorClass}
                >
                  <AccordionTrigger>
                    <span>
                      {shift.dateLabel}
                      <span className="ml-4 text-xs text-zinc-500">
                        {shift.holidayName}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="sm:flex">
                      {!shift.details.length ? (
                        <div className="mt-2 flex">
                          <ExclamationCircleIcon className="w-4 text-zinc-300" />
                          <p className="ml-4 text-zinc-500">
                            シフトの登録がありません
                          </p>
                        </div>
                      ) : (
                        <ShiftCategoryCardContainer
                          shiftDetails={shift.details}
                        />
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
};

type Shift = {
  id: string;
  date: string;
  details: {
    category: string;
    roles: {
      role: string;
      members: {
        id: string;
        name: string;
        qualification: string;
        disableString: string;
        displayName: string;
      }[];
    }[];
  }[];
};
type ContainerProps = {
  shifts?: Shift[];
};
const ShiftScheduleContainer = ({ shifts }: ContainerProps) => {
  const months = [12, 1, 2, 3];
  const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
  const dates = shifts?.map((shift) => new Date(shift.date));
  const maxDate = dates?.reduce((a, b) => (a > b ? a : b));
  const minDate = dates?.reduce((a, b) => (a < b ? a : b));
  const listHolidays = holidays.between(minDate, maxDate);

  const data = shifts?.map((shift) => {
    const date = new Date(shift.date);
    const dateLabel = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${
      weekDay[date.getDay()]
    })`;
    const holiday = listHolidays.find(
      (hday) => hday.date.toDateString() == date.toDateString(),
    );
    const bgColorClass =
      date.getDay() === 0 || !!holiday
        ? "bg-red-50"
        : date.getDay() === 6
          ? "bg-sky-50"
          : "bg-inherit";

    return {
      id: shift.id,
      date: date,
      dateLabel: dateLabel,
      bgColorClass: bgColorClass,
      holidayName: !holiday ? "" : holiday.name,
      month: date.getMonth() + 1,
      details: shift.details,
    };
  });

  return <ShiftSchedulePresentation months={months} shifts={data} />;
};

export default ShiftScheduleContainer;
