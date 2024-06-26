import axios from 'axios';

export const getAlzaidDataRecords = async (url: string) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.success) {
            return data.records;
        } else {
            throw new Error('API responded with an error');
        }
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error;
    }
};
