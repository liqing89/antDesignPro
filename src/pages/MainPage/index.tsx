import { ProCard, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Row, Space, theme } from 'antd';
import React from 'react';

const { TextArea } = Input;

const MainPage: React.FC = () => {
  const { token } = theme.useToken();

  return (
    // <PageContainer>
    // <ProCard title={"test"} bordered style={{height: '100%'}}>
    //   <div>
    //     <h1></h1>
    //   </div>
    // </ProCard>
    <Row gutter={10}>
      <Col span={8}>
        <ProCard title="test"></ProCard>
      </Col>
      <Col xl={16} lg={18} md={20} sm={22} xs={24}>
        <Card>
          <div>
            <div
              key="pageTitle"
              style={{
                padding: '10px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: token.colorTextHeading,
              }}
            >
              MEMO
            </div>
            <Form>
              <Space direction="horizontal" style={{ paddingLeft: '10px' }}>
                <ProFormDatePicker name="date" label="日期" placeholder="請選擇" />
                <div style={{ width: '20px' }} />
                <ProFormSelect
                  name="select-single"
                  label="工作條目"
                  valueEnum={{
                    research: '課題',
                    project: '項目',
                    course: '課程',
                  }}
                  fieldProps={{
                    mode: 'multiple',
                  }}
                  placeholder="請選擇"
                  style={{
                    minWidth: '200px',
                  }}
                  rules={[
                    {
                      // required: true,
                      // message: '請選擇今日工作所含條目！',
                      type: 'array',
                    },
                  ]}
                />
              </Space>
              <Form.Item label="內容" style={{ paddingLeft: '10px' }}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 18, offset: 10 }}>
                <Button>就咁先！</Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
    // </PageContainer>
  );
};

export default MainPage;
