export default function NavLogo() {
  return (
    <div
      style={{ display: "grid", gridAutoFlow: "column", alignItems: "center" }}
    >
      {/* TODO: figure out how to size Logo and use that here instead */}
      <img
        src={"/logo512.png"}
        style={{ height: "calc(var(--nextra-navbar-height) - 25px)" }}
        alt="MUD logo"
      />
      <p
        style={{
          fontWeight: "bold",
          fontSize: "25px",
          marginTop: "6px",
          paddingLeft: "4px",
        }}
      >
        Sky Strife
      </p>
    </div>
  );
}
