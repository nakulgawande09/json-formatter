import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { formatJSON, formatXML } from '../utils/formatter';

function JSONXMLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState('json');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useTheme();

  const handleFormat = () => {
    try {
      setError('');
      const formatted = format === 'json' ? formatJSON(input) : formatXML(input);
      setOutput(formatted);
    } catch (err) {
      setError(err.message);
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

  const copyButtonClasses = `
    absolute top-2 right-2 px-3 py-1.5 rounded-lg flex items-center gap-2 
    ${output 
      ? 'bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10' 
      : 'opacity-50 cursor-not-allowed'
    } transition-all
  `;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 
                   border border-gray-200 dark:border-gray-700
                   focus:ring-2 focus:ring-blue-500/50 outline-none"
        >
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>
        <button
          onClick={handleFormat}
          className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 
                   dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium"
        >
          Format
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-16rem)]">
        <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <AceEditor
            mode={format}
            theme={isDarkMode ? "monokai" : "github"}
            onChange={setInput}
            value={input}
            name="input-editor"
            width="100%"
            height="100%"
            fontSize={14}
            showPrintMargin={false}
            setOptions={{
              useWorker: false,
              showGutter: true,
              wrap: true
            }}
            placeholder={`Enter your ${format.toUpperCase()} here...`}
          />
        </div>

        <div className="relative w-full h-full">
          <button
            onClick={handleCopy}
            disabled={!output}
            className={copyButtonClasses}
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
            mode={format}
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
}

export default JSONXMLFormatter;