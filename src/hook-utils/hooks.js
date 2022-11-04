import { useState } from "react";

export const useWriter = () => {
    const getWriter = () => {
        const writerString = localStorage.getItem('writer');
        const writer = JSON.parse(writerString);
        return writer;
    }

    const [writer, setWriter] = useState(getWriter());

    const saveWriter = (writer) => {
        localStorage.setItem('writer', JSON.stringify(writer));
        setWriter(writer);
    }

    return {
        setWriter: saveWriter,
        writer
    }
}