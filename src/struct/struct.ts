export interface MediaResource {
    type: 'IMG' | 'VIDEO' | "LOGO" | "TITLE" | "CANVAS";
    src?: string;
    index?: number;
    base64?: string;
    style?: any;
    mousePos?: any;
    nStyle?: any;
    nMousePos?: any;
    offsetRate?: {
        x: number;
        y: number;
        scaleX: number;
        scaleY: number;
        rotate: number;
        blur?: number;
        opacity?: number;
    },
    init?: {
        translate: {
            x: number;
            y: number;
            z?: number;
        },
        scale: {
            x: number;
            y: number;
            z?: number;
        },
        rotate: number;
        blur?: number;
        opacity?: number;
    },
    mount?:  (layer: HTMLElement, banner: HTMLElement) => any | void;
    unmount?: (banner: HTMLElement, temp: any) => void;
    abs?: any;
    title?: string;
    matrix?: string;
}

export interface MediaPackage {
    content: MediaResource[];
    config?: Function;
    version: '1.0';
    id?: string;
}

export interface BannerPackage {
    content: MediaResource[];
    config?: {
        style: {
            bannerHeight: number;
        }
    } | Function;
    mount?: (banner: HTMLElement) => any | void;
    unmount?: (banner: HTMLElement, temp: any) => void;
    version: '1.1';
    id: string;
}