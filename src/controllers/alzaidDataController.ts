import {Request, Response} from 'express';
import {getAlzaidDataRecords} from "../services/alzaidDataServices";


const fetchRecords = async (req: Request, res: Response, endpoint: string) => {
    const { idPatient } = req.body;
    if (!idPatient) {
        return res.status(400).json({ message: 'Patient ID is required' });
    }
    const apiUrl = `${process.env.ALZAID_API_URL}/${endpoint}/${idPatient}`;
    try {
        const records = await getAlzaidDataRecords(apiUrl);
        res.status(200).json(records);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch records', error: error.message });
    }
};

export const fetchVitalSignsRecords = (req: Request, res: Response) => {
    fetchRecords(req, res, 'vitalsigns');
};

export const fetchHygieneRecords = (req: Request, res: Response) => {
    fetchRecords(req, res, 'hygiene');
};

export const fetchBehaviorsRecords = (req: Request, res: Response) => {
    fetchRecords(req, res, 'behaviors');
};

export const fetchActivitiesRecords = async (req: Request, res: Response) => {
    fetchRecords(req, res, 'activities');
};

export const fetchPhysioRecords = async (req: Request, res: Response) => {
    fetchRecords(req, res, 'physio');
};

export const fetchEvaluationsRecords = async (req: Request, res: Response) => {
    fetchRecords(req, res, 'evaluations');
};
