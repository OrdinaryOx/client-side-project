import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@client-side-workspace/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    TAG = 'UserService';

    private users$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            name: 'Mark Storks',
            email: 'm.storks@mail.com',
            password: "secret123",
        },
        {
            id: '1',
            name: 'John James',
            email: 'j.james@mail.com',
            password: "secret123",
      
        }
    ]);

    getAll(): IUser[] {
        Logger.log('getAll', this.TAG);
        return this.users$.value;
    }

    getOne(id: string): IUser {
        Logger.log(`getOne(${id})`, this.TAG);
        const meal = this.users$.value.find((td) => td.id === id);
        if (!meal) {
            throw new NotFoundException(`User could not be found!`);
        }
        return meal;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(meal: Pick<IUser, 'name' | 'email'>): IUser {
        Logger.log('create', this.TAG);
        const current = this.users$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newMeal: IUser = {
            ...meal,
            id: `meal-${Math.floor(Math.random() * 10000)}`,
            name: "",
            email: "",
            password: "",
        };
        this.users$.next([...current, newMeal]);
        return newMeal;
    }
}
