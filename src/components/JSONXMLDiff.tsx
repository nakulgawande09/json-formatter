import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { GitCompare, AlertCircle, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { diffJSON, diffXML } from '../utils/diff';

const JSONXMLDiff: React.FC = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState('json');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useTheme();

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 
                   border border-gray-200 dark:border-gray-700
                   focus:ring-2 focus:ring-purple-500/50 outline-none"
        >
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>
        <button
          onClick={handleDiff}
          className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 
                   dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-medium
                   flex items-center gap-2"
        >
          <GitCompare className="w-4 h-4" />
          Compare
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
        <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <AceEditor
            mode={format}
            theme={isDarkMode ? "monokai" : "github"}
            onChange={setInput1}
            value={input1}
            name="input1-editor"
            width="100%"
            height="100%"
            fontSize={14}
            showPrintMargin={false}
            setOptions={{
              useWorker: false,
              showGutter: true,
              wrap: true
            }}
            placeholder="Enter first file content..."
          />
        </div>

        <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <AceEditor
            mode={format}
            theme={isDarkMode ? "monokai" : "github"}
            onChange={setInput2}
            value={input2}
            name="input2-editor"
            width="100%"
            height="100%"
            fontSize={14}
            showPrintMargin={false}
            setOptions={{
              useWorker: false,
              showGutter: true,
              wrap: true
            }}
            placeholder="Enter second file content..."
          />
        </div>

        <div className="relative w-full h-full">
          <button
            onClick={handleCopy}
            disabled={!output}
            className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg flex items-center gap-2 z-10
              ${output ? 'bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10' 
              : 'opacity-50 cursor-not-allowed'} transition-all`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Copy</span>
              </>
            )}
          </button>
          <AceEditor
            mode="text"
            theme={isDarkMode ? "monokai" : "github"}
            value={output}
            name="output-editor"
            width="100%"
            height="100%"
            fontSize={14}
            showPrintMargin={false}
            readOnly={true}
            setOptions={{
              useWorker: false,
              showGutter: true,
              wrap: true
            }}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 
                     flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default JSONXMLDiff;