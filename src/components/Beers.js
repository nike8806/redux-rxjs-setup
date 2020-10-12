import React from "react";
import { connect } from "react-redux";
import BeersList from "./BeersList";
import {search, fetchData, cancel, random} from '../reducers/beersActions';
import { setConfig } from "../reducers/configActions";

function Beers(props) {
  const { data, status, search, fetchData, messages, random, cancel, config, setConfig } = props;
  const onChangeSearch = (ev) => {
    search(ev.target.value)
  }
  return (
    <>
      <div className="App-inputs">
        {/* <button type="button" onClick={fetchData} disabled={status === "pending"}>
          Fetch Beers!
        </button> */}
        <select
        name='per-page'
        defaultValue={config.perPage}
        onChange={
          (e) => setConfig({perPage: Number(e.target.value)})
        }
        >
          {[1,2,3,4,5,6,7,8,9,10].map(value => {
            return <option key={value} value={value}>{value} results</option>
          })}
        </select>

        <input 
          type='text'
          placeholder='Search beers'
          onChange={onChangeSearch}
        />


        <input 
          type='button'
          value='Random'
          onClick={random}
        />
        {status === "pending" && (
          <>
          <button type="button" onClick={cancel}>
            Cancel
          </button>
          <div className="App-spinner">
            Loading
            <img width='20' height='50' src='loader.gif' alt='Loader'  />
          </div>
          </>
        )}
      </div>
      {status ==='success' && (
        <div className='App-content'>
          <pre>
            <code>
              <BeersList beers={data}/>
            </code>
          </pre>
        </div>
      )}
      {status ==='failure' && (
        <div className='App-content'>
          <p>
            Oops, {messages[0].text}
          </p>
        </div>
      )}
    </>
  );
}

function mapState(state) {
  return {
    ...state.beers,
    config: state.config
  }
}

export default connect(mapState, {search, fetchData, cancel, setConfig, random})(Beers);
