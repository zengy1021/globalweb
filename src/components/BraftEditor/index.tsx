import React, { useEffect, memo, useRef } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

const MyEditor = memo((props: any) => {
  const ref: any = useRef(null);
  const { value, onChange, placeholder = '' } = props;

  const handleChange = (val: any) => {
    onChange(val);
    console.log('val: ', val);
  };

  useEffect(() => {
    ref.current.onChange(BraftEditor.createEditorState(value ?? null));
  }, []);

  return (
    <BraftEditor
      {...props}
      ref={ref}
      value={value}
      onChange={handleChange}
      contentStyle={{
        height: 'calc(100% - 100px)',
        minHeight: 400,
        maxHeight: 'calc(100% - 100px)',
      }}
      style={{ border: '1px solid #d9d9d9', marginBottom: '20px' }}
      placeholder={placeholder}
    />
  );
});

export default MyEditor;
