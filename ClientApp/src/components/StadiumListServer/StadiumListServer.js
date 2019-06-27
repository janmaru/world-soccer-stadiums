import React from 'react';
import ReactTable from "react-table";
import _ from "lodash";
import "react-table/react-table.css";
 

export class StadiumListServer extends React.Component {
    constructor() {
        super();
        this.state = {
            data: this.props.data,
            loading: false,
            pages: 0
        };
    }

    render() {
        const { data } = this.state;
        return (
            <ReactTable
                data={data}
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
                defaultPageSize={10}
                className="-striped -highlight"
            /> 
        );
    }
}