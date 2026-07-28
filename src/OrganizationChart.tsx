import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import OrganizationChartNodeView from "./OrganizationChartNode.js";
import type {
  OrganizationChartNode,
  OrganizationChartProps,
  OrganizationChartTogglePayload,
} from "./types.js";
import { createExpandedState, getRootPath } from "./utils/tree.js";

export default function OrganizationChart({
  data,
  defaultExpandAll = true,
  onClickNode,
  onSelect,
  renderNodeTitle,
  renderMember,
  className,
  ariaLabel = "Organization chart",
}: OrganizationChartProps) {
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>(
    () => createExpandedState(data, defaultExpandAll)
  );

  useEffect(() => {
    setExpandedState((current) =>
      createExpandedState(data, defaultExpandAll, current)
    );
  }, [data, defaultExpandAll]);

  const handleToggle = useCallback(
    ({ node, path, value }: OrganizationChartTogglePayload) => {
      setExpandedState((current) =>
        createExpandedStateForToggle(current, node, path, value)
      );
    },
    []
  );

  const rootClassName = ["org-chart", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName} role="group" aria-label={ariaLabel}>
      <OrganizationChartNodeView
        node={data}
        depth={0}
        path={getRootPath(data)}
        expandedState={expandedState}
        onToggle={handleToggle}
        onClickNode={onClickNode}
        onSelect={onSelect}
        renderNodeTitle={renderNodeTitle}
        renderMember={renderMember}
      />
    </div>
  );
}

function createExpandedStateForToggle(
  current: Record<string, boolean>,
  node: OrganizationChartNode,
  path: string[],
  value: boolean
) {
  return createExpandedState(node, value, current, path, true);
}
