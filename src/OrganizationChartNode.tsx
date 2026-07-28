import * as React from "react";
import type { MouseEvent } from "react";
import type {
  OrganizationChartMember,
  OrganizationChartNode,
  OrganizationChartProps,
  OrganizationChartSelectPayload,
  OrganizationChartTogglePayload,
} from "./types.js";
import {
  getChildPath,
  getMemberKey,
  getMemberPath,
  getNodeKey,
} from "./utils/tree.js";

interface OrganizationChartNodeViewProps {
  node: OrganizationChartNode;
  depth: number;
  path: string[];
  expandedState: Record<string, boolean>;
  onToggle: (payload: OrganizationChartTogglePayload) => void;
  onClickNode: OrganizationChartProps["onClickNode"];
  onSelect: OrganizationChartProps["onSelect"];
  renderNodeTitle: OrganizationChartProps["renderNodeTitle"];
  renderMember: OrganizationChartProps["renderMember"];
}

export default function OrganizationChartNodeView({
  node,
  depth,
  path,
  expandedState,
  onToggle,
  onClickNode,
  onSelect,
  renderNodeTitle,
  renderMember,
}: OrganizationChartNodeViewProps) {
  if (!node.title) {
    return null;
  }

  const children = Array.isArray(node.children) ? node.children : [];
  const members = Array.isArray(node.member) ? node.member : [];
  const hasChildren = children.length > 0;
  const nodeKey = getNodeKey(node, path);
  const isExpanded = hasChildren && expandedState[nodeKey] !== false;
  const cellClassName = [
    hasChildren ? "org-parent-level" : "",
    isExpanded ? "org-extend" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const emitNodeSelect = () => {
    const payload: OrganizationChartSelectPayload = {
      kind: "node",
      node,
      id: node.id,
      path,
    };

    onClickNode?.(node);
    onSelect?.(payload);
  };

  const emitMemberSelect = (
    event: MouseEvent<HTMLButtonElement>,
    member: OrganizationChartMember,
    index: number
  ) => {
    event.stopPropagation();

    const payload: OrganizationChartSelectPayload = {
      kind: "member",
      node,
      member,
      id: member.id ?? node.id,
      path: getMemberPath(path, member, index),
    };

    onClickNode?.(node);
    onSelect?.(payload);
  };

  const toggleNode = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggle({ node, path, value: !isExpanded });
  };

  return (
    <table className="org-table" role="presentation">
      <tbody>
        <tr>
          <td
            colSpan={hasChildren ? children.length * 2 : 1}
            className={cellClassName}
          >
            <div
              className="org-node"
              style={{ animationDelay: `${Math.min(depth, 6) * 45}ms` }}
            >
              <div className="org-container" onClick={emitNodeSelect}>
                <button
                  type="button"
                  className={joinClassNames("org-title", node.titleClass)}
                >
                  {renderNodeTitle
                    ? renderNodeTitle({ node, depth, path })
                    : node.title}
                </button>

                {members.length > 0 && (
                  <div
                    className={joinClassNames(
                      "org-content",
                      node.contentClass
                    )}
                  >
                    {members.map((member, index) => (
                      <button
                        type="button"
                        className="org-content-item"
                        key={getMemberKey(nodeKey, member, index)}
                        onClick={(event) =>
                          emitMemberSelect(event, member, index)
                        }
                      >
                        {renderMember ? (
                          renderMember({ node, member, depth, path })
                        ) : (
                          <>
                            <span className="item-box">
                              <span className="item-title">{member.name}</span>
                              {member.add && (
                                <span className="item-add">{member.add}</span>
                              )}
                            </span>
                            {member.image_url && (
                              <span className="avat">
                                <img
                                  src={member.image_url}
                                  alt={
                                    member.name
                                      ? `${member.name} avatar`
                                      : "Member avatar"
                                  }
                                />
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {hasChildren && (
              <button
                type="button"
                className="org-extend-arrow"
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${
                  node.title
                }`}
                aria-expanded={isExpanded}
                onClick={toggleNode}
              />
            )}
          </td>
        </tr>

        {hasChildren && isExpanded && (
          <tr>
            {children.map((child, index) => {
              const childPath = getChildPath(path, child, index);

              return (
                <td
                  key={getNodeKey(child, childPath)}
                  colSpan={2}
                  className="org-child-level"
                >
                  <OrganizationChartNodeView
                    node={child}
                    depth={depth + 1}
                    path={childPath}
                    expandedState={expandedState}
                    onToggle={onToggle}
                    onClickNode={onClickNode}
                    onSelect={onSelect}
                    renderNodeTitle={renderNodeTitle}
                    renderMember={renderMember}
                  />
                </td>
              );
            })}
          </tr>
        )}
      </tbody>
    </table>
  );
}

function joinClassNames(
  baseClassName: string,
  customClassName?: string | string[]
) {
  const normalized = Array.isArray(customClassName)
    ? customClassName
    : customClassName?.split(/\s+/);

  return [baseClassName, ...(normalized ?? [])].filter(Boolean).join(" ");
}
