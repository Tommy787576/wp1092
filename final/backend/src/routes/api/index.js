import { Router } from 'express';
import fetchData from './fetchData';
import getCloseStation from './getCloseStation';
import getCloseStationByPos from './getCloseStationByPos';
import getDistricts from './getDistricts';
import getDistrictStations from './getDistrictStations';
import getAllStations from './getAllStations';
import getStationsInfo from './getStationsInfo';

const router = Router();

router.use('/', fetchData);
router.use('/', getCloseStation);
router.use('/', getCloseStationByPos);
router.use('/', getDistricts);
router.use('/', getDistrictStations);
router.use('/', getAllStations);
router.use('/', getStationsInfo);

export default router;