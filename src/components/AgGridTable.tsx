import React, { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"
import "@ag-grid-community/styles/ag-grid.css"
import "@ag-grid-community/styles/ag-theme-alpine.css"
import { ColDef } from "ag-grid-community"
import Form from "react-bootstrap/Form"
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap"

const AgGridTable = () => {
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [rowData, setRowData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow")
            .then(response => {
                if (!response.ok) {
                    throw new Error()
                }
                return response.json()
            })
            .then((data) => {
                setRowData(data.items)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }, [])

    const columnDefs: ColDef[] = [
        {
            headerName: "name",
            field: "name",
            flex: 1
        },
        {
            headerName: "count",
            field: "count",
            flex: 1
        }
    ]

    return (
        <>
            {error && 
                <div className="page-alert" >
                    <Alert data-bs-theme="dark" variant={"danger"} dismissible>Error: {(error as Error).message}</Alert>
                </div>
            }
            {loading &&
                <div className="page-spinner">
                    <Spinner animation="border" />
                </div>
            }

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
                                        value={itemsPerPage === 0 ? "" : itemsPerPage}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value)
                                            if (!isNaN(value)) {
                                                setItemsPerPage(value)
                                            } else {
                                                setItemsPerPage(0)
                                            }
                                        }}
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
        </>
    )
}

export default AgGridTable
