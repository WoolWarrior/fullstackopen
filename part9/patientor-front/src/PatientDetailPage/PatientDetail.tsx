import React, { useEffect } from 'react';
import { Patient, Entry } from '../types';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {
  useParams
} from "react-router-dom";
import { Header, Icon, Button } from "semantic-ui-react";
import { setPatient, useStateValue } from "../state";
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthCare from './OccupationalHealthCare';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const assertNever = (value: unknown): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetail: React.FC<{ entry: Entry }> = ({entry}) => {
  switch(entry.type){
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthCare":
      return <OccupationalHealthCare entry={entry} />;
    default:
      return assertNever(entry);
  }
//   <div key={entry.id}>
//   {entry.date} {entry.description}
//   <List as='ul'>{entry.diagnosisCodes?.map((code) => 
//     <List.Item  as='li' key={code}>
//       {code} {list.find((item) => item.code === code)?.name}
//     </List.Item>
//   )}
//   </List>
// </div>
};

const PatientDetail = () => {
  const [ { patient, diagnosisList }, dispatch] = useStateValue();
  const { id } = useParams<{id: string}>();
  
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientDetail = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientDetail();
  },[]);


  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log({values});
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY_TO_PATIENT", payload: updatedPatient });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  if(!patient || diagnosisList.length === 0){
    return null;
  }
  
  return (
    <div>
      <Header size='medium'>
        {patient?.name} 
        {patient?.gender === 'male' && <Icon fitted name='man' />}
        {patient?.gender === 'female' && <Icon fitted name='woman' />}
        {patient?.gender === 'other' && <Icon fitted name='other gender' />}
      </Header>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <Header size='small'>Entry</Header>
      <div>
        {patient?.entries?.map(entry => {
          return (
            <EntryDetail key={entry.id} entry={entry}/>
          );
        })}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientDetail;