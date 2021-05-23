"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newEntry = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)
    };
    return newEntry;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (string) => {
    if (!string || !isString(string)) {
        throw new Error(`Incorrect or missing string: ` + string);
    }
    return string;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
exports.default = toNewPatientEntry;
