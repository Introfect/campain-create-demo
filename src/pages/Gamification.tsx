import HeroCards from "@/components/gamification/components/HeroCards"
import { RewardSystemDialog } from "@/components/gamification/components/RewardSystemDialog"
import { gamificationCards } from "@/constants/common"


const Gamification = () => {
  return (
    <div className="flex-1 flex flex-col mt-9.5 h-full">
      <div className="relative z-20">
        <img src="/hero.svg" alt="gamification background" className="w-full" />

        <div className="max-w-[354px] absolute inset-x-0 top-15 text-center  mx-auto w-full">
          <h2 className="text-accent text-balance font-semibold text-[28px] leading-[140%] ">Gamify your Campaign</h2>
          <p className="text-secondary-foreground text-base mt-2 mb-6 leading-[140%]">Enable gamification to start crafting
            your custom reward system.</p>

          <RewardSystemDialog />
        </div>
        <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 absolute top-65 left-0 right-0">
          {gamificationCards.map((card) => (
            <HeroCards key={card.title} {...card} />
          ))}


        </div>

      </div>
    </div>
  )
}

export default Gamification
