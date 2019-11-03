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
                    headerName: "id",
                    field: "id",
                    // filter: "agSetColumnFilter",
                    // filterParams: {
                    // cellHeight: 20,
                    // // values: irishAthletes(),
                    // debounceMs: 1000
                    // }
                }, 
                {
                    headerName: "В продаже", field: "active"
                }, 
                {
                    headerName: "Скидка", field: "use_discounts"
                },
                {
                    headerName: "Наименование", field: "name"
                },
                {
                    headerName: "Категория", field: "category"
                },
                {
                    headerName: "Ед. измерения", field: "measure"
                },
                {
                    headerName: "Цех", field: "work_space"
                }
            ],

            defaultColDef: {
                // width: 50,
                // editable: true,
                // filter: "agTextColumnFilter"
                sortable: true,
                filter: true
              },

            // rowData: [
            //     {
            //     make: "Toyota", model: "Celica", price: 35000
            //     }, 
            //     {
            //     make: "Ford", model: "Mondeo", price: 32000
            //     },
            //     {
            //     make: "Porsche", model: "Boxter", price: 72000
            //     }
            // ]
            rowData: null
        }
    }

    // componentDidMount() {
    //     console.log('component did mount');

    //     console.log('get products');
        
        // fetch('http://localhost:3000/products/')
        // .then(response => response.json())
        // .then(json => {
        //     console.log(json);

        // })
        // .catch(error => console.log('error description: ', error));

    //     console.log('get categories');
        
    //     fetch('http://localhost:3000/categories/')
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    //     .catch(error => console.log('error description: ', error));


        // console.log('get workshops');
        
        // fetch('http://localhost:3000/workshops/')
        // .then(response => response.json())
        // .then(json => console.log(json))
        // .catch(error => console.log('error description: ', error));

    // }


    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
        // const httpRequest = new XMLHttpRequest();
        const updateData = data => {
          this.setState({ rowData: data });
        };
    
        // httpRequest.open(
        //   "GET",
        //   "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
        // );
        // httpRequest.send();
        // httpRequest.onreadystatechange = () => {
        //   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        //     updateData(JSON.parse(httpRequest.responseText));
        //   }
        // };

        // fetch('http://localhost:3000/products/')
        // .then(response => response.json())
        // .then(json => {
        //     console.log(json);
        //     updateData(json.data);
        // })
        // .catch(error => console.log('error description: ', error));


        fetch('http://localhost:3000/all/')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            updateData(data);
        })
        .catch(error => console.log('error description: ', error));

    };

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '1500px',
                    width: '1500px'
                }}>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}
                    rowData={this.state.rowData}
                    onGridReady={this.onGridReady}>
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