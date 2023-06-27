/* eslint-disable @typescript-eslint/naming-convention */
// We have to specify pyodide.js because we need to import that file (not .mjs)
// and 'import' defaults to .mjs
import { loadPyodide } from 'pyodide/pyodide.js';
import pkg from 'pyodide/package.json';
import type { FrameDocument } from '.';

// This will be running in an iframe, so document will be
// element.contentDocument. This declaration is just to add properties we know
// exist on this document (but not on the parent)
const contentDocument = document as FrameDocument;

contentDocument.__initPythonFrame = initPythonFrame;

async function initPythonFrame() {
  const pyodide = await loadPyodide({
    indexURL: `https://cdn.jsdelivr.net/pyodide/v${pkg.version}/full/`
  });

  function runPython(code: string) {
    console.log(
      pyodide.runPython(`
    import sys
    sys.version
  `)
    );
    pyodide.runPython(code);
  }

  contentDocument.__runPython = runPython;
}
