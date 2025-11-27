export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

// 模拟用户数据库（生产环境应使用真实数据库�?
const MOCK_USERS = [
    {
        id: '1',
        email: process.env.DEV_ADMIN_EMAIL || 'admin@blog.com',
        // 这是 'admin123' 的bcrypt哈希值示�?
        // 生产环境必须使用真实的bcrypt.hash()
        passwordHash: '$2b$10$rO5gJLqLZqxqKhHvY5qJ0.eZ5Y9xQYxNVqLm8TKZqxqKhHvY5qJ0e',
        username: 'Admin',
        role: 'admin' as const
    }
];

// 简化的密码验证（生产环境应使用bcrypt.compare�?
function verifyPassword(password: string, hash: string): boolean {
    // TODO: 生产环境必须使用 bcrypt.compare(password, hash)
    // 这里仅用于演�?
    if (process.env.NODE_ENV === 'development') {
        // 开发环境简单验�?
        return password === (process.env.DEV_ADMIN_PASSWORD || 'admin123');
    }
    return false;
}

// 生成简单的JWT Token（生产环境应使用jsonwebtoken库）
function generateToken(userId: string): string {
    // TODO: 生产环境使用 jwt.sign()
    const payload = {
        userId,
        iat: Date.now(),
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7�?
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // 输入验证
        if (!email || !password) {
            return NextResponse.json(
                { error: '邮箱和密码不能为�? },
                { status: 400 }
            );
        }

        // Email格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: '邮箱格式不正�? },
                { status: 400 }
            );
        }

        // 查找用户
        const user = MOCK_USERS.find(u => u.email === email);

        if (!user) {
            // 安全：不要泄露用户是否存�?
            return NextResponse.json(
                { error: '邮箱或密码错�? },
                { status: 401 }
            );
        }

        // 验证密码
        const isValid = verifyPassword(password, user.passwordHash);

        if (!isValid) {
            return NextResponse.json(
                { error: '邮箱或密码错�? },
                { status: 401 }
            );
        }

        // 检查权�?
        if (user.role !== 'admin') {
            return NextResponse.json(
                { error: '无权限访�? },
                { status: 403 }
            );
        }

        // 生成Token
        const token = generateToken(user.id);

        // 返回用户信息（不包含密码哈希�?
        const userInfo = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        };

        return NextResponse.json({
            success: true,
            token,
            user: userInfo
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: '服务器错�? },
            { status: 500 }
        );
    }
}

