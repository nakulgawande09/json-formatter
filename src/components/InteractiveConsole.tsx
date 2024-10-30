/* eslint-disable @typescript-eslint/no-explicit-any */
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import { AlertCircle, Check, Copy, Play, Terminal } from 'lucide-react';
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { useTheme } from '../context/ThemeContext';

const InteractiveConsole: React.FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useTheme();

  const handleRun = () => {
    try {
      setError('');
      // Create a function from the code string and capture console.log output
      const logs: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };

      // Execute the code
      const result = new Function(code)();
      
      // Restore original console.log
      console.log = originalConsoleLog;

      // Combine logs and result
      const output = [
        ...(logs.length ? logs : []),
        ...(result !== undefined ? [JSON.stringify(result, null, 2)] : [])
      ].join('\n');

      setOutput(output);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  /**
   * Copies the output of the interactive console to the system clipboard.
   * Will also set the `copied` state to true for 2 seconds to give user feedback.
   * If the copy operation fails, an error will be logged to the console.
   */
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
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 
                   border border-gray-200 dark:border-gray-700
                   focus:ring-2 focus:ring-green-500/50 outline-none"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
        </select>
        <button
          onClick={handleRun}
          className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 
                   dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium
                   flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Run
        </button>
      </div>

      <div className="flex flex-col gap-6 h-[calc(100vh-16rem)]">
        <div className="w-full h-[70%] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 
                        flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Code Editor</span>
          </div>
          <AceEditor
            mode={language}
            theme={isDarkMode ? "monokai" : "github"}
            onChange={setCode}
            value={code}
            name="code-editor"
            width="100%"
            height="calc(100% - 36px)"
            fontSize={14}
            showPrintMargin={false}
            setOptions={{
              useWorker: false,
              showGutter: true,
              wrap: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            placeholder="Write your code here..."
          />
        </div>

        <div className="w-full h-[30%] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 border-b border-gray-200 dark:border-gray-700 
                flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Output</span>
            </div>
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`px-2 py-1 rounded-md flex items-center gap-1.5
                ${output ? 'hover:bg-gray-200 dark:hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'}`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="w-full h-[calc(100%-28px)] bg-gray-50 dark:bg-gray-900 overflow-auto">
            <AceEditor
              mode="json"
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
                wrap: true,
                highlightActiveLine: false,
                highlightGutterLine: false
              }}
            />
          </div>
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

export default InteractiveConsole;