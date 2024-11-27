import React from 'react';
import { Card, Row, Col, Typography, Progress } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SoldeConges = () => {
  // Ces valeurs devraient venir de votre API
  const soldes = {
    totalMois: 2.5,
    restantMois: 1.5,
    totalAnnee: 30,
    restantAnnee: 22,
  };

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">Solde de Congés</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card 
            className="shadow-md hover:shadow-lg transition-shadow"
            title={
              <span>
                <CalendarOutlined className="mr-2" />
                Ce Mois
              </span>
            }
          >
            <div className="space-y-4">
              <div>
                <Text>Total du mois:</Text>
                <Title level={3}>{soldes.totalMois} jours</Title>
              </div>
              <div>
                <Text>Restant:</Text>
                <Progress 
                  percent={Math.round((soldes.restantMois / soldes.totalMois) * 100)} 
                  format={() => `${soldes.restantMois} jours`}
                  status="active"
                />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card 
            className="shadow-md hover:shadow-lg transition-shadow"
            title={
              <span>
                <ClockCircleOutlined className="mr-2" />
                Cette Année
              </span>
            }
          >
            <div className="space-y-4">
              <div>
                <Text>Total annuel:</Text>
                <Title level={3}>{soldes.totalAnnee} jours</Title>
              </div>
              <div>
                <Text>Restant:</Text>
                <Progress 
                  percent={Math.round((soldes.restantAnnee / soldes.totalAnnee) * 100)} 
                  format={() => `${soldes.restantAnnee} jours`}
                  status="active"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SoldeConges;