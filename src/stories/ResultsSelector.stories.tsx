import React, { useState } from "react";
import ResultsSelector from "../components/ResultsSelector.tsx";

export default {
  title: "ResultsSelector"
}

export const Default = () => {
    const [itemsPerPage, setItemsPerPage] = useState(5)
    return (
        <ResultsSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
    )
}