import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "Snow School Shift" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <>
      <div className="w-full py-8 sm:py-12 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
            スクール勤務予定表
          </h1>
          <p className="mt-3 text-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text sm:text-4xl">
            スノーボード
          </p>
          <p className="mt-4 text-pretty text-sm font-medium text-slate-600 dark:text-slate-400 sm:text-xl">
            シフトスケジュール予定です
          </p>
        </div>
      </div>
      <main>
        <div className="container mx-auto px-4"></div>
      </main>
    </>
  );
}
