import axios from 'axios';

import { BACKEND_BASE_URL } from "../config";
import { BarChartData } from '../components/dashboard/BarChartCard';
import { LineChartData } from "../components/dashboard/LineChartCard";

export function getTrafficIndex(datetime: Date): Promise<number> {
    const mockValue = Math.floor(Math.random() * 100);
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/traffic-index?datetime=${datetime.toISOString()}`);
}

export function getTotalDisruption(datetime: Date): Promise<number> {
    const mockValue = Math.floor(Math.random() * 100);
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/total-disruption?datetime=${datetime.toISOString()}`);
}

export function getTrafficJams(datetime: Date): Promise<number> {
    const mockValue = Math.floor(Math.random() * 100);
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/traffic-jams?datetime=${datetime.toISOString()}`);
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

export async function getTrafficIndexTrend(period: string): Promise<LineChartData> {
    const mockValue = generateMockTrend();
    return mockValue;
    // return axios.get(`${BACKEND_BASE_URL}/traffic-index-trend?period=${period}`);
}

export async function getDisruptionImpactDistribution(): Promise<BarChartData> {
    const mockData: BarChartData = {
        series: [
            { data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)), label: 'Disruption' },
        ],
        xAxis: [{ data: ['Permanent Closure', 'Travel Delays', 'Directional Closure', 'Total Closure', 'Increased Travel Time'], scaleType: 'band' }],
    }
    return mockData;
    // return axios.get(`${BACKEND_BASE_URL}/disruption-impact-distribution`);
}

export function getTrafficJamsTrend(period: string): Promise<LineChartData> {
    const mockValue = generateMockTrend();
    return Promise.resolve(mockValue);
    // return axios.get(`${BACKEND_BASE_URL}/traffic-jams-trend?period=${period}`);
}
