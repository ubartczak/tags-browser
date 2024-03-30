import React, { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from "ag-grid-community"
import Form from "react-bootstrap/Form"
import { Col, Container, Row } from "react-bootstrap"

const AgGridTable = () => {
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [rowData, setRowData] = useState([])

    useEffect(() => {
        fetch("https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow")
            .then(response => response.json())
            .then((data) => setRowData(data.items))
            .catch(error => {
                console.error("Error:", error)
            })
    }, [])

    const columnDefs: ColDef[] = [
        {
            headerName: "name",
            field: "name",
            width: 90,
            flex: 1
        },
        {
            headerName: "count",
            field: "count",
            flex: 1
        }
    ]

    return (
        <Container fluid style={{ height: "100vh" }}>
            <Row className="justify-content-center">
                <Col>
                    <h1>tags browser</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Form>
                        <Form.Group>
                                <Form.Label>page size:</Form.Label>
                                <Form.Control
                                    style={{ width: "15%", margin: "0 auto", textAlign: "center", backgroundColor: "#212529", color: "white" }}
                                    type="number"
                                    min={1}
                                    id="pageSize"
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                                />
                        </Form.Group>
                    </Form>
                    <br/>
                    <div className="ag-theme-alpine-dark" style={{ height: "500px", width: "100%" }}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
                            pagination={true}
                            paginationPageSize={itemsPerPage}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AgGridTable;
