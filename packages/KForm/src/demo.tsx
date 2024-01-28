import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { Button, message } from 'antd';
import * as ace from 'ace-builds/src-noconflict/ace';
ace.config.set('basePath', '/assets/ui/');
ace.config.set('modePath', '');
ace.config.set('themePath', '');
import 'ace-builds/src-noconflict/theme-monokai'; // monokai的主题样式
import 'ace-builds/src-noconflict/ext-language_tools'; // 代码联想
import 'ace-builds/src-noconflict/mode-json'; // json模式的包`;
// import { KForm } from 'kform'
import KForm from './index';

const Demo = () => {
  const [value, setValue] = useState('');
  const [jsonData, setJsonData] = useState();
  const save = () => {
    try {
      const data = JSON.parse(value);
      setJsonData(data);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <>
      <AceEditor
        wrapEnabled
        theme="monokai"
        enableSnippets
        highlightActiveLine
        mode="json"
        value={value}
        onChange={setValue}
        width="1050px"
        setOptions={{
          enableBasicAutocompletion: true, //启用基本自动完成功能
          enableLiveAutocompletion: true, //启用实时自动完成功能 （比如：智能代码提示）
          enableSnippets: true, //启用代码段
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <Button onClick={save} type="primary" style={{ margin: '10px 0' }}>
        生成form
      </Button>
      <KForm schema={jsonData} />
    </>
  );
};

export default Demo;
