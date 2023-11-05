import React, { useState, useEffect } from "react";
import "./style.css"; // Import your CSS styles here

const OrganizationChart = ({ data, onClickNode }) => {
  const [orgData, setOrgData] = useState({});

  const extendKey = (orgData) => {
    orgData.extend = true;
    if (Array.isArray(orgData.children)) {
      orgData.children.forEach((c) => {
        extendKey(c);
      });
    }
    setOrgData(orgData);
  };

  const setToggleExtend = (orgData, extend) => {
    orgData.extend = extend;
    if (Array.isArray(orgData.children)) {
      orgData.children.forEach((c) => {
        setToggleExtend(c, extend);
      });
    }
    forceUpdate();
  };

  const isChildren = () => {
    return Array.isArray(orgData.children) && orgData.children.length;
  };

  const isMember = () => {
    return Array.isArray(orgData.member) && orgData.member.length;
  };

  const forceUpdate = () => {
    // A simple function that forces a component update
    setOrgData({ ...orgData });
  };

  useEffect(() => {
    extendKey(data);
  }, [data]);

  return (
    <table style={{ display: orgData.title ? "block" : "none" }}>
      <tr>
        <td
          colSpan={
            Array.isArray(orgData.children) ? orgData.children.length * 2 : 1
          }
          className={`${isChildren() ? "parentLevel" : ""} ${
            isChildren() && orgData.extend ? "extend" : ""
          }`}
        >
          <div className="node">
            <div className="container" onClick={() => onClickNode(orgData)}>
              <div className={`title ${orgData.titleClass || ""}`}>
                {orgData.title}
              </div>
              <div
                className={`content ${
                  isMember() ? orgData.contentClass || "" : ""
                }`}
              >
                {isMember() &&
                  orgData.member.map((member, index) => (
                    <div
                      className="content-item"
                      key={index}
                      onClick={() => onClickNode(member)}
                    >
                      <div className="item-box">
                        <p className="item-title">{member.name}</p>
                        <p className="item-add">{member.add}</p>
                      </div>
                      <div className="avat">
                        {member.image_url && <img src={member.image_url} />}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div
            className="extend_arrow"
            style={{ display: isChildren() ? "block" : "none" }}
            onClick={() => setToggleExtend(orgData, !orgData.extend)}
          ></div>
        </td>
      </tr>
      <tr style={{ visibility: orgData.extend ? "visible" : "hidden" }}>
        {isChildren() &&
          orgData.children.map((children, index) => (
            <td key={index} colSpan={2} className="childLevel">
              <OrganizationChart data={children} onClickNode={onClickNode} />
            </td>
          ))}
      </tr>
    </table>
  );
};

export default OrganizationChart;
