import { Injectable } from '@angular/core';
import { Adaptor } from '../adaptor';
export class User {
  constructor(name: string, username: string, password: string) {}
}

@Injectable({ providedIn: 'root' })
export class UserAdaptor implements Adaptor<User> {
  adapt(item: any): User {
    return new User(item.name, item.username, item.password);
  }
}
