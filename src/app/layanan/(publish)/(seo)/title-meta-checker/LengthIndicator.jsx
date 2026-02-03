export default function LengthIndicator({ value = 0, min = 30, max = 60 }) {
  const percent = Math.min((value / max) * 100, 100);

  let color = "bg-lime-400"; // ideal

  if (value < min) {
    color = "bg-red-500"; // terlalu pendek
  } else if (value > max) {
    color = "bg-red-500"; // terlalu panjang
  } else if (value >= max - 5) {
    color = "bg-yellow-400"; // mendekati batas
  }

  return (
    <div className="w-full h-3 rounded bg-white overflow-hidden border">
      <div
        className={`h-full transition-all duration-300 ${color}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
