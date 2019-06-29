import React from 'react';
import ReactTable from "react-table";
import _ from "lodash";
import "react-table/react-table.css";
 

export class StadiumListServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            pages: 0
        };
        this.fetchData = this.fetchData.bind(this);
    }

 

    fetchData(state, instance) { 
        fetch('api/v1/stadium/pagedlist?pagesize=' + state.pageSize + '&page=' + state.page + "&sorted=" + JSON.stringify(state.sorted) + "&filtered=" + JSON.stringify(state.filtered))
            .then(response => response.json())
            .then(data => {
                this.setState({ stadiums: data.rows, loading: false, pages: data.pages });
            }); 
    }

    render() {
        const { stadiums, pages, loading } = this.state;
        return (
            <ReactTable
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                data={stadiums}
                //showPagination={true}
                pages={pages} // Display the total number of pages
                defaultPageSize={10} 
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
                loading={loading} // Display the loading overlay when we need it
                className="-striped -highlight"
                onFetchData={this.fetchData} // Request new data when things change 
            /> 
        );
    }
}