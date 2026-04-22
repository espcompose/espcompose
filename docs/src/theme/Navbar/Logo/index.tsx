import React from "react";
import Logo from "@theme-original/Navbar/Logo";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function LogoWrapper(props: React.ComponentProps<typeof Logo>) {
  const { siteConfig } = useDocusaurusContext();
  const version = siteConfig.customFields?.coreVersion as string | undefined;

  return (
    <div className="navbar__brand-wrapper">
      <Logo {...props} />
      {version && (
        <a
          href="https://github.com/espcompose/espcompose/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__version-badge"
        >
          v{version}
        </a>
      )}
    </div>
  );
}
