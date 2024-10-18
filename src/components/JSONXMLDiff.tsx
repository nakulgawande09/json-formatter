import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-github';
import { diffJSON, diffXML } from '../utils/diff';

const JSONXMLDiff: React.FC = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState('json');
  const [error, setError] = useState('');

  const handleDiff = () => {
    setError('');
    try {
      if (format === 'json') {
        setOutput(diffJSON(input1, input2));
      } else {
        setOutput(diffXML(input1, input2));
      }
    } catch (err) {
      setError(`Error diffing ${format.toUpperCase()}: ${err.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <select
          className="border p-2 rounded"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={handleDiff}
        >
          Compare
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <AceEditor
          mode={format}
          theme="github"
          onChange={setInput1}
          name="input1-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="400px"
        />
        <AceEditor
          mode={format}
          theme="github"
          onChange={setInput2}
          name="input2-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="400px"
        />
        <AceEditor
          mode="text"
          theme="github"
          value={output}
          name="output-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="400px"
          readOnly={true}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default JSONXMLDiff;