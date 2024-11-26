import { ulid } from "ulid";
import { UserIcon } from "@heroicons/react/16/solid";
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
  months: number[];
  shifts?: {
    id: string;
    date: Date;
    dateLabel: string;
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
                <AccordionItem key={shift.id} value={shift.id}>
                  <AccordionTrigger>{shift.dateLabel}</AccordionTrigger>
                  <AccordionContent>
                    <div className="sm:flex">
                      {shift.details.map((detail) => {
                        return (
                          <div className="m-2 sm:flex-1" key={ulid()}>
                            <Card>
                              <CardHeader>
                                <CardTitle>{detail.category}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                {detail.roles.map((role) => {
                                  return role.members.map((member) => {
                                    return (
                                      <div
                                        className="mb-2 flex flex-row items-center"
                                        key={ulid()}
                                      >
                                        <UserIcon className="w-5 text-zinc-300" />
                                        <p className="ml-2">{member.name}</p>
                                        <p className="ml-4 text-xs text-zinc-500">
                                          {role.role}
                                        </p>
                                      </div>
                                    );
                                  });
                                })}
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })}
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
type containerProps = {
  shifts?: Shift[];
};
const ShiftScheduleContainer = ({ shifts }: containerProps) => {
  const months = [12, 1, 2, 3];
  const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
  const categories = [
    ...new Set(
      shifts?.flatMap((shift) =>
        shift.details.flatMap((detail) => detail.category),
      ),
    ),
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

  return <ShiftSchedulePresentation months={months} shifts={data} />;
};

export default ShiftScheduleContainer;
