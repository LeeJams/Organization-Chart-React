import { useEffect, useRef, useState } from "react";
import OrganizationChart from "./library.js";
import type {
  OrganizationChartNode,
  OrganizationChartSelectPayload,
} from "./types.js";
import "./App.css";

const orgData: OrganizationChartNode = {
  id: "company",
  title: "CEO",
  titleClass: "demo-ceo-title",
  member: [
    {
      id: "oliver",
      name: "Oliver",
      add: "Chief Executive Officer",
      image_url:
        "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
    },
  ],
  children: [
    {
      id: "product",
      title: "Product",
      titleClass: "demo-product-title",
      contentClass: "demo-product-content",
      member: [{ id: "mia", name: "Mia", add: "VP of Product" }],
      children: [
        {
          id: "design",
          title: "Design",
          titleClass: "demo-design-title",
          member: [
            { id: "ava", name: "Ava", add: "Brand Designer" },
            { id: "leo", name: "Leo", add: "Product Designer" },
          ],
        },
      ],
    },
    {
      id: "engineering",
      title: "Engineering",
      titleClass: "demo-engineering-title",
      contentClass: "demo-engineering-content",
      member: [
        {
          id: "emma",
          name: "Emma",
          add: "CTO",
          image_url:
            "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
        },
      ],
      children: [
        {
          id: "frontend",
          title: "Frontend",
          titleClass: "demo-frontend-title",
          member: [
            { id: "david", name: "David", add: "Lead Engineer" },
            { id: "sophia", name: "Sophia", add: "UI Engineer" },
          ],
        },
        {
          id: "backend",
          title: "Backend",
          titleClass: "demo-backend-title",
          member: [
            { id: "kyle", name: "Kyle", add: "Lead Engineer" },
            { id: "lucas", name: "Lucas", add: "Platform Engineer" },
          ],
        },
      ],
    },
    {
      id: "operations",
      title: "Operations",
      titleClass: "demo-operations-title",
      member: [{ id: "noah", name: "Noah", add: "Operations Manager" }],
    },
    {
      id: "growth",
      title: "Growth",
      titleClass: "demo-growth-title",
      member: [{ id: "zoe", name: "Zoe", add: "Marketing Lead" }],
    },
  ],
};

function App() {
  const [selection, setSelection] =
    useState<OrganizationChartSelectPayload | null>(null);
  const chartScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const chartScroll = chartScrollRef.current;

      if (chartScroll) {
        chartScroll.scrollLeft =
          (chartScroll.scrollWidth - chartScroll.clientWidth) / 2;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const selectedName =
    selection?.kind === "member"
      ? selection.member?.name
      : selection?.node.title;

  return (
    <div className="demo-page">
      <header className="demo-hero">
        <div className="demo-hero-grid" aria-hidden="true" />
        <div className="demo-hero-inner">
          <p className="demo-eyebrow">React 18.2–19 · TypeScript ready</p>
          <h1>
            Organization Chart
            <span>React</span>
          </h1>
          <p className="demo-hero-copy">
            A lightweight React component for clear, interactive team
            structures—with stable paths, custom renderers, and accessible
            branch controls.
          </p>
          <div className="demo-actions">
            <a
              className="demo-action-primary"
              href="https://www.npmjs.com/package/organization-chart-react"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on npm <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/LeeJams/Organization-Chart-React"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the source <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="demo-install">
            <span aria-hidden="true">$</span>
            <code>npm install organization-chart-react</code>
          </p>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-chart-section" aria-labelledby="chart-title">
          <div className="demo-section-heading">
            <div>
              <p className="demo-section-index">01 / Live component</p>
              <h2 id="chart-title">Explore the team</h2>
            </div>
            <div className="demo-chart-context">
              <p>
                Select a title or member. Use the circular controls to collapse
                or expand an entire branch.
              </p>
              <p className="demo-selection" aria-live="polite">
                <span>Current selection</span>
                <strong>{selectedName ?? "Nothing selected"}</strong>
                {selection && <code>{selection.path.join(" / ")}</code>}
              </p>
            </div>
          </div>

          <div className="demo-chart-scroll" ref={chartScrollRef}>
            <OrganizationChart data={orgData} onSelect={setSelection} />
          </div>
        </section>

        <section
          className="demo-details"
          aria-label="Organization Chart React details"
        >
          <article>
            <p className="demo-section-index">02 / Built for real data</p>
            <h2>Predictable by design</h2>
            <ul className="demo-feature-list">
              <li>
                <strong>Immutable inputs</strong>
                Expand state never writes to your organization data.
              </li>
              <li>
                <strong>Stable selection paths</strong>
                Optional IDs keep AI-generated tree updates predictable.
              </li>
              <li>
                <strong>React-native customization</strong>
                Render props tailor node titles and member content.
              </li>
              <li>
                <strong>Accessible interaction</strong>
                Keyboard focus, labels, and reduced-motion support are built in.
              </li>
            </ul>
          </article>

          <article className="demo-quick-start">
            <p className="demo-section-index">03 / Quick start</p>
            <h2>Two imports. One tree.</h2>
            <pre>
              <code>{`import OrganizationChart from "organization-chart-react";
import "organization-chart-react/style.css";

<OrganizationChart
  data={orgData}
  onSelect={({ kind, path }) => {
    console.log(kind, path);
  }}
/>`}</code>
            </pre>
          </article>
        </section>
      </main>

      <footer className="demo-footer">
        <p>
          Open source by{" "}
          <a
            href="https://leejams.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LeeJam
          </a>
        </p>
        <a
          href="https://github.com/LeeJams/Organization-Chart-React"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation and source <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
