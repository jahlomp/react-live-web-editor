import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "./App.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [iframeRef] = useState(React.createRef());

  useEffect(() => {
    runCode();
  }, [html, css, js]);

  const runCode = () => {
    const iframe = iframeRef.current;
    const document = iframe.contentDocument;
    const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}

            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
        `;
    document.open();
    document.write(documentContents);
    document.close();
  };

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true
  };

  return (
    <div className="App">
      <section className="playground">
        <div className="code-editor html-code">
          <div className="editor-header">HTML</div>
          <CodeMirror
            value={html}
            options={{
              mode: "htmlmixed",
              ...codeMirrorOptions
            }}
            onBeforeChange={(_editor, _data, html) => {
              setHtml(html);
            }}
          />
        </div>
        <div className="code-editor css-code">
          <div className="editor-header">CSS</div>
          <CodeMirror
            value={css}
            options={{
              mode: "css",
              ...codeMirrorOptions
            }}
            onBeforeChange={(_editor, _data, css) => {
              setCss(css);
            }}
          />
        </div>
        <div className="code-editor js-code">
          <div className="editor-header">JavaScript</div>
          <CodeMirror
            value={js}
            options={{
              mode: "javascript",
              ...codeMirrorOptions
            }}
            onBeforeChange={(_editor, _data, js) => {
              setJs(js);
            }}
          />
        </div>
      </section>
      <section className="result">
        <iframe title="result" className="iframe" ref={iframeRef} />
      </section>
    </div>
  );
};

export default App;
