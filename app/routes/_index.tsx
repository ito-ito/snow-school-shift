import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import HeaderContainer from "~/components/header";
import ShiftScheduleContainer from "~/components/shiftSchedule";

export const meta: MetaFunction = () => {
  return [{ title: "Snow School Shift" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <HeaderContainer />
      <main>
        <div className="container mx-auto px-4 mt-4">
          <ShiftScheduleContainer shifts={data?.shifts} />
        </div>
      </main>
    </>
  );
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const env = context.cloudflare.env;
  if (!env.API_ENDPOINT_URL) return;

  const response = await fetch(`${env.API_ENDPOINT_URL}?page=shift`);
  const data = await response.json();
  return json({ shifts: data });
};
