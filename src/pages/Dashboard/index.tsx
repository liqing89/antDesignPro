import { PageContainer, ProCard } from '@ant-design/pro-components';
import React from 'react';

const MainPage: React.FC = () => {
  // const { token } = theme.useToken();
  return (
    <PageContainer>
      <ProCard title={'test'} bordered style={{ height: '100%' }}>
        <div>
          <h1></h1>
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default MainPage;
