import React, { Component } from "react";
import {
  Col,
  CardImg,
  CardTitle,
  CardText,
  CardFooter,
  Button,
  Card,
} from "reactstrap";
import { NavLink } from "react-router-dom";
class ProductError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch = (error, info) => {
    this.setState({ hasError: true });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    } else {
      return (
        <>
          <Col className="column-border">
            <Card className="Product-cart" body outline color="success">
              <CardTitle className="transform-names">Unknown</CardTitle>
              <CardImg top src={require("./Sorry.jpg")} />
              <CardText>Failed to load</CardText>
              <Button disabled={true} color="success" className="add1">
                Unable to add
              </Button>
              <CardFooter>
              <NavLink to={'./help'}>
                  Report us
              </NavLink>                  
                {/* <FacebookShareButton>
                  <FacebookIcon round size="25px" />
                </FacebookShareButton>
                <WhatsappShareButton>
                  <WhatsappIcon round size="25px" />
                </WhatsappShareButton>
                <EmailShareButton>
                  <EmailIcon round size="25px" />
                </EmailShareButton>                */}
              </CardFooter>
            </Card>
          </Col>
        </>
      );
    }
  }
}
export default ProductError;
