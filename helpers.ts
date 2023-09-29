import crypto from 'node:crypto';

export const createHash = (rawStr: string): string => {
    return crypto
        .createHash('shake256', { outputLength: 15 })
        .update(rawStr)
        .digest('hex');
};
