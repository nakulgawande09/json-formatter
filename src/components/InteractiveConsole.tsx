import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-monokai';

const InteractiveConsole: React.FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleRun = () => {
    try {
      // For simplicity, we're using eval here. In a production environment,
      // you should use a more secure method of code execution.
      const result = eval(code);
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <select
          className="border p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
        </select>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={handleRun}
        >
          Run
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AceEditor
          mode={language}
          theme="monokai"
          onChange={setCode}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="400px"
        />
        <AceEditor
          mode="json"
          theme="monokai"
          value={output}
          name="output-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="400px"
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default InteractiveConsole;