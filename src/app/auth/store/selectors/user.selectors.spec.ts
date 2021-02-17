import * as fromUser from '../reducers/user.reducer';
import { selectUserState, selectUser } from './user.selectors';

describe('User Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUser.projector(fromUser.initialState);

    expect(result.length).toEqual(0);
  });
});
