import React from "react";

const Button = ({
  label,
  link,
  style,
  rel,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel={`noopener noreferrer ${rel ? (rel === "follow" ? "" : rel) : "nofollow"
        }`}
      class={`btn mb-4 me-4 hover:text-white dark:hover:text-black hover:no-underline ${style === "outline" ? "btn-outline-primary" : "btn-primary"
        }`}
    >
      {label}
    </a>
  );
};

export default Button;
