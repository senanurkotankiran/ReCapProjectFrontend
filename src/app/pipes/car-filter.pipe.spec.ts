import { CarFilterPipe } from './car-filter.pipe';

describe('FilterPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CarFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
