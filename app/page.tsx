import LeftBar from "@/components/shared/LeftBar";
import RightBar from "@/components/shared/RightBar";
import FeedBar from "@/components/shared/FeedBar";

export default function Home() {
  return (
    <main className="flex lg:gap-6 text-white lg:px-40 xl:px-64 px-10">
      <div className="hidden md:block">
        <LeftBar />
      </div>
      <div className="xl:flex">
        <div className="xl:w-[61.5%] w-full border-x-[1px] border-[#2f3336]">
          <FeedBar />
        </div>
        <div className="xl:w-[38%] hidden xl:block pl-6">
          <RightBar />
        </div>
      </div>
    </main>
  );
}
