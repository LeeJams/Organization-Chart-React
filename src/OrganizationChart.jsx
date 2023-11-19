import { useState, useEffect, useCallback } from "react";
import "./OrganizationChart.css";

export default function OrganizationChart({ data, onClickNode }) {
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
    return Array.isArray(orgData.member) && orgData.member.length;
  };

  useEffect(() => {
    init(data);
  }, [data, init]);

  return (
    <table
      className="org-table"
      style={{ display: orgData.title ? "block" : "none" }}
    >
      <tbody>
        <tr>
          <td
            colSpan={
              Array.isArray(orgData.children) ? orgData.children.length * 2 : 1
            }
            className={`${isChildren() || "org-parent-level"} ${
              isChildren() && orgData.extend ? "org-extend" : ""
            }`}
          >
            <div className="org-node">
              <div
                className="org-container"
                onClick={() => onClickNode(orgData)}
              >
                <div className={`org-title ${orgData.titleClass || ""}`}>
                  {orgData.title}
                </div>
                {isMember() && (
                  <div className={`org-content ${orgData.contentClass || ""}`}>
                    {orgData.member.map((member, index) => (
                      <div className="org-content-item" key={index}>
                        <div className="item-box">
                          <p className="item-title">{member.name}</p>
                          <p className="item-add">{member.add}</p>
                        </div>
                        {member.image_url && (
                          <div className="avat">
                            {member.image_url && <img src={member.image_url} />}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className="org-extend-arrow"
              style={{ display: isChildren() ? "block" : "none" }}
              onClick={() => setToggleExtend(orgData, !orgData.extend)}
            ></div>
          </td>
        </tr>
        <tr>
          {isChildren() &&
            orgData.extend &&
            orgData.children.map((children, index) => (
              <td key={index} colSpan={2} className="org-child-level">
                <OrganizationChart data={children} onClickNode={onClickNode} />
              </td>
            ))}
        </tr>
      </tbody>
    </table>
  );
}
