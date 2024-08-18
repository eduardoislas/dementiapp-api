import {Router} from 'express';
import {
    fetchActivitiesRecords,
    fetchBehaviorsRecords, fetchEvaluationsRecords,
    fetchHygieneRecords, fetchPhysioRecords,
    fetchVitalSignsRecords
} from "../controllers/alzaidDataController";

const router = Router();

router.get('/vitalsigns', fetchVitalSignsRecords);
router.get('/hygiene', fetchHygieneRecords);
router.get('/behaviors', fetchBehaviorsRecords);
router.get('/activities', fetchActivitiesRecords);
router.get('/physio', fetchPhysioRecords);
router.get('/evaluations', fetchEvaluationsRecords);

export default router;
