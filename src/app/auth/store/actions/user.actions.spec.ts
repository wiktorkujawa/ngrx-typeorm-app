import * as fromUser from './user.actions';

describe('loadUsers', () => {
  it('should return an action', () => {
    expect(fromUser.loadUser().type).toBe('LOAD_USER');
  });
});
