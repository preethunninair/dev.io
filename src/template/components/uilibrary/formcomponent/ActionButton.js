import React from "react";

 const ActionButton = (props)=>{
  return (
    <div {...props} class={`action-btn ${props.containerClass}`} onClick={()=>props.clickHandler()}>
    <div class="text">{props.children}</div>
    <div class="loading-dots">

    <div class="dot one"></div><div class="dot two"></div><div class="dot three"></div>
  </div>
</div>
  )
}
export default ActionButton
