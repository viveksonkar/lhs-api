import { AddCustomerDto } from "@/dtos/customer.dto";
import { DeleteMigrateDto } from "@/dtos/migrate.dto";
import { SearchOptionDto } from "@/dtos/search-option.dto";
import { CustomerEntity } from "@/entity/customer.entity";
import { UserEntity } from "@/entity/user.entity";
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

    public async deleteAndMigrate(deleteOptions: DeleteMigrateDto) {
        const customerRepo: Repository<CustomerEntity> = getRepository(CustomerEntity)
        if( deleteOptions.action === 'MIGRATE' ) {

            const results: Customer[] = await customerRepo.find({
                relations: ['user'],
                where: {
                    user: deleteOptions.userId
                }
            }) 
            const deleteCustomerIds: number[] = results.map( res => res.id)
            this.deleteAll(deleteCustomerIds)
            this.deleteSale(deleteOptions.userId , results, deleteOptions.migratorId)
            return results
        }
    }

    public async deleteSale(id: number, customer: Customer[], migratorId: number){
        const userRepo: Repository<UserEntity> = getRepository(UserEntity)
        const migrator: User = await userRepo.findOne({
            where: { id: migratorId}
        })
        this.migrateCustomer(customer, migrator)
        return await userRepo.delete(id)
    }

    public async deleteAll(ids: Array<number>) {
        const customerRepo: Repository<CustomerEntity> = getRepository(CustomerEntity);
        return await customerRepo.delete(ids);
    }

   public async migrateCustomer(customer: Customer[], migrator: User) {
       const customerRepo: Repository<CustomerEntity> = getRepository(CustomerEntity);
       const newCustomer: Customer[] = customer.map(
        res => ({
            ...res,
            user: migrator
        })
       )
       return await customerRepo.save(newCustomer)
    }

}

export default CustomerService