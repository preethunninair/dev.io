import React from "react";
function GenerateProject(props) {
  return (
    <div
      className={`${
        props.wizardIndex == 3 ? "" : "d-none "
      }page-grid generate-layout`}
    >
      <div className="workbench p-2">
        {props.msg.map((ms, i) => (
          <p className="text-success" key={i}>
            {ms}
          </p>
        ))}
      </div>
    </div>
  );
}
export default GenerateProject;
