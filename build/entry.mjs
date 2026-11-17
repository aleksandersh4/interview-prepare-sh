import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { indentWithTab } from '@codemirror/commands';

// Точка входа для сборки vendor/codemirror.bundle.js (см. build.mjs)
const extensions = [basicSetup, javascript({ jsx: false, typescript: false }), keymap.of([indentWithTab])];

window.CMEditor = { EditorView, extensions };
