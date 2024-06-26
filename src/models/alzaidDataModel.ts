interface Record {
    id_patient: string;
    name: string;
    gender: string;
    phase: string;
    date: string;
    vitalSign?: string;
    value?: number;
    value_b?: number;
    h_incidence?: string;
    h_time?: string;
    h_observation?: string;
    behavior?: string;
    b_score?: number;
    space_orientation?: boolean;
    time_orientation?: boolean;
    observation?: string;
    activity?: string;
    classification?: string;
    startMood?: number;
    endMood?: number;
    startTime?: string;
    endTime?: string;
}

interface ApiResponse {
    success: boolean;
    cuantos: number;
    records: Record[];
}
