import { Page } from "@playwright/test";
import { UiActions } from "@lib/UiActions";
import { CheckOutLocators } from "./Locators/CheckOutLocators";

let uiActions:UiActions;

export class CheckoutPage extends CheckOutLocators {

    readonly page:Page;

    constructor(page:Page){
        super();
        this.page = page;
        uiActions = new UiActions(this.page);
    }

    verifyItemNameText = async(text: string):Promise<void> => await uiActions.verifyElementHaveText(CheckOutLocators.ITEM_NAME_ELE, text);

    clickCheckoutBtn = async():Promise<void> => await uiActions.eleClick(CheckOutLocators.CHECK_OUT_BTN);

    enterFirstName = async(text: string):Promise<void> => await uiActions.enterElementText(CheckOutLocators.FIRST_NAME_ELE, text);

    enterLastName = async(text: string):Promise<void> => await uiActions.enterElementText(CheckOutLocators.LAST_NAME_ELE, text);

    enterPostCode = async(text: string):Promise<void> => await uiActions.enterElementText(CheckOutLocators.POST_CODE_ELE, text);

    clickContinueBtn = async():Promise<void> => await uiActions.eleClick(CheckOutLocators.CONTINUE_BTN);

    verifyInfoText = async(text: string):Promise<void> => await uiActions.verifyNthElementContainsText(CheckOutLocators.INFO_LABEL_ELE, 1, text);

    clickFinishBtn = async() => await uiActions.eleClick(CheckOutLocators.FINISH_BTN);

    async verifyConfirmationIsDisplayed():Promise<void> {
        await uiActions.verifyElementIsDisplayed(CheckOutLocators.CONFIRMATION_ELE, 'Element not found in page');
    }
        
}
