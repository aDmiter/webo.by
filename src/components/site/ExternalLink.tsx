import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & {
  href: string;
};

export function ExternalLink({ href, children, className, ...rest }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
