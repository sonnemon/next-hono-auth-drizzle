import { JWT } from '@auth/core/jwt';
import { AdapterUser } from '@auth/core/adapters';
import { Session, User } from '@auth/core/types';

type UserFields = {
  id: string;
  name: string;
  email: string;
  image: string;
};

declare module '@auth/core/types' {
  interface Session {
    user: UserFields;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    userId: string;
  }
}
