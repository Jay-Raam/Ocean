import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  children: ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  small?: boolean;
  inactive?: boolean;
  className?: string;
}

/** Underline-on-hover link used across nav, footer and side-nav. */
export function Link({ children, to, href, external, onClick, small, inactive, className }: LinkProps) {
  const cls = ["link", small ? "small" : "", inactive ? "inactive" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <div className={cls}>
        <RouterLink to={to} className="link-click" onClick={onClick}>
          <span>{children}</span>
        </RouterLink>
      </div>
    );
  }

  return (
    <div className={cls}>
      <a
        href={href}
        className="link-click"
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        <span>{children}</span>
      </a>
    </div>
  );
}
