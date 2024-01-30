export interface CreateRoomRequest {
    name: string;
    privacy: string;
    properties: RoomProperties;
}

export interface RoomProperties {
    nbf?: number;
    exp?: number;
    enable_people_ui?: boolean;
    start_audio_off?: boolean;
    start_video_off?: boolean;
}