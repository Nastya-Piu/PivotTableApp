import { PivotTableAppPage } from './app.po';

describe('pivot-table-app App', () => {
  let page: PivotTableAppPage;

  beforeEach(() => {
    page = new PivotTableAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
