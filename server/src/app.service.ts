import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Smart Clinic | Gateway</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Public+Sans:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Public Sans', sans-serif; }
            h1, h2, h3 { font-family: 'Manrope', sans-serif; }
            .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); }
        </style>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: '#00478d',
                            'primary-container': '#005eb8',
                            background: '#f7f9fb',
                        }
                    }
                }
            }
        </script>
    </head>
    <body class="bg-background min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_50%)]">
        <div class="max-w-4xl w-full text-center">
            <div class="mb-12 inline-flex items-center gap-3">
                <div class="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-container shadow-lg"></div>
                <h1 class="text-3xl font-extrabold tracking-tight text-[#191c1e]">The Clinical Editorial</h1>
            </div>

            <div class="space-y-6">
                <h2 class="text-5xl font-extrabold text-[#191c1e] tracking-tight">Cổng kết nối hệ sinh thái</h2>
                <p class="text-xl text-slate-500 max-w-2xl mx-auto">Chào mừng bạn đến với hệ thống quản trị Medical Booking. Vui lòng chọn môi trường bạn muốn truy cập.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <!-- Patient Portal -->
                <a href="http://localhost:3001" class="group glass p-10 rounded-3xl border border-white hover:border-primary/20 transition-all hover:-translate-y-2 hover:shadow-2xl text-left">
                    <div class="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                        <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-[#191c1e] mb-4">Portal Bệnh Nhân</h3>
                    <p class="text-slate-500 leading-relaxed mb-6">Trang web dành cho khách hàng đặt lịch, xem bệnh án và tư vấn bác sĩ.</p>
                    <span class="text-primary font-bold inline-flex items-center gap-2">Truy cập ngay <span class="group-hover:translate-x-1 transition-transform">→</span></span>
                </a>

                <!-- Admin Dashboard -->
                <a href="http://localhost:3002" class="group glass p-10 rounded-3xl border border-white hover:border-primary/20 transition-all hover:-translate-y-2 hover:shadow-2xl text-left">
                    <div class="h-14 w-14 rounded-2xl bg-[#eff1f3] flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                        <svg class="h-8 w-8 text-[#4a6173]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-[#191c1e] mb-4">Admin Dashboard</h3>
                    <p class="text-slate-500 leading-relaxed mb-6">Hệ thống quản trị nội bộ dành cho bác sĩ và nhân viên phòng khám.</p>
                    <span class="text-primary font-bold inline-flex items-center gap-2">Truy cập ngay <span class="group-hover:translate-x-1 transition-transform">→</span></span>
                </a>
            </div>

            <div class="mt-20 pt-10 border-t border-slate-200">
                <p class="text-sm text-slate-400">© 2024 Smart Clinic | Hệ thống y tế kỹ thuật số hiện đại</p>
                <div class="flex justify-center gap-6 mt-4">
                    <a href="/api" class="text-primary font-semibold text-xs hover:underline decoration-2">API Documentation</a>
                    <a href="#" class="text-slate-400 text-xs">Phản hồi lỗi</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    }
}

