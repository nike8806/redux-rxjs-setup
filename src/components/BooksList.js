import React from "react";
import { connect } from "react-redux";
import {search, fetchData, cancel, random} from '../reducers/beersActions';
import { setConfig } from "../reducers/configActions";

function Beers(props) {
  const { fetchData } = props;
  const handleClick = (ev) => {
    fetchData()
  }
  return (
    <>
      <div className="App-inputs">
          Observables
          <button onClick={handleClick} type='button' >Fetch</button>
       </div>
    </>
  );
}

function mapState(state) {
  return {
    ...state.beers,
    config: state.config
  }
}

export default connect(mapState, {fetchData})(Beers);
