import styled from 'styled-components'



export const Document = ({ documentName, documentContent }) => {
  return (
    <>
      <h2>{documentName}</h2>
      <p>{documentContent}</p>
    </>
  )
}