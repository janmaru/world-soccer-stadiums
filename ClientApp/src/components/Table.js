import React, { Component } from 'react';
import ReactTable from "react-table";

import Pagination from "./Pagination";

import "react-table/react-table.css";
import "./Table.css";

export class Table extends Component {
  static displayName = Table.name;

  constructor (props) {
    super(props); 
    this.state = { stadiums: [], loading: true };
    
    fetch('api/v1/stadium')
    .then(response => response.json())
    .then(data => {
        this.setState({ stadiums: data, loading: false });
    });
  } 

  static render (stadiums) {
    return (
      <ReactTable
      PaginationComponent={Pagination}
      data={stadiums}
      columns={[
        {
          Header: "Id",
          accessor: "id",
          minWidth: 100
        },
        {
          Header: "Name",
          accessor: "name",
          minWidth: 100
        },
        {
          Header: "Nation",
          accessor: "nation",
          minWidth: 100
        },
        {
          Header: "Town",
          accessor: "town",
          minWidth: 100
        },
        {
          Header: "Capacity",
          accessor: "capacity",
          minWidth: 100
        }
      ]}
    />
    );
  }


  render() { 
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Table.render(this.state.stadiums); 

    return (
              <div>
                <h1>Stadiums</h1>
                 {contents}
              </div>
            );
  }
}
