import { test } from '@playwright/test';
import { AllVehiclesPage } from '../pages/allVehiclesPage';

test.describe('Home Page', () => {
  test('customer can navigate to explore all vehicles', async ({ page }) => {
    const allVehiclesPage = new AllVehiclesPage(page);
    await allVehiclesPage.goToAllVehiclesPage();
    await allVehiclesPage.filterByMSRP('20000', '30000');
    await allVehiclesPage.assertThatAllVehiclesAreBetween(20000, 30000);
  });
});