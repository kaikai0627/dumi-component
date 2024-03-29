import React, { useEffect } from 'react';
import { createForm, onFormInitialValuesChange, onFormSubmitSuccess, Field } from '@formily/core';
import { FormProvider, createSchemaField, ISchema } from '@formily/react';
import { Input, Select, FormItem } from '@formily/antd';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import '@formily/antd/dist/antd.css';

const form = createForm({
  values: {},
  effects() {
    onFormInitialValuesChange((form) => {
      console.log('表单默认值变化: ' + form.values.input);
    });
    onFormSubmitSuccess((form) => {
      console.log('提交成功: ', form.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
  },
});

const options = [
  {
    id: 1,
    name: '张三',
  },
];

const schemaForm: ISchema = {
  type: 'object',
  properties: {
    input: {
      title: '标题',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': {
        required: true,
        message: ['必须包含{积分数量}或{积分}以及{过期日期}或日期'],
        pattern: '(\\{日期\\}|\\{过期日期\\}).*(\\{积分\\}|\\{积分数量\\})',
      },
    },
    select: {
      title: '自动选择第一项',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-validator': {
        required: true,
      },
      'x-component-props': {
        style: {
          width: '100%',
        },
        fieldNames: {
          label: 'name',
          value: 'id',
        },
      },
      enum: 'options',
      'x-reactions': [
        {
          fulfill: {
            schema: {
              'x-value': '{{$self.dataSource[0]?.id}}',
            },
          },
        },
        '{{getOptions}}',
      ],
    },
  },
};
const KFrom = ({ schema }: any) => {
  useEffect(() => {
    console.log('schema', schema);
  }, [schema]);

  const getOptions = (field: Field) => {
    console.log('field', field.value);
    field.dataSource = options;
  };

  return (
    <>
      <FormProvider form={form}>
        <SchemaField scope={{ getOptions }} schema={schema || schemaForm}></SchemaField>
      </FormProvider>
      <Button
        onClick={() => {
          form.submit();
        }}
      >
        提交
      </Button>
    </>
  );
};

export default KFrom;
