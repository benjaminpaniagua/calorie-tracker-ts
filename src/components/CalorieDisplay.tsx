type CalorieDisplayProps = {
  calories: number;
  text: string;
};

export default function CalorieDisplay({
  calories,
  text,
}: CalorieDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full text-center grid grid-cols 1 gap-3">
      <span className="font-black text-7xl text-white">{calories}</span>
      {text}
    </p>
  );
}
