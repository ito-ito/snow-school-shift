import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

type Props = {
  categories: string[];
  months: number[];
  shifts?: {
    id: string;
    date: Date;
    dateLabel: string;
    month: number;
    details: {
      category: string;
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
const ShiftSchedulePresentation = ({ categories, months, shifts }: Props) => {
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
          <Accordion type="multiple" defaultValue={shifts?.map((shift) => shift.id)}>
            {shifts?.map((shift) => {
              if (shift.month !== month) return;

              return (
                <AccordionItem key={shift.id} value={shift.id}>
                  <AccordionTrigger>{shift.dateLabel}</AccordionTrigger>
                  <AccordionContent>
                    <div className="sm:flex">
                      {categories.map((category) => (
                        <div className="sm:grow m-2" key={category}>
                          <Card>
                            <CardHeader>
                              <CardTitle>{category}</CardTitle>
                            </CardHeader>
                            <CardContent>{/* TODO: 内容を実装する */}</CardContent>
                          </Card>
                        </div>
                      ))}
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
    role: string;
    members: {
      id: string;
      name: string;
      qualification: string;
      disableString: string;
      displayName: string;
    }[];
  }[];
};
type containerProps = {
  shifts?: Shift[];
};
const ShiftScheduleContainer = ({ shifts }: containerProps) => {
  const months = [12, 1, 2, 3];
  const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
  const categories = [
    ...new Set(shifts?.flatMap((shift) => shift.details.flatMap((detail) => detail.category))),
  ];

  const data = shifts?.map((shift) => {
    const date = new Date(shift.date);
    const dateLabel = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${
      weekDay[date.getDay()]
    })`;

    return {
      id: shift.id,
      date: date,
      dateLabel: dateLabel,
      month: date.getMonth() + 1,
      details: shift.details,
    };
  });

  return <ShiftSchedulePresentation categories={categories} months={months} shifts={data} />;
};

export default ShiftScheduleContainer;
