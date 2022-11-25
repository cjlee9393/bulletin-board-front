import { useState } from "react";
import { WriterContext } from "./contexts/WriterContext";

export const WriterProvider = ({ children }) => {
    // setWriter
    const getWriter = () => {
        const writerString = localStorage.getItem('writer');
        const writer = JSON.parse(writerString);
        return writer;
    }
    // define state
    const [writer, setWriter] = useState(getWriter());

    const saveWriter = (writer) => {
        localStorage.setItem('writer', JSON.stringify(writer));
        setWriter(writer);
    }

    return (
        <WriterContext.Provider value={{writer, saveWriter}}>
            {children}
        </WriterContext.Provider>
    )
}