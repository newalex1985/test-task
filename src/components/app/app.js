import React, { Component } from 'react';

// import './App.css';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-enterprise";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {
                    headerName: "Make",
                    field: "make",
                    filter: "agSetColumnFilter",
                    // filterParams: {
                    // cellHeight: 20,
                    // // values: irishAthletes(),
                    // debounceMs: 1000
                    // }
                }, 
                {
                    headerName: "Model", field: "model"
                }, 
                {
                    headerName: "Price", field: "price"
                }
            ],

            defaultColDef: {
                // width: 50,
                // editable: true,
                // filter: "agTextColumnFilter"
                sortable: true,
                filter: true
              },

            rowData: [
                {
                make: "Toyota", model: "Celica", price: 35000
                }, 
                {
                make: "Ford", model: "Mondeo", price: 32000
                },
                {
                make: "Porsche", model: "Boxter", price: 72000
                }
            ]
            // rowData: null
        }
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '600px'
                }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

// function irishAthletes() {
//     return [
//       "John Joe Nevin",
//       "Katie Taylor",
//       "Paddy Barnes",
//       "Kenny Egan",
//       "Darren Sutherland",
//       "Margaret Thatcher",
//       "Tony Blair",
//       "Ronald Regan",
//       "Barack Obama"
//     ];
// }

export default App;