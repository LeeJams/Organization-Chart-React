import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OrganizationChart from "../src/OrganizationChart";
import type { OrganizationChartNode } from "../src/types";

function createChartData(): OrganizationChartNode {
  return {
    id: "company",
    title: "CEO",
    member: [
      {
        id: "oliver",
        name: "Oliver",
        add: "Chief Executive Officer",
      },
    ],
    children: [
      {
        id: "management",
        title: "Management",
        member: [{ id: "jake", name: "Jake", add: "Senior Manager" }],
      },
      {
        id: "engineering",
        title: "Engineering",
        children: [{ id: "frontend", title: "Frontend" }],
      },
    ],
  };
}

function createChartDataWithoutIds(): OrganizationChartNode {
  return {
    title: "CEO",
    children: [
      {
        title: "Engineering",
        children: [{ title: "Frontend" }],
      },
    ],
  };
}

describe("OrganizationChart", () => {
  it("renders nested nodes recursively", () => {
    render(<OrganizationChart data={createChartData()} />);

    expect(screen.getByText("CEO")).toBeTruthy();
    expect(screen.getByText("Management")).toBeTruthy();
    expect(screen.getByText("Engineering")).toBeTruthy();
    expect(screen.getByText("Frontend")).toBeTruthy();
  });

  it("emits a typed select payload when a node title is clicked", () => {
    const data = createChartData();
    const onClickNode = vi.fn();
    const onSelect = vi.fn();

    render(
      <OrganizationChart
        data={data}
        onClickNode={onClickNode}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "CEO" }));

    expect(onClickNode).toHaveBeenCalledWith(data);
    expect(onSelect).toHaveBeenCalledWith({
      kind: "node",
      node: data,
      id: "company",
      path: ["company"],
    });
  });

  it("emits member details through onSelect while preserving onClickNode", () => {
    const data = createChartData();
    const onClickNode = vi.fn();
    const onSelect = vi.fn();

    render(
      <OrganizationChart
        data={data}
        onClickNode={onClickNode}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Oliver/ }));

    expect(onClickNode).toHaveBeenCalledWith(data);
    expect(onClickNode).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith({
      kind: "member",
      node: data,
      member: data.member?.[0],
      id: "oliver",
      path: ["company", "oliver"],
    });
  });

  it("does not mutate input data when expand state changes", () => {
    const data = createChartData();
    const originalSnapshot = structuredClone(data);

    render(<OrganizationChart data={data} />);
    fireEvent.click(screen.getByRole("button", { name: "Collapse CEO" }));

    expect(data).toEqual(originalSnapshot);
    expect("extend" in data).toBe(false);
  });

  it("preserves collapse state for stable IDs across data updates", () => {
    const data = createChartData();
    const { rerender } = render(<OrganizationChart data={data} />);

    fireEvent.click(screen.getByRole("button", { name: "Collapse CEO" }));
    expect(screen.queryByText("Management")).toBeNull();

    rerender(
      <OrganizationChart data={{ ...createChartData(), title: "CEO Updated" }} />
    );

    expect(screen.queryByText("Management")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Expand CEO Updated" })
    ).toBeTruthy();
  });

  it("collapses and re-expands an entire subtree", () => {
    render(<OrganizationChart data={createChartData()} />);

    fireEvent.click(screen.getByRole("button", { name: "Collapse CEO" }));
    expect(screen.queryByText("Frontend")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Expand CEO" }));
    expect(screen.getByText("Frontend")).toBeTruthy();
  });

  it("uses path keys when IDs are omitted", () => {
    const { rerender } = render(
      <OrganizationChart data={createChartDataWithoutIds()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Collapse CEO" }));
    rerender(
      <OrganizationChart
        data={{ ...createChartDataWithoutIds(), title: "CEO Updated" }}
      />
    );

    expect(screen.queryByText("Engineering")).toBeNull();
  });

  it("honors defaultExpandAll and custom renderers", () => {
    const data = createChartData();
    const { rerender } = render(
      <OrganizationChart data={data} defaultExpandAll={false} />
    );

    expect(screen.queryByText("Management")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Expand CEO" }));

    rerender(
      <OrganizationChart
        data={data}
        renderNodeTitle={({ node, depth }) => `${depth + 1}. ${node.title}`}
        renderMember={({ member }) => <strong>Member: {member.name}</strong>}
      />
    );

    expect(screen.getByText("1. CEO")).toBeTruthy();
    expect(screen.getByText("Member: Oliver")).toBeTruthy();
  });

  it("normalizes class arrays and accepts omitted callbacks", () => {
    const data = createChartData();
    data.titleClass = ["custom-title", "is-primary"];

    render(<OrganizationChart data={data} ariaLabel="Company structure" />);

    const chart = screen.getByRole("group", { name: "Company structure" });
    const title = screen.getByRole("button", { name: "CEO" });

    expect(chart).toBeTruthy();
    expect(title.className.split(" ")).toEqual(
      expect.arrayContaining(["org-title", "custom-title", "is-primary"])
    );
    expect(() => fireEvent.click(title)).not.toThrow();
  });

  it("keeps legacy clicks active across the full node container", () => {
    const data = createChartData();
    const onClickNode = vi.fn();

    render(<OrganizationChart data={data} onClickNode={onClickNode} />);
    const title = screen.getByRole("button", { name: "CEO" });

    fireEvent.click(title.parentElement!);

    expect(onClickNode).toHaveBeenCalledOnce();
    expect(onClickNode).toHaveBeenCalledWith(data);
  });

  it("keeps expand state independent for repeated IDs in different paths", () => {
    const data: OrganizationChartNode = {
      id: "company",
      title: "CEO",
      children: [
        {
          id: "left",
          title: "Left",
          children: [
            {
              id: "shared",
              title: "Shared Left",
              children: [{ id: "left-leaf", title: "Left Leaf" }],
            },
          ],
        },
        {
          id: "right",
          title: "Right",
          children: [
            {
              id: "shared",
              title: "Shared Right",
              children: [{ id: "right-leaf", title: "Right Leaf" }],
            },
          ],
        },
      ],
    };

    render(<OrganizationChart data={data} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Collapse Shared Left" })
    );

    expect(screen.queryByText("Left Leaf")).toBeNull();
    expect(screen.getByText("Right Leaf")).toBeTruthy();
  });

  it("does not collide when path IDs contain dots", () => {
    const data: OrganizationChartNode = {
      id: "root",
      title: "CEO",
      children: [
        {
          id: "a.b",
          title: "Dotted Branch",
          children: [
            {
              id: "0",
              title: "Dotted Target",
              children: [{ id: "dotted-leaf", title: "Dotted Leaf" }],
            },
          ],
        },
        {
          id: "a",
          title: "Plain Branch",
          children: [
            {
              id: "b",
              title: "Plain Middle",
              children: [
                {
                  id: "0",
                  title: "Plain Target",
                  children: [{ id: "plain-leaf", title: "Plain Leaf" }],
                },
              ],
            },
          ],
        },
      ],
    };

    render(<OrganizationChart data={data} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Collapse Dotted Target" })
    );

    expect(screen.queryByText("Dotted Leaf")).toBeNull();
    expect(screen.getByText("Plain Leaf")).toBeTruthy();
  });
});
