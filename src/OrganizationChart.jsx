import { useState, useEffect, useCallback } from "react";
import "./style.css"; // Import your CSS styles here
import classes from "./OrganizationChart.module.css";

const OrganizationChart = ({ data, onClickNode }) => {
  const [orgData, setOrgData] = useState({});

  const init = useCallback((orgData) => {
    orgData.extend = true;
    if (Array.isArray(orgData.children)) {
      orgData.children.forEach((c) => {
        init(c);
      });
    }
    setOrgData(orgData);
  }, []);

  const setToggleExtend = (orgData, extend) => {
    orgData.extend = extend;
    setOrgData({ ...orgData });
  };

  const isChildren = () => {
    return Array.isArray(orgData.children) && orgData.children.length;
  };

  const isMember = () => {
    console.log(Array.isArray(orgData.member) && orgData.member.length);
    return Array.isArray(orgData.member) && orgData.member.length;
  };

  useEffect(() => {
    init(data);
  }, [data, init]);

  return (
    <table
      className={classes.table}
      style={{ display: orgData.title ? "block" : "none" }}
    >
      <tbody>
        <tr>
          <td
            colSpan={
              Array.isArray(orgData.children) ? orgData.children.length * 2 : 1
            }
            className={`${isChildren() ? "parentLevel" : ""} ${
              isChildren() && orgData.extend ? classes.extend : ""
            }
          ${classes.td}`}
          >
            <div className={classes.node}>
              <div
                className={classes.container}
                onClick={() => onClickNode(orgData)}
              >
                <div className={`${classes.title} ${orgData.titleClass || ""}`}>
                  {orgData.title}
                </div>
                {isMember() && (
                  <div
                    className={`${classes.content} ${
                      isMember() ? orgData.contentClass || "" : ""
                    }`}
                  >
                    {orgData.member.map((member, index) => (
                      <div className={classes.contentItem} key={index}>
                        <div className={classes.itemBox}>
                          <p className={classes.itemTitle}>{member.name}</p>
                          <p className={classes.itemAdd}>{member.add}</p>
                        </div>
                        <div className={classes.avat}>
                          {member.image_url && <img src={member.image_url} />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className={classes.extendArrow}
              style={{ display: isChildren() ? "block" : "none" }}
              onClick={() => setToggleExtend(orgData, !orgData.extend)}
            ></div>
          </td>
        </tr>
        <tr>
          {isChildren() &&
            orgData.extend &&
            orgData.children.map((children, index) => (
              <td key={index} colSpan={2} className={classes.childLevel}>
                <OrganizationChart data={children} onClickNode={onClickNode} />
              </td>
            ))}
        </tr>
      </tbody>
    </table>
  );
};

export default OrganizationChart;
