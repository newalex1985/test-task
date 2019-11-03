import React, { Component } from 'react';

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
                    headerName: 'id', field: 'id', filter: 'agNumberColumnFilter'
                },
                {
                    headerName: 'В продаже', field: 'active', filter: 'agSetColumnFilter'
                },
                {
                    headerName: 'Скидка', field: 'use_discounts', filter: 'agSetColumnFilter'
                },
                {
                    headerName: 'Наименование', field: 'name', filter: 'agTextColumnFilter'
                },
                {
                    headerName: 'Категория', field: 'category', filter: 'agSetColumnFilter'
                },
                {
                    headerName: 'Ед. измерения', field: 'measure', filter: 'agTextColumnFilter'
                },
                {
                    headerName: 'Цех', field: 'work_space', filter: 'agTextColumnFilter'
                }
            ],

            defaultColDef: {
                sortable: true,
                filterParams: {
                    clearButton: true,
                    applyButton: true,
                    debounceMs: 200
                }
            },

            rowData: null
        }
    }

    onGridReady = async (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;


        const updateData = data => {
            this.setState({ rowData: data });
        };

        try {
            const response = await fetch('http://localhost:3000/all/');
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status + ': ' + response.statusText);
            }
            const data = await response.json();
            updateData(data);
        } catch (error) {
            console.log('Error: ', error.message);
        }

    };


    render() {
        return (

            <div
                id="myGrid"
                style={{
                    width: '1200px',
                    height: '1200px'
                }}
                className="ag-theme-balham"
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}
                    rowData={this.state.rowData}
                    multiSortKey={this.state.multiSortKey}
                    onGridReady={this.onGridReady}
                />
            </div>

        );
    }
}

export default App;
