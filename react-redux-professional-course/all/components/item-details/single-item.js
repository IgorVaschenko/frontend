import React from "react";

const SingleItem = (props) => {
    
    const {item, image} = props

    const { name } = item

    return (
        <>
            <img className="person-image"
                src={image}
                alt='person icon' />
            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(props.children, (child)=>{
                            return React.cloneElement(child, {item})
                        }) 
                    }
                </ul>
            </div>
        </>
    );
}

export default SingleItem;
// const SingleItem = ({ item, image }) => {

//     const { id, name, gender, birthYear, eyeColor } = item
    
//     return (
//         <>
//             <img className="person-image"
//                 src={image}
//                 alt='person icon' />
//             <div className="card-body">
//                 <h4>{name}</h4>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item">
//                         <span className="term">Gender</span>
//                         <span>{gender}</span>
//                     </li>
//                     <li className="list-group-item">
//                         <span className="term">Birth Year</span>
//                         <span>{birthYear}</span>
//                     </li>
//                     <li className="list-group-item">
//                         <span className="term">Eye Color</span>
//                         <span>{eyeColor}</span>
//                     </li>
//                 </ul>
//             </div>
//         </>
//     );
// }

// export default SingleItem;