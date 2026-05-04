import type { PresenceStatus, ValidationStatus } from '@/constants';
import type { ImageSourcePropType } from 'react-native';

export interface ImagePoint {
    x: number;
    y: number;
}

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
    image: ImageSourcePropType;
    point: ImagePoint[];
}

export const MOCK_REPORTS: Report[] = [
    {
        id: '1',
        type: 'Ramp',
        address: '29 Lungomare Sergio Piermanni',
        time: '2h ago',
        status: 'validated',
        presence: 'present',
        icon: 'arrow-up-circle-outline',
        lat: 43.3023247,
        lng: 13.7370101,
        image: require('@/data/images/valid_ramp.png'),
        point: [{ x: 0.2, y: 0.45 }]
    },
    {
        id: '2',
        type: 'Ramp',
        address: '29 Lungomare Sergio Piermanni',
        time: '2h ago',
        status: 'validated',
        presence: 'missing',
        icon: 'arrow-up-circle-outline',
        lat: 43.30232,
        lng: 13.737,
        image: require('@/data/images/invalid_ramp.png'),
        point: [{ x: 0.5, y: 0.5 }]
    },
];
