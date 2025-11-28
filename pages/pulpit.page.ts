import { Locator, Page } from '@playwright/test';

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  messageText: Locator;

  transferButton: Locator;
  actionCloseButton: Locator;

  constructor(private page: Page) {
    this.transferReceiver = page.locator('#widget_1_transfer_receiver');
    this.transferAmount = page.locator('#widget_1_transfer_amount');
    this.transferTitle = page.locator('#widget_1_transfer_title');

    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.actionCloseButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');
  }

  async quickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.transferButton.click();
    await this.actionCloseButton.click();
  }
}