import { Progress } from "@/components/ui/progress";

function ProgressSlider({ value = 0, color = "blue-500" }) {
  return (
    <div>
      <Progress value={value} color={color} />
    </div>
  );
}

export default ProgressSlider;
