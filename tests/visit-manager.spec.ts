import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("Type Your Email Address").click();
  await page
    .getByPlaceholder("Type Your Email Address")
    .fill("east_legon_manager@yopmail.com");
  await page.getByPlaceholder("Type Your Password").click();
  await page.getByPlaceholder("Type Your Password").fill("Secure@123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText('East Legon Estateestateestate').click();
  await page.locator("a").filter({ hasText: "Features" }).click();
  await page.getByRole("link", { name: "Visit Manager" }).click();
});

test.describe("Verify that an Estate manager", () => {
  test.setTimeout(120_000);

  test("Can save visitor's details successfully while booking a new general visitor", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "New Visitor" }).click();
    await page.getByLabel("Category").click();

    await page.getByRole("option",{name: "General Visitor"}).click();
    await page.getByRole('combobox', { name: 'Select Invite Source ​' }).click();
    await page.getByRole("option",{name: "New"}).click();
    await page.locator('div').filter({ hasText: /^visitor information \*$/ }).getByRole('img').click();
    await page.getByLabel('First Name').click();
    await page.getByLabel('First Name').fill('Nana');
    
    await page.getByLabel('Last Name').click();
    await page.getByLabel('Last Name').fill('Addo');
    
    await page.locator('input[name="phoneNumber"]').click();
    await page.locator('input[name="phoneNumber"]').fill('+233 20 123 4567');
    
    await page.getByLabel('Gender').click();
    await page.getByRole("option",{name: "Male", exact: true}).click();

    await page.locator('div').filter({ hasText: /^Additional information\(optional\)$/ }).getByRole('img').click();
    await page.getByPlaceholder('Enter a location').click();

    await page.getByPlaceholder('Enter a location').fill('Flagstaf house ghana');
    await page.getByText('Flagstaff HouseLiberation').click();

    await page.locator('div').filter({ hasText: /^Visitor Booking Validity\*$/ }).getByRole('img').click();
    await page.getByPlaceholder('Start Date').click();
    await page.getByText('24').nth(1).click();
    await page.getByText('25').first().click();
    await page.locator('div').filter({ hasText: /^Start Time$/ }).getByLabel('Choose time').click();
    await page.getByLabel('3 hours', { exact: true }).click();
    
    await page.getByLabel('PM', { exact: true }).click();
    await page.locator('div').filter({ hasText: /^End Time$/ }).getByLabel('Choose time, selected time is').click();
    await page.getByLabel('6 hours',{ exact: true }).click();
    await page.getByLabel('PM', { exact: true }).click();
    // await page.getByRole('button', {name: 'OK', exact: true}).click();
    await page.getByLabel('No of Entries').click();
    await page.getByRole('option',{name: 'Single entry'}).click();
    await page.getByRole('button', { name: 'Book Visitor' }).click();
    await page.waitForTimeout(15000);
    await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
      - paragraph: Visitor successfully booked to Management
      - paragraph: If you ticked the box to send invite by email, an email has been automatically sent to the email address you indicated for the management. Click share invite details get invite link.
      - button "Done"
      `);
      await page.getByRole('button', { name: 'Done' }).click();

      await page.getByRole('tab', { name: /Saved Visitors*/,  }).click();
      await page.locator('div > .dropdown > .i-false').first().click();
      await page.getByRole('button', { name: 'View Details' }).click();
      await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
        - heading "Saved Visitor Details" [level=2]
        - heading "Nana Addo" [level=3]
        - paragraph
        - paragraph: Edit
        - paragraph: Delete
        - paragraph: Email
        - paragraph: N/A
        - paragraph: Address
        - paragraph: Liberation Rd, Accra, Ghana
        - paragraph: Phone
        - paragraph: /\\+\\d+/
        - paragraph: Visitor Groups
        `);
      await page.getByRole('button').click();

  });

  test("Sends an email invite successfully to a new general visitor", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "New Visitor" }).click();
    await page.getByLabel("Category").click();

    await page.getByRole("option",{name: "General Visitor"}).click();
    await page.getByRole('combobox', { name: 'Select Invite Source ​' }).click();
    await page.getByRole("option",{name: "New"}).click();
    await page.locator('div').filter({ hasText: /^visitor information \*$/ }).getByRole('img').click();
    await page.getByLabel('First Name').click();
    await page.getByLabel('First Name').fill('Nana');
    
    await page.getByLabel('Last Name').click();
    await page.getByLabel('Last Name').fill('Addo');
    
    await page.locator('input[name="phoneNumber"]').click();
    await page.locator('input[name="phoneNumber"]').fill('+233 20 123 4567');
    
    await page.getByLabel('Email(Optional)').click();
    await page.getByLabel('Email(Optional)').fill('nanaaddo@yopmail.com');

    await page.getByLabel('Gender').click();
    await page.getByRole("option",{name: "Male", exact: true}).click();

    await page.locator('div').filter({ hasText: /^Additional information\(optional\)$/ }).getByRole('img').click();
    await page.getByPlaceholder('Enter a location').click();

    await page.getByPlaceholder('Enter a location').fill('Flagstaff house ghana');
    await page.getByText('Flagstaff HouseLiberation').click();

    await page.locator('div').filter({ hasText: /^Visitor Booking Validity\*$/ }).getByRole('img').click();
    await page.getByPlaceholder('Start Date').click();
    await page.getByText('26').first().click();
    await page.getByText('27').first().click();
    await page.locator('div').filter({ hasText: /^Start Time$/ }).getByLabel('Choose time').click();
    await page.getByLabel('3 hours', { exact: true }).click();
    
    await page.getByLabel('PM', { exact: true }).click();
    await page.locator('div').filter({ hasText: /^End Time$/ }).getByLabel('Choose time, selected time is').click();
    await page.getByLabel('6 hours',{ exact: true }).click();
    await page.getByLabel('PM', { exact: true }).click();
    
    await page.getByLabel('No of Entries').click();
    await page.getByRole('option',{name: 'Single entry'}).click();
    
    await page.locator('div').filter({ hasText: /^Send email with invite details to indicated email address$/ }).getByRole('checkbox').check();

    await page.getByRole('button', { name: 'Book Visitor' }).click();
  });

  test("Can edit a booking.",async ({ page }) => {
    await page.getByRole('tab', { name: 'My Visitors' }).click();
    await page.getByRole('tab', { name: 'Upcoming' }).click();
    
    await page.getByLabel('Row Actions').click();
    
    await page.getByRole('menuitem', { name: 'Edit' }).click();

    await page.locator('div').filter({ hasText: /^Visitor Booking Validity$/ }).getByRole('img').click();
    await page.locator('div').filter({ hasText: /^Start Time$/ }).getByLabel('Choose time').click();
    await page.getByLabel('6 hours', { exact: true }).click();
    
    await page.getByLabel('PM', { exact: true }).click();
    await page.locator('div').filter({ hasText: /^End Time$/ }).getByLabel('Choose time, selected time is').click();
    await page.getByLabel('9 hours',{ exact: true }).click();
    await page.getByLabel('PM', { exact: true }).click();

    await page.getByRole('button', { name: 'Update' }).click();
    
    await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
      - paragraph: Successfully Updated
      - paragraph: You have successfully updated this visitor’s booking.
      - button "Okay"
      `);

    await page.getByRole('button', { name: 'Okay' }).click();
    
    await expect(page.locator('tbody')).toMatchAriaSnapshot(`
      - cell /\\d+\\/\\d+\\/\\d+ 6:\\d+ PM/:
        - paragraph: /\\d+\\/\\d+\\/\\d+ 6:\\d+ PM/
      `);
    await expect(page.locator('tbody')).toMatchAriaSnapshot(`
      - cell /\\d+\\/\\d+\\/\\d+ 9:\\d+ PM/:
        - paragraph: /\\d+\\/\\d+\\/\\d+ 9:\\d+ PM/
      `);
  })

  test.afterEach(async ({page})=>{
    /* Delete Saved Visitor */
    // await page.getByRole('tab', { name: /Saved Visitors*/ }).click();
    // await page.locator('div > .dropdown > .i-false').first().click();
    // await page.getByRole('button', { name: 'View Details' }).click();
    // await page.getByText('Delete', { exact: true }).click();
    // await page.getByRole('button', { name: 'Delete' }).click();
    // await page.getByRole('button', { name: 'Done' }).click();
  
    /* Cancel Booking */
    // await page.getByRole('tab', { name: 'My Visitors' }).click();
    // await page.getByRole('tab', { name: 'Upcoming' }).click();
    // await page.getByRole('row', { name: 'Nana Addo Liberation Rd,' }).getByLabel('Row Actions').click();
    // await page.getByText('Cancel').click();
    // await page.getByRole('button', { name: 'Yes' }).click();
  })
});


