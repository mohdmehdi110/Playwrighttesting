const{
    test,expect} = require('@playwright/test');
    test('OPDC redirection',async({page})=>{
       await page.goto(
    'https://dev-un-opdc.pantheonsite.io/',
    { waitUntil: 'domcontentloaded' }
);
        await expect(page).toHaveURL('https://dev-un-opdc.pantheonsite.io/');
        await page.getByRole('button', { name: 'Our Projects' }).click();
        
    });
