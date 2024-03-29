import React, { useState, useEffect } from "react"
import Table from "react-bootstrap/Table"
import Pagination from "react-bootstrap/Pagination"
import Form from "react-bootstrap/Form"
import { Col, Container, Row } from "react-bootstrap"

const TagsTable = () => {
    const [tags, setTags] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    useEffect(() => {
        fetch("https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow")
            .then(response => response.json())
            .then(data => {
                setTags(data.items)
            })
            .catch(error => {
                console.error("Error:", error)
            })
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentTags = tags.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(tags.length / itemsPerPage)
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <Container fluid style={{ height: "100vh", overflowY: "scroll" }}>
                <Row className="justify-content-center">
                    <Col>
                        <h1>tags browser</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={8} md={4} lg={2}>
                        <Form>
                            <Form.Group>
                                <Form.Label>results on page:</Form.Label>
                                <Form.Control
                                    style={{ width: "35%", margin: "0 auto", textAlign: "center" }}
                                    type="number"
                                    min={1}
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(e.target.value)
                                        setCurrentPage(pageNumbers[0])
                                    }}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />

                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <Table striped bordered hover className="table-dark">
                            <thead>
                                <tr>
                                    <th style={{ width: "50%" }}>tag name</th>
                                    <th>questions count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTags.map(tag => (
                                    <tr key={tag.name}>
                                        <td>{tag.name}</td>
                                        <td>{tag.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4}>
                        <Pagination className="justify-content-center pagination-dark">
                            <Pagination.First onClick={() => setCurrentPage(pageNumbers[0])} />
                            <Pagination.Prev onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} />
                            <Pagination.Item disabled>{currentPage}</Pagination.Item>
                            <Pagination.Item disabled>of</Pagination.Item>
                            <Pagination.Item disabled>{totalPages}</Pagination.Item>
                            <Pagination.Next onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} />
                            <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TagsTable;
