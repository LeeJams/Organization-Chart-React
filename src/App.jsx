import { useState } from "react";
import OrganizationChart from "./OrganizationChart";
import "./App.css";

function App() {
  const [orgData, setOrgData] = useState({
    title: "CEO",
    member: [
      {
        name: "Oliver",
        image_url:
          "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
      },
    ],
    children: [
      {
        title: "MANAGEMENT",
        member: [
          {
            name: "Jake",
            add: "Junior Staff",
            image_url:
              "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
          },
          {
            name: "Noah",
            add: "Senior Staff",
            image_url:
              "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
          },
          {
            name: "James",
            add: "Senior Manager",
            image_url:
              "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
          },
        ],
      },
      {
        title: "DEVELOPMENT",
        member: [
          {
            name: "Emma",
            add: "CTO",
            image_url:
              "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
          },
        ],
        children: [
          {
            title: "FRONTEND",
            titleClass: "frontend-title",
            contentClass: "frontend-content",
            member: [
              {
                name: "David",
                add: "Senior Staff",
              },
              {
                name: "Ava",
                add: "Senior Staff",
              },
              {
                name: "Sophia",
                add: "Senior Staff",
              },
            ],
          },
          {
            title: "BACKEND",
            titleClass: "backend-title",
            contentClass: "backend-content",
            member: [
              {
                name: "Kyle",
                add: "Senior Staff",
              },
              {
                name: "Richard",
                add: "Senior Staff",
              },
              {
                name: "Daniel",
                add: "Senior Staff",
              },
            ],
          },
        ],
      },
      {
        title: "DESIGN",
        member: [
          {
            name: "Jacob",
            add: "Senior Staff",
          },
        ],
      },
      {
        title: "MARKETING",
      },
      {
        title: "SALES",
        children: [
          {
            title: "SALES A TEAM",
          },
          {
            title: "SALES B TEAM",
          },
        ],
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
      <footer className="foot">
        <p>
          Blog
          <a href="https://leejams.github.io/" target="_blank" rel="noreferrer">
            LeeJam
          </a>
          Github
          <a
            href="https://github.com/LeeJams/Organization-Chart-React"
            target="_blank"
            rel="noreferrer"
          >
            Organization-Chart-React
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
