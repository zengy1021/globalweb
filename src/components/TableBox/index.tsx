import { Form, Input, Table, Tooltip } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import type { FormInstance } from 'antd/es/form';
const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface TableBoxProps {
  columns: Array<any>;
  data: Array<any>;
  pagination: any;
  EditChange?: Function;
}
interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: any;
  record: any;
  handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    // console.log('edit：dataIndex', dataIndex);
    // console.log('edit：record', record[dataIndex]);
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
      // console.log('save：record', record);
      // console.log('save：values', values);
      // const newRecord = {
      //   ...record,
      //   ...values
      // }
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : record[dataIndex] ? (
      <div
        className="editable-cell-value-wrap ant-table-cell-ellipsis"
        // style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        <Tooltip placement="topLeft" title={record[dataIndex]}>
          {record[dataIndex]}
        </Tooltip>
      </div>
    ) : (
      <div
        className="editable-cell-value-wrap ant-table-cell-ellipsis"
        onClick={toggleEdit}
        style={{ fontSize: '14px', color: '#cccccc' }}
      >
        请填写
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const TableBox = ({ columns, data, pagination, EditChange = () => {} }: TableBoxProps) => {
  const [dataSource, setDataSource] = useState<any[]>(data);
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] =
    columns;
  useEffect(() => {
    setDataSource([...data]);
  }, [data]);
  // useEffect(() => {
  //   setDataSource([...data]);
  // }, [pagination]);
  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    EditChange(row);
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const newColumns: any = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <Table
      components={components}
      pagination={pagination}
      columns={newColumns}
      dataSource={dataSource}
      scroll={{ x: '100%', y: 'calc(100% - 87px)' }}
    />
  );
};
export default TableBox;
