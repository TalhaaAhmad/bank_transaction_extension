# Bank Transaction Extension for Frappe/ERPNext

A Frappe app to automate the creation of Journal Entries from Bank Transactions. This app provides reusable JavaScript code that integrates directly with the **Bank Transaction** doctype in Frappe.

---

## Features

- **Automatically create Journal Entries** from Bank Transactions.
- **Update Payment Entries** with the created Journal Entry.
- Easy to install and reuse across multiple instances.

---

## Installation Steps

### 1. Clone the Repository

To start using the `Bank Transaction Extension` app, you first need to clone the repository into your Frappe instance.

```bash
cd ~/frappe-bench/apps
git clone https://github.com/TalhaaAhmad/bank_transaction_extension.git
```

### 2. Install the App

After cloning the app, you need to install it in your Frappe site.

```bash
cd ~/frappe-bench
bench --site your-site-name install-app bank_transaction_extension
```

Make sure to replace `your-site-name` with the name of the site where you want to install the app.

### 3. Refresh Your Site

After installation, refresh your site to load the new app and ensure everything is working properly.

```bash
bench --site your-site-name reload-doc
```

### 4. Clear Cache (optional)

Sometimes clearing the cache is useful to make sure the app's scripts load properly.

```bash
bench --site your-site-name clear-cache
```

---

## Usage

Once the app is installed, it will automatically hook into the **Bank Transaction** doctype. 

1. Open a **Bank Transaction** record.
2. If the record meets the required conditions (custom debit/credit accounts and withdrawal/deposit amounts), a **"Create Journal Entry"** button will appear.
3. Clicking the button will create a journal entry with the details of the transaction and submit it automatically.
4. You can also update payment entries by clicking the **custom update payment entries** button.

---

## Customization

This app uses the following JavaScript files for customization:

- `public/js/bank_transaction.js` - Handles the creation of journal entries from Bank Transactions.
- `public/js/entry.js` - Allows you to update payment entries with the newly created journal entry.

You can extend or modify these scripts to meet the specific needs of your organization.

---

## Contribution

If you'd like to contribute or report an issue, feel free to open a pull request or an issue in the repository.

---

## License

This app is licensed under the MIT License.

---

### Troubleshooting

- **Error**: "Bank Transaction form is missing custom fields."
  - **Solution**: Ensure that the custom fields `custom_debit`, `custom_credit`, and `custom_journal_entry` are added to the **Bank Transaction** doctype in your Frappe instance.
  
- **Error**: "Button not appearing."
  - **Solution**: Check that the **Bank Transaction** record contains both a withdrawal or deposit amount and valid custom debit/credit accounts.

