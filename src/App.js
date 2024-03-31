import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AgGridTable from "./components/AgGridTable.tsx";


function App() {
    return (
        <div className="App">
            <header className="App-header" />
            <div className="App-body">
                <AgGridTable />
            </div>
        </div>
    );
}

export default App;
