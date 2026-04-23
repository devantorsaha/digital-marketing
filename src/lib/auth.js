import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';
import { JWT_SECRET } from './mongodb.js';

const JWT_EXPIRY = '7d';
const COOKIE_NAME = 'admin_token';

export function createToken(admin) {
    const payload = {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export function serializeAdmin(token) {
    return serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
    });
}

export function deserializeAdminCookie(cookieString) {
    const parsed = parse(cookieString || '');
    return verifyToken(parsed.value);
}

export function clearAdminCookie() {
    return serialize(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
    });
}

export { COOKIE_NAME };