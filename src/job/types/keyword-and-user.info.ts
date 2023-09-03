import { USER_CAME_FROM } from '../../users/etc/USER_CAME_FROM';

export interface KeywordAndUserInfo {
    userId: string;
    cameFrom: USER_CAME_FROM;
    keyword: string;
}
