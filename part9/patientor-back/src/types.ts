export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthCare = "OccupationalHealthCare",
  Hospital = "Hospital",
}

export interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
  employerName: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string,
  },
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type UnionOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type NewBaseEntry = Omit<Entry, 'id' >;

export type NewEntry = UnionOmit<Entry, "id">;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries?: Entry[]
}

// export interface PatientEntry {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: Gender;
//   occupation: string;
// }

export type PatientEntry = Omit<Patient, 'entries' >;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<Patient, 'id' | 'entries' >;