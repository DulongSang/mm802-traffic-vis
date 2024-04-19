import axios from 'axios';

import { BACKEND_BASE_URL } from "../config";
import { LineChartData } from "../components/dashboard/LineChartCard";
import { PieChartData } from '../components/dashboard/PieChartCard';


export function getVehicleCount(intersectionId: string, datetime: Date): Promise<number> {
    const mockValue = Math.floor(Math.random() * 100);
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/vehicle-count?datetime=${datetime.toISOString()}`);
}

export function getTrafficIndex(intersectionId: string, datetime: Date): Promise<number> {
    const mockValue = Math.floor(Math.random() * 100);
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/traffic-index?datetime=${datetime.toISOString()}`);
}

export function getAverageSpeed(intersectionId: string, datetime: Date): Promise<number> {
    const mockValue = Math.floor(Math.random() * 100);
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/average-speed?datetime=${datetime.toISOString()}`);
}

function generateMockTrend() {
    const xAxis = [];
    const yAxis = [];

    for (let i = 0; i < 12; i++) {
        xAxis.push(i.toString());
        yAxis.push(Math.floor(Math.random() * 100));
    }
    return { series: [{ data: yAxis }], xAxis: [{ data: xAxis }] };
}

export function getVehicleCountTrend(intersectionId: string, period: string): Promise<LineChartData> {
    const mockValue = generateMockTrend();
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/vehicle-count-trend?period=${period}`);
}

export function getTrafficIndexTrend(intersectionId: string, period: string): Promise<LineChartData> {
    const mockValue = generateMockTrend();
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/traffic-index-trend?period=${period}`);
}

export function getAverageSpeedTrend(intersectionId: string, period: string): Promise<LineChartData> {
    const mockValue = generateMockTrend();
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/average-speed-trend?period=${period}`);
}


export function getVehicleDistribution(intersectionId: string): Promise<PieChartData> {
    const mockValue = [
        { value: Math.floor(Math.random() * 100), label: 'Car' },
        { value: Math.floor(Math.random() * 100), label: 'Bus' },
        { value: Math.floor(Math.random() * 100), label: 'Truck' },
    ];
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/vehicle-distribution`);
}

export function getPredictedVolume(intersectionId: string): Promise<number> {
    const mockValue = Math.floor(Math.random() * 1000);
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/predicted-volume`);
}

export function getCameraRTSP(intersectionId: string, objectTracking: boolean): Promise<string> {
    const mockValue = 'rtsp://';
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/intersection/${intersectionId}/camera-rtsp?objectTracking=${objectTracking}`);
}
