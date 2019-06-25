import React  from 'react';
import ReactTable from "react-table"; 
import _ from "lodash";
import "react-table/react-table.css";
import { Logo, Tips } from "../Utils";

let filteredData = [{'children':[], 'count':0}];
const requestData = (pageSize, page, sorted, filtered) => {
    return new Promise((resolve, reject) => { 
        fetch('api/v1/stadium-paging?pagesize=' + pageSize + '&page=' + page + "&sorted=" + JSON.stringify(sorted) + "&filtered=" + JSON.stringify(filtered))
            .then(response => response.json())
            .then(data => {
                filteredData = data;
            });

        // You can use the filters in your request, but you are responsible for applying them.
        if (filtered.length) {
            filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                return filteredSoFar.filter(row => {
                    return (row[nextFilter.id] + "").includes(nextFilter.value);
                });
            }, filteredData);
        }
        // You can also use the sorting in your request, but again, you are responsible for applying it.
        const sortedData = _.orderBy(
            filteredData,
            sorted.map(sort => {
                return row => {
                    if (row[sort.id] === null || row[sort.id] === undefined) {
                        return -Infinity;
                    }
                    return typeof row[sort.id] === "string"
                        ? row[sort.id].toLowerCase()
                        : row[sort.id];
                };
            }),
            sorted.map(d => (d.desc ? "desc" : "asc"))
        );

        // You must return an object containing the rows of the current page, and optionally the total pages number.
        const res = {
            rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
            pages: filteredData.Count
        };
 
        setTimeout(() => resolve(res), 500);
    });
};

export class TableServer extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true
        };
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });
        // Request the data however you want.   
        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
        ).then(res => {
            // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
            this.setState({
                data: res.rows,
                pages: res.pages,
                loading: false
            });
        });
    }
    render() {
        const { data, pages, loading } = this.state;
        return (
            <div>
                <ReactTable
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
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={data}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
                <Tips />
                <Logo />
            </div>
        );
    }
}

