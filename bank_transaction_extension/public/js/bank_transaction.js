frappe.ui.form.on('Bank Transaction', {
    refresh: function(frm) {
        if (
            !frm.doc.__islocal &&
            frm.doc.custom_debit &&
            frm.doc.custom_credit &&
            (frm.doc.withdrawal || frm.doc.deposit)
        ) {
            if (!frm.doc.custom_journal_entry) {
                frm.add_custom_button('Create Journal Entry', () => {
                    let amount = frm.doc.withdrawal || frm.doc.deposit;

                    frappe.call({
                        method: 'frappe.client.insert',
                        args: {
                            doc: {
                                doctype: 'Journal Entry',
                                posting_date: frm.doc.transaction_date || frappe.datetime.get_today(),
                                company: frm.doc.company,
                                remark: `Auto-created from Bank Transaction: ${frm.doc.name}`,
                                voucher_type: 'Journal Entry',
                                accounts: [
                                    {
                                        account: frm.doc.custom_debit,
                                        debit_in_account_currency: amount
                                    },
                                    {
                                        account: frm.doc.custom_credit,
                                        credit_in_account_currency: amount
                                    }
                                ]
                            }
                        },
                        callback: function(r) {
                            if (!r.exc) {
                                const journal_entry_name = r.message.name;

                                frappe.call({
                                    method: 'frappe.client.submit',
                                    args: {
                                        doc: r.message
                                    },
                                    callback: function(submit_res) {
                                        if (!submit_res.exc) {
                                            frappe.call({
                                                method: "frappe.client.set_value",
                                                args: {
                                                    doctype: frm.doc.doctype,
                                                    name: frm.doc.name,
                                                    fieldname: {
                                                        custom_journal_entry: journal_entry_name,
                                                        custom_amount: amount
                                                    }
                                                },
                                                callback: function() {
                                                    frappe.msgprint({
                                                        title: __('Success'),
                                                        message: __('Journal Entry <a href="/app/journal-entry/' +
                                                            journal_entry_name +
                                                            '" target="_blank">' +
                                                            journal_entry_name +
                                                            '</a> created and submitted successfully.'),
                                                        indicator: 'green'
                                                    });
                                                    frm.reload_doc();
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                });
            }
        }
    }
});