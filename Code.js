var TEMPLATE_NAME = 'Template';

var PURCHASE_START_ROW = 17;
var INVOICE_START_ROW = 12;

var ITEM_START_COLUMN = 'A';
var ITEM_END_COLUMN = 'E';

var ITEM_VALUE_ROW = 1;
var ITEM_VALUE_COLUMN = 2;

var TIMESTAMP_INDEX = 0;
var DATE_INDEX = 1;
var USD_AMOUNT_INDEX = 2;
var EUR_AMOUNT_INDEX = 3;
var INVOICE_ITEMS_INDEX = 4;
var PURCHASE_ITEMS_INDEX = 5;
var SUBMITTER_INDEX = 6;

var SUMMARY_RANGE = 'C1:C3';
var ACTUAL_RANGE = 'B7:C7';

function sheetName(timestamp, date) {
  return date.toString() + ' ' + (new Date(timestamp)).getTime();
}

function itemRange(sheet, row) {
  return sheet.getRange(ITEM_START_COLUMN + row + ':' + ITEM_END_COLUMN + row);
}

function insertItems(sheet, row, items) {
  var index = 0;
  var range = itemRange(sheet, row);
  items.split('\n').forEach(function(item) {
    if (item.trim().length > 0) {
      if (index > 0) {
        sheet.insertRowAfter(row);
        row++;
        var destination = itemRange(sheet, row);
        range.copyTo(destination);
        range = destination;
      }
      index++;
      range.getCell(ITEM_VALUE_ROW, ITEM_VALUE_COLUMN).setValue(parseFloat(item));
    }
  });
}

function onFormSubmit(params) {
  var values = params.values;
  var timestamp = values[TIMESTAMP_INDEX];
  var date = values[DATE_INDEX];
  var usdAmount = values[USD_AMOUNT_INDEX];
  var eurAmount = values[EUR_AMOUNT_INDEX];
  var invoiceItems = values[INVOICE_ITEMS_INDEX];
  var purchaseItems = values[PURCHASE_ITEMS_INDEX];
  var submitter = values[SUBMITTER_INDEX];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var template = ss.getSheetByName(TEMPLATE_NAME);
  var s = ss.insertSheet(sheetName(timestamp, date), 0, {template: template});
  s.getRange(SUMMARY_RANGE).setValues([
    [date],
    [submitter],
    [timestamp],
  ]);
  s.getRange(ACTUAL_RANGE).setValues([
    [
      usdAmount,
      eurAmount,
    ],
  ]);
  insertItems(s, PURCHASE_START_ROW, purchaseItems);
  insertItems(s, INVOICE_START_ROW, invoiceItems);
}
