import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: any): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        role: string;
    }>;
    login(loginDto: any): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
    }>;
    seedAdmins(): Promise<{
        message: string;
        createdUsers: string[];
    }>;
    validateAdminRoute(authHeader: string): Promise<{
        valid: boolean;
        user: any;
    }>;
}
