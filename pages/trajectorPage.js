class TrajectorPage {
    constructor(page) {
        this.page = page;
        this.freeEvaluationButton = this.page.locator('//div[@data-id="25d83513"]');
    }

    async navigate(page) {
        await this.page.goto('https://www.trajectormedical.com/');
        return await this.page.title();
    }

    async clickFreeEvaluation() {
        await this.freeEvaluationButton.click();
    }
    async radioButton() {
        await this.page.locator("#choice_33_6_0").click();
        await this.page.locator("#choice_33_7_0").click()
        await this.page.locator("#choice_33_10_1").click();
    }
}

module.exports = TrajectorPage;
