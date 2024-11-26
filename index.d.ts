declare module 'organization-chart-react' {
    export interface OrganizationChartNode {
      title: string;
      member?: {
        name?: string;
        add?: string;
        image_url?: string;
      };
      children?: OrganizationChartNode[];
      titleClass?: string | string[];
      contentClass?: string | string[];
    }
  
    interface OrganizationChartProps {
      data: OrganizationChartNode;
      onClickNode?: (node: OrganizationChartNode) => void;
    }
  
    export default function OrganizationChart(
      props: OrganizationChartProps
    ): JSX.Element;
  }