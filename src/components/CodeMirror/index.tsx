// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/material.css');
// require('codemirror/theme/neat.css');
// require('codemirror/mode/xml/xml.js');
// require('codemirror/mode/javascript/javascript.js');

// import { Controlled as CodeMirror } from 'react-codemirror2';
// import { useRef } from 'react';
// export default function CodeMirrorBox() {
//   const formRefs = useRef(null);
//   return (
//     <div>
//       <CodeMirror
//         ref={formRefs}
//         editorDidMount={() => {}}
//         value={'this.state.value'}
//         options={{
//           lineNumbers: true,
//           mode: { name: 'html' },
//           autofocus: false,
//           styleActiveLine: true,
//           theme: 'dracula',
//           lineWrapping: true,
//           foldGutter: true,
//           gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
//           lint: false,
//           indentUnit: 2,
//           cursorHeight: 0.85,
//         }}
//         onBeforeChange={(editor, data, value) => {
//           // this.setState({ value });
//         }}
//         onChange={(editor, value) => {
//           console.log('controlled', { value });
//         }}
//       />
//     </div>
//   );
// }
