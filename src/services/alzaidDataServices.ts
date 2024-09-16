import axios from 'axios';
import {getLogger} from "../clients/logger";

export const getAlzaidDataRecords = async (url: string) => {
    const logger = getLogger();
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.success) {
            return data.records;
        } else {
            throw new Error('API responded with an error');
        }
    } catch (error) {
        logger.error('Error fetching records:', error);
        throw error;
    }
};
