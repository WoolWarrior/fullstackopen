"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientsTs_1 = __importDefault(require("../../data/patientsTs"));
const uuid_1 = require("uuid");
const getPatientEntries = () => {
    return patientsTs_1.default;
};
const getPublicPatient = () => {
    return patientsTs_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const findPatientById = (id) => {
    const entry = patientsTs_1.default.find(d => d.id === id);
    return entry;
};
const addNewPatient = (entry) => {
    const id = uuid_1.v1();
    const newPatientEntry = Object.assign({ id: id }, entry);
    patientsTs_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addNewDiagnosisEntry = (patientId, entry) => {
    var _a;
    const id = uuid_1.v1();
    const newEntry = Object.assign({ id: id }, entry);
    const patientEntry = patientsTs_1.default.find(d => d.id === patientId);
    (_a = patientEntry === null || patientEntry === void 0 ? void 0 : patientEntry.entries) === null || _a === void 0 ? void 0 : _a.push(newEntry);
    return patientEntry;
};
exports.default = {
    getPatientEntries, getPublicPatient, findPatientById, addNewPatient, addNewDiagnosisEntry
};
