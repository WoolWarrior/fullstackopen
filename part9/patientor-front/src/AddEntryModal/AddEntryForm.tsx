import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { EntryType, NewBaseEntry } from "../types";
import { useStateValue } from "../state";

/*
 * use type NewEntry
 */
export type EntryFormValues = NewBaseEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.OccupationalHealthCare, label: "Occupational Health Care" },
  { value: EntryType.Hospital, label: "Hospital" }
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnosisList }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        date: "",
        specialist: "",
        employerName: "",
        diagnosisCodes:[],
        description:"",
        healthCheckRating:"",
        discharge: {
          date: "",
          criteria: "",
        },
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const invalidDateError = "Invalid date";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date) {
          const newDate = new Date(values.date);
          if(newDate.toString() === "Invalid Date"){
            errors.date = invalidDateError;
          }
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type && values.type !== 'Hospital' &&!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.diagnosisCodes.length === 0) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.type == 'HealthCheck' && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type === "Hospital" && !values.discharge.date){
          errors.discharge = requiredError;
        }
        if (values.type === "Hospital" && !values.discharge.criteria){
          errors.discharge = requiredError;
        }
        console.log({values});
        console.log({errors});
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return(
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            {values.type !== "Hospital" && (
              <Field
              label="Employer Name"
              placeholder="employerName"
              name="employerName"
              component={TextField}
              />
            )}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosisList)}
            />   
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            {values.type === "HealthCheck" && (
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {values.type === "Hospital" && (
              <>
                <Field
                  label="Discharge date"
                  name="discharge.date"
                  component={TextField}
                  placeholder="YYYY-MM-DD"
                />
                <Field
                  label="Criteria"
                  name="discharge.criteria"
                  placeholder="Criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === "OccupationalHealthCare" &&(
              <>
                <Field
                  label="Sick Leave Start Date"
                  name="sickLeave.startDate"
                  component={TextField}
                  placeholder="YYYY-MM-DD"
                />
                <Field
                  label="Sick Leave End Date"
                  name="sickLeave.endDate"
                  component={TextField}
                  placeholder="YYYY-MM-DD"
                />
              </>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
