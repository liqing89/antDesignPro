import { PlusOutlined, SmileOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ProFormDatePicker,
  ProFormSegmented,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import type { SelectProps } from 'antd';
import { Button, Form, Input, Modal, Select, Space, Tag } from 'antd';
import React, { useState } from 'react';
import request from 'umi-request';
import './index.less';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

type TagRender = SelectProps['tagRender'];

const options: SelectProps['options'] = [
  { value: 'gold', label: 'courses' },
  { value: 'green', label: 'projects' },
  { value: 'cyan', label: 'research' },
  { value: 'blue', label: 'others' },
];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '內容',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '進度',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '截止時間',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'created_at',
  //   valueType: 'dateRange',
  //   hideInTable: true,
  //   search: {
  //     transform: (value) => {
  //       return {
  //         startTime: value[0],
  //         endTime: value[1],
  //       };
  //     },
  //   },
  // },
  {
    title: '更多',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        編輯
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        詳情
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const ProblemsRecord: React.FC = () => {
  const { TextArea } = Input;

  // const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <ProTable<GithubIssueItem>
        columns={columns}
        // actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          return request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          });
        }}
        search={false}
        options={false}
        pagination={{
          pageSize: 8,
          onChange: (page) => console.log(page),
        }}
        // dateFormatter="string"
        // headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="new"
            icon={<PlusOutlined />}
            // onClick={() => {
            //   actionRef.current?.reload();
            // }}
            onClick={() => {
              setVisible(true);
            }}
            type="primary"
          >
            新建
          </Button>,
          <Button key="history">往期回顧</Button>,
          // <Dropdown
          //   key="menu"
          //   menu={{
          //     items: [
          //       {
          //         label: '1st item',
          //         key: '1',
          //       },
          //       {
          //         label: '2nd item',
          //         key: '1',
          //       },
          //       {
          //         label: '3rd item',
          //         key: '1',
          //       },
          //     ],
          //   }}
          // >
          //   <Button>
          //     <EllipsisOutlined />
          //   </Button>
          // </Dropdown>,
        ]}
      />

      <Modal
        title="Hey!What's New Today?=）"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ paddingTop: '10px' }}>
          <Form.Item label="問題概要" className="problemSubmit">
            <TextArea rows={1} />
          </Form.Item>
          <Form.Item label="标签分类" className="problemSubmit">
            <Select
              mode="multiple"
              tagRender={tagRender}
              defaultValue={[]}
              style={{ width: '100%' }}
              options={options}
            />
          </Form.Item>
          <Form.Item label="詳情記錄" className="problemSubmit">
            <TextArea rows={4} />
          </Form.Item>
          <ProFormDatePicker name="date" label="截止日期" style={{ marginBottom: '0px' }} />
          <Form.Item>
            <ProFormSegmented
              name="segmented2"
              label="當前進度"
              request={async () => [
                { label: 'unsolved', value: 'open' },
                { label: 'solved', value: 'closed' },
                { label: 'processing', value: 'processing' },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 18, offset: 10 }}>
            <Button type="primary" onClick={handleOk} icon={<SmileOutlined />}>
              Pin！
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProblemsRecord;
