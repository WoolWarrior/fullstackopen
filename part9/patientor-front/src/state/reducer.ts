import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY_TO_PATIENT";
    payload: Patient;
  }
  ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
        },
        patient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosisList: {
          ...action.payload
        }
      };
    case "ADD_ENTRY_TO_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { 
    type: "SET_PATIENT_LIST", 
    payload: patientListFromApi
  };
};

export const setPatient = (patientFromApi: Patient): Action => {
  return {
    type: "SET_PATIENT", 
    payload: patientFromApi
  };
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST", 
    payload: diagnosisListFromApi
  };
};

export const addPatient = (patient: Patient): Action => {
  return { 
    type: "ADD_PATIENT", 
    payload: patient 
  };
};