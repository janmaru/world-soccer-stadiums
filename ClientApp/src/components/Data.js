import React, { Component } from 'react';

export class Data extends Component {
  static displayName = Data.name;

  constructor (props) {
    super(props);
    this.state = { stadiums: [], loading: true };

    fetch('api/v1/stadium')
      .then(response => response.json())
      .then(data => {
        this.setState({ stadiums: data, loading: false });
      });
  }

  static renderStadiumsTable (stadiums) {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Nation</th>
            <th>Town</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {stadiums.map(s =>
            <tr key={s.Id}>
              <td>{s.Name}</td>
              <td>{s.Nation}</td>
              <td>{s.Town}</td>
              <td>{s.Capacity}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Data.renderStadiumsTable(this.state.stadiums);

    return (
      <div>
        <h1>Stadiums</h1>
        {contents}
      </div>
    );
  }
}
