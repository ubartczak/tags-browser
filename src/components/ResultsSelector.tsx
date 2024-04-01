import React from "react"
import Form from "react-bootstrap/Form"

interface ResultsSelectorProps {
    itemsPerPage: number
    setItemsPerPage: (data: number) => void
}
const ResultsSelector = (props: ResultsSelectorProps) => {
    return (
        <Form>
            <Form.Group>
                    <Form.Label>page size:</Form.Label>
                    <Form.Control
                        className="form-control-custom"
                        style={{ width: "15%", margin: "0 auto", textAlign: "center", backgroundColor: "#212529", color: "white" }}
                        type="number"
                        min={1}
                        id="pageSize"
                        value={props.itemsPerPage === 0 ? "" : props.itemsPerPage}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (!isNaN(value)) {
                                props.setItemsPerPage(value)
                            } else {
                                props.setItemsPerPage(0)
                            }
                        }}
                    />
            </Form.Group>
        </Form>
    )
}

export default ResultsSelector


