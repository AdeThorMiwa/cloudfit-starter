import { Injectable } from '@nestjs/common';
import PrismaService from '@services/prisma';
import { User } from '@prisma/client';

type UserCreateInput = {
  uid?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

@Injectable()
class AppService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: any): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: { where: any; data: any }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: any): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}

export default AppService;
