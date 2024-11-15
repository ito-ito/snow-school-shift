import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

type Props = {
  months: number[];
};
const MonthTabPresentation = ({ months }: Props) => {
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
          <h1 className="text-2xl">{`${month}月`}</h1>
        </TabsContent>
      ))}
    </Tabs>
  );
};

const MonthTabContainer = () => {
  const months = [12, 1, 2, 3];
  return <MonthTabPresentation months={months} />;
};

export default MonthTabContainer;
