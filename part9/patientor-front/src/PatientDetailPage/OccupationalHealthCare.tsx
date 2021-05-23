import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { OccupationalHealthCareEntry } from '../types';

const style = { margin: 10 };

const OccupationalHealthCare: React.FC<{
  entry: OccupationalHealthCareEntry;
}> = ({ entry }) => (
  <div>
    <Card style={style}>
      <Card.Content>
        {entry.date} <Icon name="user doctor" />
      </Card.Content>
      <Card.Content description={entry.description} />
      <Card.Content extra>
        Employer: {entry.employerName}
      </Card.Content>
    </Card>
  </div>
);

export default OccupationalHealthCare;