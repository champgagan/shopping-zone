import React from "react";


export default function ProductDetailsChild(props) {
    let onjc={...props.product};
    let arr=[];
    delete onjc.path;
    delete onjc.id;
    delete onjc._id;
    delete onjc.name;    
    if(onjc!==undefined){
    arr=Object.entries(onjc);    
    }
    return(
        <React.Fragment>
            {
              arr && arr.map(ob=>
                <tr>
                    <td className='description-table transform-names'>{ob[0]}</td>
                    <td className='description-table transform-names'>{ob[1]}</td>                    
                </tr>
                )
            }
        </React.Fragment>
    )
}