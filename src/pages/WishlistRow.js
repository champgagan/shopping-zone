import React, { Component } from "react";
import { Row, Button } from "reactstrap";

// const WishlistRow = ({ obj, style, add, removeFromWishlist }) => {
//   return (
//     <tr key={obj.id}>
//       <td className="wishlistTrash">
//         <i
//           class="fa fa-trash fa-2x wishlist"
//           onClick={() => removeFromWishlist(obj.id)}
//           aria-hidden="true"
//         >
//           &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
//           <img
//             alt={obj.name}
//             width="100px"
//             height="100px"
//             src={require(`../features/product-listing/${obj.path}`)}
//           />
//         </i>
//       </td>
//       <td style={style}>{obj.name}</td>
//       <td style={style}>{obj.type}</td>
//       <td style={style}>{obj.price}</td>
//       <td style={style}>
//         <Button
//           color="success"
//           onClick={() => {
//             add(obj);
//           }}
//           className="add1 MYbutton"
//         >
//           Move to cart
//         </Button>
//       </td>
//     </tr>
//   );
// };

// export default WishlistRow;

class WishlistRow extends Component {
  render() {
    const obj = this.props.data[this.props.index];
    return (
      <Row style={this.props.style}>
        {this.props.isScrolling
          ? "...........Loading"
          : row(obj, this.props.removeFromWishlist)}{" "}
      </Row>
    );
  }
}

const row = (obj, removeFromWishlist) => {
  return (
    <>
      <span className="layer">
        <i
          class="fa fa-trash fa-2x wishlist"
          onClick={() => removeFromWishlist(obj.id)}
          aria-hidden="true"
        >
          {" "}
        </i>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <img
          alt={obj.name}
          width="100px"
          height="100px"
          src={require(`../features/product-listing/${obj.path}`)}
        />
      </span>
      <span className="layer">{obj?.name}</span>
      <span className="layer">{obj?.type}</span>
      <span className="layer">{obj?.price}</span>
      <span className="layer">
        <Button
          color="success"
          //  onClick={() => {
          //    add(obj);
          //  }}
          className="add1 MYbutton"
        >
          Move to cart
        </Button>
      </span>
    </>
  );
};

export default WishlistRow;
