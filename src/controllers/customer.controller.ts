import { AddCustomerDto } from "@/dtos/customer.dto";
import { DeleteMigrateDto } from "@/dtos/migrate.dto";
import { SearchOptionDto } from "@/dtos/search-option.dto";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { Customer } from "@/interfaces/customer.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import CustomerService from "@/services/customer.service";
import { Body, Controller, Delete, HttpCode, Post, Req, UseBefore } from "routing-controllers";

@Controller()
export class CustomerController {

    public customerService = new CustomerService();


    @Post('/customers')
    @UseBefore(validationMiddleware(SearchOptionDto, 'body'))
    async fetchCustomers(@Body() searchOptionDto: SearchOptionDto) {
      const findAllCustomer: Customer[] = await this.customerService. getUserCustomer(searchOptionDto);
      return { data: findAllCustomer, message: 'Customers' };
    }

    @Post('/addCustomer')
    /* @UseBefore(authMiddleware) */
    @UseBefore(validationMiddleware(AddCustomerDto, 'body'))
    @HttpCode(200)
    async addCustomer(@Body() addCustomerDto: AddCustomerDto) {
      const addCustomer: Customer = await this.customerService.addCustomer(addCustomerDto)
      return { data: addCustomer, message:"Customer added successfully"}
    }

    
  @Post('/deleteCustomer')
 // @UseBefore(authMiddleware)
 @UseBefore(validationMiddleware(DeleteMigrateDto, 'body'))
  @HttpCode(200)
  async deleteFile(@Body() deleteMigrate:  DeleteMigrateDto) {
    const deleteResponse: Customer[] = await this.customerService.deleteAndMigrate(deleteMigrate);
    return { data: deleteResponse, message: 'delete object' };
  }
}