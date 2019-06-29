import React, { Component } from 'react';
import ReactTable from "react-table";

import Pagination from "../../helpers/Pagination";

import "react-table/react-table.css";
import "../../assets/css/Table.css";

export class StadiumList extends Component {
    static displayName = StadiumList.name;

    constructor(props) {
        super(props);
        this.state = { stadiums: [], loading: true }; 
    }

    componentDidMount() {
        fetch('api/v1/stadium/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ stadiums: data, loading: false });
            });
    }

    static render(stadiums) {
        return (
            <ReactTable
                PaginationComponent={Pagination}
                defaultPageSize={10} 
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
            : StadiumList.render(this.state.stadiums);

        return (
            <div>
                <h1>Stadiums</h1>
                {contents}
            </div>
        );
    }
}
