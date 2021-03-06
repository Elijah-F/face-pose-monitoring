import React, { useState } from 'react';
import { getHistory, HistoryType, getImageHistory, ImageHistoryType } from '@/services/history';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Input, Divider, Row, Col, Card, Modal } from 'antd';
import { Bar, Pie, Line } from '@ant-design/charts';

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryType>();
  const [imageHistory, setImageHistory] = useState<ImageHistoryType>();
  const [visible, setVisible] = useState<boolean>(false);

  const lineConfig = {
    xField: 'time',
    yField: 'value',
    seriesField: 'index',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219', '#7cb305'],
  };
  const barConfig = {
    style: {
      height: 200,
    },
    xField: 'value',
    yField: 'index',
    seriesField: 'proportion',
    isPercent: true,
    isStack: true,
    label: {
      position: 'middle',
      content: function content(item) {
        return item.value.toFixed(2);
      },
      style: { fill: '#fff' },
    },
  };
  const pieConfig = {
    style: {
      height: 200,
    },
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
  };
  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        width="80%"
        onCancel={() => {
          setVisible(false);
        }}
      >
        {!imageHistory
          ? null
          : Object.keys(imageHistory).map((element) => {
              return (
                <Row gutter={[16, 16]} key={element}>
                  {imageHistory[element].map((ele) => {
                    return (
                      <Col span={4}>
                        <img width="100%" src={ele} key={ele} />
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
      </Modal>
      <Input.Search
        placeholder="input search phone"
        enterButton
        style={{ width: 300 }}
        size="large"
        onSearch={async (phone) => {
          const data = await getHistory(phone);
          setHistory(data);
        }}
      ></Input.Search>
      <Divider />
      {history === undefined ? null : <Line data={history['line']} {...lineConfig} />}
      <Divider />
      <Row gutter={[16, 16]}>
        {history === undefined
          ? null
          : Object.keys(history['bar']).map((element) => {
              return (
                <Col key={element} span={6}>
                  <Card
                    title={history['job_date'][element]}
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined
                        onClick={async () => {
                          const data = await getImageHistory(element);
                          console.log(data);
                          setImageHistory(data);
                          setVisible(true);
                        }}
                        key="edit"
                      />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Bar data={history['bar'][element]} {...barConfig} />
                    <Pie data={history['pie'][element]} {...pieConfig} />
                  </Card>
                </Col>
              );
            })}
      </Row>
    </>
  );
};

export default History;
