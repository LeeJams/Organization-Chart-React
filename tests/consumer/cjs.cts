import type { ComponentProps } from "react";
import OrganizationChart, {
  type OrganizationChartNode,
  type OrganizationChartSelectPayload,
} from "organization-chart-react";

const data: OrganizationChartNode = {
  id: "root",
  title: "CEO",
};

const props: ComponentProps<typeof OrganizationChart> = {
  data,
  onSelect(payload: OrganizationChartSelectPayload) {
    console.log(payload.path);
  },
};

void props;
