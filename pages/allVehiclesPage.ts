import { Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class AllVehiclesPage extends BasePage {
  readonly path: string;
  readonly filtersButton: Locator = this.page.getByRole('button', { name: 'Filters' });
  readonly applyFiltersButton: Locator = this.page.getByRole('button', { name: 'Apply Filters' });
  readonly closeFiltersButton: Locator = this.page.getByLabel('close overlay').first();
  readonly minMSRP: Locator = this.page.locator('input[id$="minprice-field"]');
  readonly maxMSRP: Locator = this.page.locator('input[id$="maxprice-field"]');
  readonly vehiclesGrid: Locator = this.page.locator('.vehicles-grid');
  readonly vehicleCards: Locator = this.vehiclesGrid.locator('.vehicle-card.selected');

  constructor(page) {
    super(page);

    this.path = this.baseUrl + '/all-vehicles/';
  }

  async expectedCondition() {
    await expect(this.page).toHaveTitle(/New Toyota Cars For Sale | New Car Prices/);
  }

  async goToAllVehiclesPage() {
    await this.navigate(this.path);
  }

  async filterByMSRP(min: string, max: string) {
    await this.clickOnFiltersButton();
    await this.setMinMSRP(min);
    await this.setMaxMSRP(max);
    await this.clickApplyFiltersButton();
    await this.clickCloseFiltersButton();
  }

  async assertThatAllVehiclesAreBetween(min: number, max: number) {
    for (const vehicleCard of await this.vehicleCards.all()) {
      const msrp = await vehicleCard.locator('.meta .header').first().textContent();

      if (msrp === null) {
        throw new Error('MSRP is null');
      }

      const msrpValue = parseInt(msrp.replace(/[^0-9]/g, ''));
      expect(msrpValue).toBeGreaterThanOrEqual(min);
      expect(msrpValue).toBeLessThanOrEqual(max);
    }
  }

  async clickOnFiltersButton() {
    if (await this.filtersButton.isVisible( { timeout: 5000 } )) {
      await this.filtersButton.click();
    }
  }

  async clickApplyFiltersButton() {
    if (await this.applyFiltersButton.isVisible( { timeout: 5000 } )) {
      await this.applyFiltersButton.click();
    }
  }

  async clickCloseFiltersButton() {
    if (await this.closeFiltersButton.isVisible( { timeout: 5000 } )) {
      await this.closeFiltersButton.click();
    }
  }

  async setMinMSRP(value: string) {
    await this.minMSRP.fill(value);
  }

  async setMaxMSRP(value: string) {
    await this.maxMSRP.fill(value);
  }
}