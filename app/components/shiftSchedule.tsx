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
  displayedDates: string[];
  displayedMonth: number;
  months: number[];
  shifts?: {
    id: string;
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
const ShiftSchedulePresentation = ({
  displayedDates,
  displayedMonth,
  months,
  shifts,
}: Props) => {
  return (
    <Tabs defaultValue={String(displayedMonth)} className="w-full">
      <TabsList className="w-full">
        {months.map((month) => (
          <TabsTrigger value={String(month)} key={month} className="w-1/4">
            {`${month}月`}
          </TabsTrigger>
        ))}
      </TabsList>
      {months.map((month) => (
        <TabsContent key={month} value={String(month)}>
          <Accordion type="multiple" defaultValue={displayedDates}>
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
  if (!shifts) return;

  // 日付をyyyymmdd形式にする
  const formatToYyyymmdd = (date: Date): string => {
    return date
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "");
  };
  const months = [12, 1, 2, 3];
  const dates: Date[] = shifts.map((shift) => new Date(shift.date));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayMonth = today.getMonth() + 1;
  const displayedMonth = months.includes(todayMonth) ? todayMonth : months[0];

  // デフォルトで表示する日付（未来の日付）
  const displayedDates: string[] = dates
    .filter((date) => today <= date)
    .map((date) => formatToYyyymmdd(date));

  // 期間内の祝日を取得
  const maxDate = dates.reduce((a, b) => (a > b ? a : b));
  const minDate = dates.reduce((a, b) => (a < b ? a : b));
  const listHolidays = holidays.between(minDate, maxDate);

  const data = shifts.map((shift) => {
    const date = new Date(shift.date);
    const holiday = listHolidays.find(
      (hday) => hday.date.toDateString() == date.toDateString(),
    );
    // 当日・過去の日付・土曜・日曜・祝日は背景色を設定する
    const bgColorClass =
      date.toDateString() === new Date().toDateString()
        ? "bg-green-100"
        : date < new Date()
          ? "bg-zinc-100"
          : date.getDay() === 0 || !!holiday
            ? "bg-red-50"
            : date.getDay() === 6
              ? "bg-sky-50"
              : "";

    return {
      id: formatToYyyymmdd(date),
      dateLabel: date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
      }),
      bgColorClass: bgColorClass,
      holidayName: !holiday ? "" : holiday.name,
      month: date.getMonth() + 1,
      details: shift.details,
    };
  });

  return (
    <ShiftSchedulePresentation
      displayedDates={displayedDates}
      displayedMonth={displayedMonth}
      months={months}
      shifts={data}
    />
  );
};

export default ShiftScheduleContainer;
