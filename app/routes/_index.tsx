import type { MetaFunction } from "@remix-run/cloudflare";
import HeaderContainer from "app/components/header";
import MonthTabContainer from "~/components/monthTab";

export const meta: MetaFunction = () => {
  return [{ title: "Snow School Shift" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <>
      <HeaderContainer />
      <main>
        <div className="container mx-auto px-4 mt-4">
          <MonthTabContainer />
        </div>
      </main>
    </>
  );
}
