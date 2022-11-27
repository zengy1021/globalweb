
import PageLayout from '@/components/PageLayout';
import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';

const Welcome: React.FC = () => {
  return (
    <PageLayout>
      你好!
    </PageLayout>
  );
};

export default Welcome;
