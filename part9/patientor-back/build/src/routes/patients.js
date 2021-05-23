"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientEntries());
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.findPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.default(req.body);
        const addedEntry = patientService_1.default.addNewPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newDiagnosisEntry = req.body;
        const patientEntry = patientService_1.default.addNewDiagnosisEntry(id, newDiagnosisEntry);
        res.json(patientEntry);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
exports.default = router;
