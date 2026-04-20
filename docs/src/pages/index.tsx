import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import { Highlight, themes } from "prism-react-renderer";

const YAML_EXAMPLE = `lvgl:
  widgets:
    - obj:
        layout: flex
        flex_flow: COLUMN
        children:
          - label:
              text: "Dashboard"
          - obj:
              layout: flex
              children:
                - button:
                    id: office_btn
                    on_press:
                      - homeassistant.action:
                          action: light.toggle
                          data:
                            entity_id: light.office
                    children:
                      - label:
                          id: office_btn_label
                          text: "Office"
                - button:
                    id: gym_btn
                    on_press:
                      - homeassistant.action:
                          action: light.toggle
                          data:
                            entity_id: light.gym
                    children:
                      - label:
                          id: gym_btn_label
                          text: "Gym"

binary_sensor:
  - platform: homeassistant
    entity_id: light.office
    on_state:
      - lvgl.label.update:
          id: office_btn_label
          text: !lambda |-
            if (x) return "Office On";
            return "Office Off";
  - platform: homeassistant
    entity_id: light.gym
    on_state:
      - lvgl.label.update:
          id: gym_btn_label
          text: !lambda |-
            if (x) return "Gym On";
            return "Gym Off";`;

const TSX_EXAMPLE = `import { useHAEntity } from "@espcompose/core";
import { Screen, VStack, Card, HStack, Button, Text } from "@espcompose/ui";

const HALight = ({ entity, text }) => {
  const light = useHAEntity(entity);
  return (
    <Button
      text={light.isOn ? \`\${text} On\` : \`\${text} Off\`}
      onPress={() => { light.toggle(); }}
    />
  );
};

export const Dashboard = ({ display }) => (
  <lvgl displays={[display]}>
    <Screen>
      <VStack>
        <Text variant="title" text="Dashboard" />
        <Card>
          <HStack>
            <HALight entity="light.office" text="Office" />
            <HALight entity="light.gym" text="Gym" />
          </HStack>
        </Card>
      </VStack>
    </Screen>
  </lvgl>
);`;

function Hero(): React.ReactElement {
  const { colorMode } = useColorMode();
  const logo =
    colorMode === "dark"
      ? "/img/logo-text-on-dark.svg"
      : "/img/logo-text-on-light.svg";

  return (
    <section className="coming-soon__hero">
      <img src={logo} alt="ESPCompose" className="coming-soon__logo" />
      <h1 className="coming-soon__headline">
        ESPHome, Composed
      </h1>
      <p className="coming-soon__subheadline">
        Build touchscreen UIs and device configs with TSX &mdash;
        reusable components, real data binding, compiled to standard YAML.
      </p>
      <Link to="/docs/intro" className="coming-soon__docs-link">
        Read the Documentation
      </Link>
      <div className="coming-soon__links">
        <a
          href="https://github.com/espcompose/espcompose"
          className="coming-soon__link coming-soon__link--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          ★ Star on GitHub
        </a>
        <a
          href="https://discord.gg/JjKTDUQW"
          className="coming-soon__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Discord
        </a>
      </div>
    </section>
  );
}

function ValueProps(): React.ReactElement {
  const items = [
    {
      title: "Component-Based LVGL UIs",
      desc: "Build touchscreen interfaces from reusable components — Screen, Card, HStack, Button, and more.",
    },
    {
      title: "Hot Reload, No Flashing",
      desc: "Iterate on your UI instantly — changes hot-reload in seconds without waiting for C++ compilation or device flashing.",
    },
    {
      title: "Home Assistant Data Binding",
      desc: "Bind HA entities to UI with useHAEntity. Toggle lights, read state, control devices — no lambdas.",
    },
    {
      title: "Type-Safe Everything",
      desc: "Auto-generated types for every ESPHome platform and UI component. Your IDE catches errors at build time.",
    },
    {
      title: "Theming & Layout",
      desc: "Built-in dark and light themes, flex layouts, and a design system you can customize or extend.",
    },
    {
      title: "Live Home Assistant Data",
      desc: "Preview your UI locally with `--host` and test with real Home Assistant entities, real state, real interactions.",
    },
    {
      title: "Targets ESPHome Directly",
      desc: "Generates standard ESPHome YAML and triggers the compiler automatically — seamless from code to device.",
    },
    {
      title: "Built on Node.js",
      desc: "Tap into TypeScript and the entire NPM ecosystem — use any package or tooling to power your build pipeline.",
    },
    {
      title: "Open Source",
      desc: "Fully open source and community-driven. Inspect the code, contribute features, and shape the project's future.",
    },
  ];

  return (
    <section className="coming-soon__valueprops">
      <h2 className="coming-soon__section-title">Why ESPCompose?</h2>
      <div className="coming-soon__grid">
        {items.map((item) => (
          <div key={item.title} className="coming-soon__card">
            <h3 className="coming-soon__card-title">{item.title}</h3>
            <p className="coming-soon__card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}): React.ReactElement {
  const { colorMode } = useColorMode();
  const theme = colorMode === "dark" ? themes.dracula : themes.github;

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style, margin: 0, padding: "1.25rem", fontSize: "0.8rem", lineHeight: 1.55, overflowX: "auto" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function CodeComparison(): React.ReactElement {
  return (
    <section className="coming-soon__comparison">
      <h2 className="coming-soon__section-title">Before &amp; After</h2>
      <div className="coming-soon__code-columns">
        <div className="coming-soon__code-block">
          <span className="coming-soon__code-label">ESPHome YAML</span>
          <CodeBlock code={YAML_EXAMPLE} language="yaml" />
        </div>
        <div className="coming-soon__code-block coming-soon__code-block--after">
          <span className="coming-soon__code-label coming-soon__code-label--after">
            ESPCompose TSX
          </span>
          <CodeBlock code={TSX_EXAMPLE} language="tsx" />
        </div>
      </div>
    </section>
  );
}

function Community(): React.ReactElement {
  return (
    <section className="coming-soon__community">
      <h2 className="coming-soon__section-title">A New System, Get Involved</h2>
      <p className="coming-soon__community-text">
        ESPCompose is a new system that is evolving quickly and shaped by the
        community. Report bugs, suggest features, contribute code, and help
        guide what comes next.
      </p>
      <div className="coming-soon__links">
        <a
          href="https://github.com/espcompose/espcompose"
          className="coming-soon__link coming-soon__link--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute on GitHub
        </a>
        <a
          href="https://discord.gg/JjKTDUQW"
          className="coming-soon__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the Discord
        </a>
      </div>
    </section>
  );
}

function Support(): React.ReactElement {
  return (
    <section className="coming-soon__support">
      <h2 className="coming-soon__section-title">Support ESPCompose</h2>
      <p className="coming-soon__support-text">
        If ESPCompose saves you time or helps your projects ship faster, a small
        coffee keeps development moving. Your support funds new features,
        documentation, and maintenance.
      </p>
      <a
        href="https://www.buymeacoffee.com/xmlguy74"
        className="coming-soon__coffee-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy me a coffee"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me a Coffee"
          className="coming-soon__coffee-logo"
        />
      </a>
    </section>
  );
}

export default function Home(): React.ReactElement {
  return (
    <Layout description="Build touchscreen UIs and device configs with TSX — reusable components, real data binding, compiled to standard YAML.">
      <main className="coming-soon">
        <Hero />
        <ValueProps />
        <CodeComparison />
        <Community />
        <Support />
      </main>
    </Layout>
  );
}
