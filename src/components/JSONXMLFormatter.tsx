import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-github';
import { formatJSON, formatXML } from '../utils/formatter';

const JSONXMLFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState('json');
  const [error, setError] = useState('');

  const handleFormat = () => {
    setError('');
    try {
      if (format === 'json') {
        setOutput(formatJSON(input));
      } else {
        setOutput(formatXML(input));
      }
    } catch (err) {
      setError(`Error formatting ${format.toUpperCase()}: ${err.message}`);
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleFormat}
        >
          Format
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AceEditor
          mode={format}
          theme="github"
          onChange={setInput}
          name="input-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="400px"
        />
        <AceEditor
          mode={format}
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

export default JSONXMLFormatter;