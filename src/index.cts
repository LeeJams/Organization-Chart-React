declare function OrganizationChart(
  props: import("./types.js").OrganizationChartProps
): import("react").ReactElement;

declare namespace OrganizationChart {
  type OrganizationChartMember =
    import("./types.js").OrganizationChartMember;
  type OrganizationChartNode = import("./types.js").OrganizationChartNode;
  type OrganizationChartProps = import("./types.js").OrganizationChartProps;
  type OrganizationChartRenderMemberProps =
    import("./types.js").OrganizationChartRenderMemberProps;
  type OrganizationChartRenderNodeTitleProps =
    import("./types.js").OrganizationChartRenderNodeTitleProps;
  type OrganizationChartSelectPayload =
    import("./types.js").OrganizationChartSelectPayload;
  type OrganizationChartTogglePayload =
    import("./types.js").OrganizationChartTogglePayload;
}

export = OrganizationChart;
