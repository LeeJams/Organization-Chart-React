import type {
  OrganizationChartMember,
  OrganizationChartNode,
} from "../types.js";

export function getRootPath(node: OrganizationChartNode): string[] {
  return [node.id ?? "root"];
}

export function getChildPath(
  parentPath: string[],
  node: OrganizationChartNode,
  index: number
): string[] {
  return [...parentPath, node.id ?? String(index)];
}

export function getNodeKey(_node: OrganizationChartNode, path: string[]) {
  return JSON.stringify(path);
}

export function getMemberKey(
  nodeKey: string,
  member: OrganizationChartMember,
  index: number
) {
  return member.id ?? `${nodeKey}:member:${index}`;
}

export function getMemberPath(
  nodePath: string[],
  member: OrganizationChartMember,
  index: number
): string[] {
  return [...nodePath, member.id ?? `member-${index}`];
}

export function createExpandedState(
  node: OrganizationChartNode,
  defaultValue: boolean,
  previous: Record<string, boolean> = {},
  rootPath = getRootPath(node),
  overwrite = false
) {
  const next: Record<string, boolean> = {};

  const visit = (currentNode: OrganizationChartNode, path: string[]) => {
    const key = getNodeKey(currentNode, path);
    next[key] = overwrite ? defaultValue : (previous[key] ?? defaultValue);

    currentNode.children?.forEach((child, index) => {
      visit(child, getChildPath(path, child, index));
    });
  };

  visit(node, rootPath);

  if (!overwrite) {
    return next;
  }

  return { ...previous, ...next };
}
