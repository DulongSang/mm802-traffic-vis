import axios from 'axios';

import { BACKEND_BASE_URL } from "../config";
import { LineChartData } from "../components/dashboard/LineChartCard";


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
