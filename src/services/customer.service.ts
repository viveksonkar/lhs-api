import { AddCustomerDto } from "@/dtos/customer.dto";
import { SearchOptionDto } from "@/dtos/search-option.dto";
import { CustomerEntity } from "@/entity/customer.entity";
import { HttpException } from "@/exceptions/HttpException";
import { Customer } from "@/interfaces/customer.interface";
import { User } from "@/interfaces/user.interface";
import { getRepository, Repository } from "typeorm";

class CustomerService {

    public async getUserCustomer(searchOptions: SearchOptionDto): Promise<Customer[]> {
        const customerRepo: Repository<CustomerEntity> = getRepository(CustomerEntity)
        if( searchOptions.userId && !searchOptions.mobile ) {
            const results: Customer[] = await customerRepo.find({
                relations: ['user'],
                where: {
                    user: searchOptions.userId
                }
            }) 
            return results
        }
        else if(searchOptions.userId && searchOptions.mobile) {
            const results: Customer[] = await customerRepo.find({
                relations: ['user'],
                where: {
                    user: searchOptions.userId,
                    mobile: searchOptions.mobile
                }
            }) 
            return results
        }
       
    }

    public async addCustomer(createCustomer: AddCustomerDto): Promise<Customer> {
        const customerRepo: Repository<Customer> = getRepository(CustomerEntity)
        const findCustomer: Customer = await customerRepo.findOne({
            relations: ['user'],
            where: {
                mobile: createCustomer.mobile
            }
        })
    
        if(findCustomer) throw new HttpException(409, `This mobile number 
            :${createCustomer.mobile} is already in use for: ${findCustomer.firstName} customer regitered wit: ${findCustomer.user.firstName}`);
        const savedCustomer = await customerRepo.save(createCustomer)
        return savedCustomer
    }

}

export default CustomerService