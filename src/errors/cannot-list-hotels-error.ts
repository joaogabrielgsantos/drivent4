import { ApplicationError } from '@/protocols';

export function cannotListRoomsError(): ApplicationError {
  return {
    name: 'CannotListRoomsError',
    message: 'Cannot list rooms!',
  };
}
