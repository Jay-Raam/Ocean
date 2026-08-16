import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonIcon } from "./icons";
import { Link as RouterLink } from "react-router-dom";

type Variant = "primary" | "secondary" | "outline" | "blur";
type Size = "default" | "small" | "tiny";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { as?: "button" };
type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as?: "a";
    href: string;
    external?: boolean;
  };
type ButtonAsLink = BaseProps & { as?: "link"; to: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

const classes = (variant: Variant, size: Size, extra?: string) =>
  [
    "btn",
    variant === "secondary" ? "secondary" : "",
    variant === "outline" ? "outline" : "",
    variant === "blur" ? "blur" : "",
    size === "small" ? "small" : "",
    size === "tiny" ? "tiny" : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");

/**
 * A pill button with a repeating floral icon, whose label slides up on
 * hover (text-shadow trick) while the icons rotate.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "default", icon = true, children, className } = props;

  // Two floral icons precede the label; the flexbox layout
  // (space-between + label width:100%) produces the flanking-icon composition.
  const content = (
    <div className="btn-content">
      {icon && (
        <>
          <ButtonIcon />
          <ButtonIcon />
        </>
      )}
      <span>{children}</span>
    </div>
  );

  if (props.as === "link") {
    return (
      <div className={classes(variant, size, className)}>
        <RouterLink to={props.to} className="btn-click" onClick={props.onClick}>
          {content}
        </RouterLink>
      </div>
    );
  }

  if (props.as === "a" || ("href" in props && props.href)) {
    const { href, external, onClick } = props as ButtonAsAnchor;
    return (
      <div className={classes(variant, size, className)}>
        <a
          href={href}
          className="btn-click"
          onClick={onClick}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {content}
        </a>
      </div>
    );
  }

  const { onClick, variant: _v, size: _s, icon: _i, children: _c, className: _cl, ...rest } =
    props as ButtonAsButton;
  return (
    <div className={classes(variant, size, className)}>
      <button className="btn-click" onClick={onClick} {...rest}>
        {content}
      </button>
    </div>
  );
}
