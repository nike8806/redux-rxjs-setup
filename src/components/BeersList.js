import React from 'react';

export default function BeerList({beers = []}) {
console.log(beers);
  return (
    <ul className="List">
      {beers.map((beer) => (
        <li key={beer.id} className="List-item">
          <figure className="List-item-img">
            <img src={beer.image_url} />
          </figure>
          <div className="List-item-info">
            <p>{beer.name}</p>
            <ul>
              <li>
                <small>ABV: {beer.abv}</small>
              </li>
              <li>
                <small>Volume: {beer.volume.unit}</small>
              </li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
