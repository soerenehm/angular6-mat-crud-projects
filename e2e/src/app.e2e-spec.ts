import {browser} from 'protractor';

import {AppPage} from './app.po';

const expectedText = 'CRUD Application for Project Administration';
const expectedTitle = 'angular6-mat-crud-projects-projects';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeAll(() => {
    browser.get('');
  });

  beforeEach(() => {
    page = new AppPage();
  });

  it(`has title '${expectedTitle}'`, () => {
    expect(browser.getTitle()).toEqual(expectedTitle);
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(expectedText);
  });
});
