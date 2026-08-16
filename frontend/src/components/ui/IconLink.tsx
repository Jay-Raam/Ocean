import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Dots } from "./icons";

interface IconLinkProps {
  children: ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  builtIn?: boolean;
}

/** Primary-coloured link with a tri-dot suffix. */
export function IconLink({ children, to, href, external, onClick, builtIn }: IconLinkProps) {
  const cls = ["icon-link", builtIn ? "built-in" : ""].filter(Boolean).join(" ");

  const content = (
    <div className="icon-link-content">
      <span>{children}</span>
      <Dots />
    </div>
  );

  if (to) {
    return (
      <div className={cls}>
        <RouterLink to={to} className="icon-link-click" onClick={onClick}>
          {content}
        </RouterLink>
      </div>
    );
  }

  return (
    <div className={cls}>
      <a
        href={href}
        className="icon-link-click"
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </a>
    </div>
  );
}
