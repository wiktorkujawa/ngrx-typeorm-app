import * as fromPost from '../reducers/post.reducer';
import { selectPosts } from './post.selectors';

describe('Post Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPosts.projector(fromPost.initialState);

    expect(result.length).toEqual(0);
  });
});
