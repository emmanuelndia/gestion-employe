import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import * as client from '@prisma/client';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    // Get all Employees
    @Get()
    async getEmployees() {
        try {
            const employees = await this.employeeService.getEmployees();
            console.log(employees);

            if (!employees) {
                throw new Error('Aucun employé trouvé');
            }

            
            return employees;
        } catch (error) {
            throw error;
        }
    }

    // Get employee by id
    @Get(':id')
    async getEmployee(@Param('id') id: string) {
        try {
            const employee = await this.employeeService.getEmployeeById(parseInt(id));
            console.log(employee);

            if (!employee) {
                throw new Error('Aucun employé trouvé');
            }

            
            return employee;
        } catch (error) {
            throw error;
        }
    }

    // Create employee
    @Post()
    async createEmployee(@Body() employee: client.Employee) {
        return this.employeeService.create(employee);
    }


    // Update employee
    @Put(':id')
    async updateEmployee(@Param('id') id:string, @Body() employee: client.Employee){
        return this.employeeService.update(parseInt(id), employee);
    }

    // Delete employee
    @Delete(':id')
    async deleteEmployee(@Param('id') id:string){
        return this.employeeService.delete(parseInt(id));
    }
}
