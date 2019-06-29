import React, { Component } from 'react';

export class Data extends Component {
    static displayName = Data.name;

    constructor(props) {
        super(props);
        this.state = { stadiums: [], loading: true };

        fetch('api/v1/stadium/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ stadiums: data, loading: false });
            });
    }

    static render(stadiums) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Nation</th>
                        <th>Town</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {stadiums.map(s =>
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.nation}</td>
                            <td>{s.town}</td>
                            <td>{s.capacity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Data.render(this.state.stadiums);

        return (
            <div>
                <h1>Stadiums</h1>
                {contents}
            </div>
        );
    }
}
