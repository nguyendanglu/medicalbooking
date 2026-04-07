import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: any): Promise<any>;
    login(loginDto: any): Promise<{
        message: string;
        user: any;
    }>;
}
