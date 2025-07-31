import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)
  const [review, setReview] = useState("")

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('https://codereview-backend-zq9r.onrender.com/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '24px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Code Editor</h2>
        <div style={{
          borderRadius: '10px',
          border: '1px solid #444',
          backgroundColor: '#2a2a2a',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={20}
            style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: 16,
              minHeight: '400px',
              color: 'white',
              backgroundColor: '#2a2a2a'
            }}
          />
        </div>
        <button
          onClick={reviewCode}
          style={{
            marginTop: '8px',
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 16px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#1e40af'}
          onMouseOut={e => e.target.style.backgroundColor = '#2563eb'}
        >
          Review Code
        </button>
      </div>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>AI Review Output</h2>
        <div style={{
          backgroundColor: '#2a2a2a',
          padding: '16px',
          borderRadius: '10px',
          border: '1px solid #444',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default App
