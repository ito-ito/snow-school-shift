const HeaderPresentation = () => {
  return (
    <div className="w-full bg-zinc-100 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
          スクール勤務予定表
        </h1>
        <p className="mt-3 inline-block bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-xl font-semibold text-transparent sm:text-4xl">
          スノーボード
        </p>
        <p className="mt-4 text-pretty text-sm font-medium text-zinc-600 sm:text-xl">
          シフトスケジュール予定です
        </p>
      </div>
    </div>
  );
};

const HeaderContainer = () => {
  return <HeaderPresentation />;
};

export default HeaderContainer;
