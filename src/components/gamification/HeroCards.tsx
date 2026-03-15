export default function HeroCards({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="border relative bg-white w-full pt-6 pb-5 px-4 flex flex-col items-center justify-center text-center rounded-lg border-border">
      <img
        src="/abstract.png"
        alt="gamification card"
        className="absolute z-1 top-0 left-0 w-full h-full opacity-50"
      />
      <div className="border-10 static z-20 w-fit p-3 flex flex-col items-center justify-center gap-4 rounded-2xl border-accent-foreground ">
        <img src={icon} alt="gamification card" className="size-[25px]" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-text font-medium text-base leading-[140%]">
          {title}
        </p>
        <p className="text-secondary-foreground text-sm leading-[140%]">
          {description}
        </p>
      </div>
    </div>
  );
}
