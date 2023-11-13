import { DocsThemeConfig } from "nextra-theme-docs";
import NavLogo from "./components/NavLogo";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: NavLogo,
  useNextSeoProps() {
    const { asPath } = useRouter();
    return {
      titleTemplate:
        asPath === "/"
          ? "Sky Strife documenation"
          : "%s – Sky Strife documenation",
    };
  },
  project: {
    link: "https://github.com/latticexyz/skystrife-workshop",
  },
  docsRepositoryBase: "https://github.com/latticexyz/mud/tree/main/docs",
  head: (
    <>
      <meta property="title" content="Sky Strife documentation" />
    </>
  ),
  footer: {
    text: "MIT 2023 © Sky Strife",
  },
  primaryHue: 210,
};

export default config;
