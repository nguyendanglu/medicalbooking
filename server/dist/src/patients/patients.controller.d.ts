import { PatientsService } from './patients.service';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(search?: string, condition?: string, status?: string): Promise<any>;
    findOne(id: number): Promise<any>;
}
