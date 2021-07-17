import React, { useEffect, useState } from 'react';
import Editor from './Editor'
import LocalStorage from '../save/Localstorage'

function App() {
  const [html, setHtml] = LocalStorage('html', '')
  const [css, setCss] = LocalStorage('css', '')
  const [javascript, setjavascript] = LocalStorage('javascript','')
  const [srcDoc, setSrcDoc] = useState('')
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `)
      // This is the important function for performing the html,css and javascript coding 
    }, 200)
      // 200 specifies the number of microseconds to display the output 
    return () => clearTimeout(timeout)
  }, [html, css, javascript])
    return (
      <>
      <div className="pane top-pane">
        <Editor
        language="xml" 
        displayName="HTML" 
        value={html}
        onChange={setHtml}
        />
        <Editor
        language="css" 
        displayName="CSS"
        value={css}
        onChange={setCss}/>
        <Editor
        language="javascript" 
        displayName="JAVASCRIPT"
        value={javascript}
        onChange={setjavascript}/>
      </div>
      {/* Giving title and specifications for the top pane  */}
      <div className="pane">
        <iframe 
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameborder="0"
          width="100%"
          heigth="100%"
        />
        {/* Setting the lower pane  */}
      </div>
    </>
  )
}

export default App;
