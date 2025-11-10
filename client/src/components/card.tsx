import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  score: number;
  style?: string;
  per?: boolean;
}
const Card = ({ title, score, style, per = false }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-primary p-5 rounded-lg flex flex-col gap-3 shadow w-full",
        style
      )}
    >
      <h1 className="text-md text-gray-500">{title}</h1>
      <h2 className="font-bold text-xl ml-5">
        {score}
        {per && "/100"}
      </h2>
    </div>
  );
};

export default Card;
