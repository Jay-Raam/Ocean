import { Ornament as OrnamentIcon } from "./icons";

interface OrnamentProps {
  /** white | transparent | transparent-dark */
  variant?: "default" | "white" | "transparent" | "transparent-dark";
}

export function Ornament({ variant = "default" }: OrnamentProps) {
  const cls = [
    "ornament",
    variant === "white" ? "white" : "",
    variant === "transparent" ? "transparent" : "",
    variant === "transparent-dark" ? "transparent dark" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <OrnamentIcon />
    </div>
  );
}
