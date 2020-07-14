import React from "react";

 const Icon = (props) => {

    let family=props.family?props.family:props.iconObj.family;
    let name=props.name?props.name:props.iconObj.name;

   switch (family) {
       case "material-icon":
           return <i class="material-icons">{name}</i>
           break;
           case "font awesome":
            return <i class={name}></i>
            break;
       default:
        return <i class={name}></i>
           break;
   }

}

export default Icon;