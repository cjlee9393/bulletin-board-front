import styled from 'styled-components'

const DocumentBase = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 1px;
`

export const Document = ({ document }) => {
  return (
    <DocumentBase>
      <h2>{document.documentname}</h2>
      <p>{document.content}</p>
    </DocumentBase>
  )
}