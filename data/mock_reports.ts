import type { PresenceStatus, ValidationStatus } from '@/constants';

export interface Report {
    id: string;
    type: string;
    address: string;
    time: string;
    status: ValidationStatus;
    presence: PresenceStatus;
    icon: string;
    lat: number;
    lng: number;
}

export const MOCK_REPORTS: Report[] = [
    {
        id: '1',
        type: 'Ramp',
        address: 'Via Roma, 24',
        time: '2h ago',
        status: 'validated',
        presence: 'missing',
        icon: 'arrow-up-circle-outline',
        lat: 45.0703,
        lng: 7.6869,
    },
    {
        id: '2',
        type: 'Crossing',
        address: 'Piazza Garibaldi',
        time: '3d ago',
        status: 'inReview',
        presence: 'missing',
        icon: 'add-circle-outline',
        lat: 45.0723,
        lng: 7.6855,
    },
    {
        id: '3',
        type: 'Curb cut',
        address: 'Corso Re Umberto, 3',
        time: '5d ago',
        status: 'validated',
        presence: 'missing',
        icon: 'close-circle-outline',
        lat: 45.0685,
        lng: 7.6890,
    },
    {
        id: '4',
        type: 'Audio crossing',
        address: 'Piazza Vittorio',
        time: '1w ago',
        status: 'validated',
        presence: 'present',
        icon: 'arrow-up-circle-outline',
        lat: 45.0710,
        lng: 7.6920,
    },
    {
        id: '5',
        type: 'Parking',
        address: 'Via Nizza, 10',
        time: '2w ago',
        status: 'inReview',
        presence: 'missing',
        icon: 'add-circle-outline',
        lat: 45.0725,
        lng: 7.6885,
    },
];
