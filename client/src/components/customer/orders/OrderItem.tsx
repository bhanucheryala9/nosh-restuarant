import React from "react";
import { connect } from "react-redux";

export const OrderItem = (props) => {
  return <div>OrderItem</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
