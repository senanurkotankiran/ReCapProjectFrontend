import { ColorFilterPipe } from './color-filter.pipe';

describe('CarColorFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ColorFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
