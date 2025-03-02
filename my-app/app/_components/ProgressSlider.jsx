import { Progress } from "@/components/ui/progress";

function ProgressSlider({ value = 0 }) {
  return (
    <div>
      <Progress value={value} />
    </div>
  );
}

export default ProgressSlider;
