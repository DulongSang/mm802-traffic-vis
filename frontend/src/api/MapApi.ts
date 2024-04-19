import axios from 'axios';

import { BACKEND_BASE_URL } from "../config";
import { CameraInfo } from "../types/MapData";

export function listCameras(): Promise<CameraInfo[]> {
    const mockCameraLocations: CameraInfo[] = [
        { coordinate: [-113.508574, 53.546243], name: 'a', id: 1 },
        { coordinate: [-113.525888, 53.516568], name: 'b', id: 2 },
        { coordinate: [-113.512051, 53.522870], name: 'c', id: 3 },
        { coordinate: [-113.512052, 53.518140], name: 'd', id: 4 },
        { coordinate: [-113.508486, 53.541011], name: 'e', id: 5 },
        { coordinate: [-113.493885, 53.554756], name: 'f', id: 6 },
        { coordinate: [-113.508569, 53.558899], name: 'g', id: 7 },
        { coordinate: [-113.551325, 53.558957], name: 'h', id: 8 },
        { coordinate: [-113.449107, 53.518064], name: 'i', id: 9 },
        { coordinate: [-113.467299, 53.499606], name: 'j', id: 10 },
        { coordinate: [-113.590209, 53.543305], name: 'k', id: 11 },
        { coordinate: [-113.516341, 53.453954], name: 'l', id: 12 },
    ];
    return Promise.resolve(mockCameraLocations);
    // return axios.get(`${BACKEND_BASE_URL}/cameras`);
}

export function getCameraInfo(id: string): Promise<CameraInfo> {
    const mockCameraInfo: CameraInfo = { coordinate: [-113.508574, 53.546243], name: 'a', id: 1 };
    return Promise.resolve(mockCameraInfo);
    // return axios.get(`${BACKEND_BASE_URL}/camera/${id}`);
}
