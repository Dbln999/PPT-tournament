import React from "react";
import { Row, Col } from "react-bootstrap";
const Stats = ({ stats }) => {
  return (
    <>
      <Row className='my-5'>
        <Col sm={"6"} className="text-center my-2">
          <h2>Matches</h2>
          <h1>{stats.matches}</h1>
        </Col>
        <Col sm="6" className="text-center my-2">
          <h2>Win Rate</h2>
          <h1>{stats.winRate}%</h1>
        </Col>
        <Col sm={"6"} className="text-center my-2">
          <h2>Wins</h2>
          <h1>{stats.win}</h1>
        </Col>
        <Col sm="6" className="text-center my-2">
          <h2>Losses</h2>
          <h1>{stats.loss}</h1>
        </Col>
      </Row>
    </>
  );
};

export default Stats;
