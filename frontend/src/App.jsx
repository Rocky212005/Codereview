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
    <div className="app-container">
      <div className="editor-container">
        <h2 className="section-title">Code Editor</h2>
        <div className="editor-box">
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
          className="review-btn"
        >
          Review Code
        </button>
      </div>
      <div className="review-container">
        <h2 className="section-title">AI Review Output</h2>
        <div className="review-box">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default App
