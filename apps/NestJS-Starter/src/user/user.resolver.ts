import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from '../../../../models/user/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: UserCreateInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.users({});
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.user(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UserUpdateInput) {
    return this.userService.updateUser({
      data: updateUserInput,
      id: updateUserInput.id,
    });
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }
}
