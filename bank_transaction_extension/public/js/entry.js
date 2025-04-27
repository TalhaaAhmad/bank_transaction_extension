frappe.ui.form.on("Bank Transaction", {
    custom_update_payment_entries: function (frm) {
      // Example: values from custom fields
      const journal_entry_name = frm.doc.custom_journal_entry;
      const amount = frm.doc.custom_amount;
  
      if (!journal_entry_name || !amount) {
        frappe.msgprint("Please enter both Journal Entry and Amount.");
        return;
      }
  
      // Clear existing child table entries
      frm.clear_table("payment_entries");
  
      // Add new row to payment_entries
      let row = frm.add_child("payment_entries");
      row.payment_document = "Journal Entry";
      row.payment_entry = journal_entry_name;
      row.allocated_amount = amount;
  
      // Refresh the table field in the UI
      frm.refresh_field("payment_entries");
    },
  
    // Optional: style the custom button on load
    onload: function (frm) {
      if (frm.fields_dict.custom_update_payment_entries) {
        frm.fields_dict.custom_update_payment_entries.$input.addClass("btn btn-primary");
      }
    }
  });
  