import axios from 'axios';

import { BACKEND_BASE_URL } from "../config";
import { BarChartData } from '../components/dashboard/BarChartCard';
import { LineChartData } from "../components/dashboard/LineChartCard";
import { TrafficDisruption } from '../types/TrafficDisruption';

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

function calculateProgress(startDate: string, finishDate: string): number {
    const start = new Date(startDate);
    const finish = new Date(finishDate);
    const now = new Date();
    return Math.min(1, Math.max(0, (now.getTime() - start.getTime()) / (finish.getTime() - start.getTime())));
}

export async function listTrafficDisruptions(): Promise<TrafficDisruption[]> {
    const data = (await axios.get('https://data.edmonton.ca/resource/k4tx-5k8p.json')).data as any[];
    const disruptions: TrafficDisruption[] = data.map((item: any, index: number) => ({
        id: index,
        disruption_id: item.disruption_id,
        status: item.status,
        closure: item.closure,
        on_street: item.on_street,
        impact: item.impact,
        start_date: item.start_date.substring(0, 10),
        finish_date: item.finish_date.substring(0, 10),
        progress: calculateProgress(item.start_date, item.finish_date),
        details: item.details,
        description: item.description,
        activity_type: item.activity_type,
        traffic_district: item.traffic_district,
        infrastructure: item.infrastructure,
        coordinates: [item.point.longitude, item.point.latitude],
    }));
    return disruptions;
}
