import { Shroom2Page } from './app.po';

describe('shroom2 App', function() {
  let page: Shroom2Page;

  beforeEach(() => {
    page = new Shroom2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
