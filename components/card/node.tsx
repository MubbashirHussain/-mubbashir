import { BorderWrapper } from "../border/trailBorder";

export default function NodeCard() {
  return (
    <div className="flex items-center justify-center">
      <BorderWrapper className="w-[200px] h-[200px] bg-accent">
        <div className="w-[200px] h-[200px] bg-background">hekj</div>
      </BorderWrapper>
    </div>
  );
}
