import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getUserList(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async createUser(params: UserDTO): Promise<User> {
        const user = new User();
        user.name = params.name;
        user.password = params.password;

        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return user;
    }

    async updateUser(id: number, params: UserDTO): Promise<User> {
        const user = await this.getUser(id);
        user.name = params.name;
        user.password = params.password;
        await this.userRepository.save(user);

        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return user;
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id)

        if (!result.affected) throw new NotFoundException()
    }
}
