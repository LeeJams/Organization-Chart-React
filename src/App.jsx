import { useState } from "react";
import "./App.css";
import OrganizationChart from "./OrganizationChart";

function App() {
  const [orgData, setOrgData] = useState({
    title: "CEO",
    member: [
      {
        name: "Member 1",
        add: "Member 1 Address",
        image_url: "https://picsum.photos/seed/picsum/200/300",
      },
      {
        name: "Member 2",
        add: "Member 2 Address",
        image_url: "https://picsum.photos/seed/picsum/200/300",
      },
      {
        name: "Member 3",
        add: "Member 3 Address",
        image_url: "https://picsum.photos/seed/picsum/200/300",
      },
    ],
    children: [
      {
        title: "Manager 1",
        member: [
          {
            name: "Member 4",
            add: "Member 4 Address",
            image_url: "https://picsum.photos/seed/picsum/200/300",
          },
          {
            name: "Member 5",
            add: "Member 5 Address",
            image_url: "https://picsum.photos/seed/picsum/200/300",
          },
          {
            name: "Member 6",
            add: "Member 6 Address",
            image_url: "https://picsum.photos/seed/picsum/200/300",
          },
        ],
        children: [
          {
            title: "Manager 2",
            member: [
              {
                name: "Member 7",
                add: "Member 7 Address",
                image_url: "https://picsum.photos/seed/picsum/200/300",
              },
              {
                name: "Member 8",
                add: "Member 8 Address",
                image_url: "https://picsum.photos/seed/picsum/200/300",
              },
              {
                name: "Member 9",
                add: "Member 9 Address",
                image_url: "https://picsum.photos/seed/picsum/200/300",
              },
            ],
          },
          {
            title: "Manager 3",
            member: [
              {
                name: "Member 10",
                add: "Member 10 Address",
                image_url: "https://picsum.photos/seed/picsum/200/300",
              },
              {
                name: "Member 11",
                add: "Member11 Address",
                image_url: "https://picsum.photos/seed/picsum/200/300",
              },
            ],
          },
        ],
      },
      {
        title: "Manager 5",
      },
    ],
  });

  return (
    <>
      <OrganizationChart
        data={orgData}
        onClickNode={(orgData) => {
          console.log(orgData);
        }}
      />
    </>
  );
}

export default App;
