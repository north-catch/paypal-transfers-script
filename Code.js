function onFormSubmit(params) {
  var values = params.values;
  var timestamp = values[0];
  var date = values[1];
  var usdAmount = values[2];
  var eurAmount = values[3];
  var invoiceItems = values[4];
  var purchaseItems = values[5];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.insertSheet('My New Sheet');
  var r = s.getRange("A1:A6");
  r.setValues([
    [timestamp],
    [date],
    [usdAmount],
    [eurAmount],
    [invoiceItems],
    [purchaseItems]
  ]);
}
