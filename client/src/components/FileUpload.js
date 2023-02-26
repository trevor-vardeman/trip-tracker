import { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'

function FileUpload({ handleFileUpload }) {
  const [file, setFile] = useState(null)
  const [numPages, setNumPages] = useState(null)
  const [pageNum, setPageNum] = useState(1)

  const display = () => {
    if (file === null) {
      return null
    } else if (file.type.includes("image")) {
        return <img className="img" alt="not found" src={URL.createObjectURL(file)}/>
    } else if (file.type === "application/pdf") {
      return (
        <div>
          <Document file="file" onLoadSuccess={() => setNumPages(numPages)} onLoadError={console.error}>
            <Page pageNum={pageNum} />
          </Document>
          {numPages 
            ? <p>
              Page {pageNum} of {numPages}
              </p>
            : null
          }
        </div>
      )}
  }

  return (
    <Stack>
      <Form>
        <Form.Group controlId="formFileUpload">
          <Form.Label>Upload an Image or PDF</Form.Label>
          <Form.Control type="file" accept="image/*,.pdf" onChange={e => setFile(e.target.files[0])}></Form.Control>
        </Form.Group>
      </Form>
      {display()}
    </Stack>
  )
}

export default FileUpload