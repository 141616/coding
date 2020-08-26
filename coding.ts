/**
  extensions is an Array and each item has such format:
  {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
  lastName, ext can be empty, extType can only has "DigitalUser", "VitrualUser","FaxUser","Dept","AO".
**/

/**
 * interface and some functions
 */
interface Extension {
  firstName: string;
  lastName: string;
  ext: string;
  extType: ExtType;
}

enum ExtType {
  DigitalUser = "DigitalUser",
  VitrualUser = "VitrualUser",
  FaxUser = "FaxUser",
  Dept = "Dept",
  AO = "AO",
}

const ExtTypeWeight = {
  [ExtType.DigitalUser]: 0,
  [ExtType.VitrualUser]: 1,
  [ExtType.FaxUser]: 2,
  [ExtType.AO]: 3,
  [ExtType.Dept]: 4,
};

function compareExtensionByName(e1: Extension, e2: Extension) {
  const compareRes =
    e1.firstName.localeCompare(e2.firstName) ||
    e1.lastName.localeCompare(e2.lastName) ||
    e1.ext.localeCompare(e2.ext);
  return compareRes <= 0;
}

function compareExtensionByExtType(e1: Extension, e2: Extension) {
  return ExtTypeWeight[e1.extType] <= ExtTypeWeight[e2.extType];
}

/**
 * 快速排序，传入比较方法
 * @param extensions
 * @param compare
 */
function quickSortExtensions(
  extensions: Extension[],
  compare: (a: Extension, b: Extension) => boolean
) {
  if (extensions.length <= 1) {
    return extensions;
  }

  const pivotIndex = Math.floor(extensions.length / 2);
  const pivotExtension = extensions.splice(pivotIndex, 1)[0];
  const leftExtensions = [];
  const rightExtensions = [];

  extensions.forEach((extension) => {
    if (compare(extension, pivotExtension)) {
      leftExtensions.push(extension);
    } else {
      rightExtensions.push(extension);
    }
  });

  return [
    ...quickSortExtensions(leftExtensions, compare),
    pivotExtension,
    ...quickSortExtensions(rightExtensions, compare),
  ];
}

/**
  Question 1: sort extensions by "firstName" + "lastName" + "ext" ASC
**/

export function sortExtensionsByName(extensions: Extension[]) {
  return quickSortExtensions([...extensions], compareExtensionByName);
}

/**
  Question 2: sort extensions by extType follow these orders ASC
  DigitalUser < VitrualUser < FaxUser < AO < Dept.
**/
export function sortExtensionsByExtType(extensions: Extension[]) {
  return quickSortExtensions([...extensions], compareExtensionByExtType);
}

/**
  saleItems is an Array has each item has such format:
  {
	month: n, //[1-12],
	date: n, //[1-31],
	transationId: "xxx",
	salePrice: number
  }
**/

interface SaleItem {
  month: number;
  date: number;
  transationId: string;
  salePrice: number;
}

/**
  Question 3: write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
  [
  	{quarter: 1, totalPrices: xxx, transactionNums: n},
  	{....}
  ]
**/
export function sumByQuarter(saleItems: SaleItem[]) {
  const res = [
    { quarter: 1, totalPrices: 0, transactionNums: 0 },
    { quarter: 2, totalPrices: 0, transactionNums: 0 },
    { quarter: 3, totalPrices: 0, transactionNums: 0 },
    { quarter: 4, totalPrices: 0, transactionNums: 0 },
  ];

  saleItems.forEach((saleItem) => {
    const { month, salePrice } = saleItem;
    const quarter = Math.ceil(month / 3);
    const index = quarter - 1;
    res[index].totalPrices += salePrice;
    res[index].transactionNums++;
  });

  return res;
}

/**
  Question 4: write a function to calculate and return a list of average sales for each quarter, expected result like:
  [
    {quarter: 1, averagePrices: xxx, transactionNums: n},
    {....}
  ]
**/

function calculateAveragePrices(total: number, transactionNums: number) {
  if (transactionNums === 0) {
    return 0;
  }
  return total / transactionNums;
}

export function averageByQuarter(saleItems: SaleItem[]) {
  const quarters = sumByQuarter(saleItems);
  return quarters.map(({ quarter, totalPrices, transactionNums }) => ({
    quarter,
    averagePrices: calculateAveragePrices(totalPrices, transactionNums),
    transactionNums,
  }));
}

/**
  Question 5: please create a tool to generate Sequence
  Expected to be used like:
  var sequence1 = new Sequence();
  sequence1.next() --> return 1;
  sequence1.next() --> return 2;
  
  in another module:
  var sequence2 = new Sequence();
  sequence2.next() --> 3;
  sequence2.next() --> 4;
**/
export class Sequence {
  constructor() {
    if (Sequence._instance) {
      return Sequence._instance;
    }
    return (Sequence._instance = this);
  }

  static _instance: any;
  index: number = 0;

  next() {
    return ++this.index;
  }
}

/**
    Question 6:
    AllKeys: 0-9;
    usedKeys: an array to store all used keys like [2,3,4];
    We want to get an array which contains all the unused keys,in this example it would be: [0,1,5,6,7,8,9]
**/

export function getUnUsedKeys(allKeys: number[], usedKeys: number[]) {
  const map = new Map<number, boolean>();
  usedKeys.map((key) => map.set(key, true));
  return allKeys.filter((key) => !map.get(key));
}

// 使用字符串替换的方法移除掉已使用的keys
function getUnUsedKeys2(allKeys: number[], usedKeys: number[]) {
  const allKeysStr = allKeys.join(",") + ",";
  usedKeys.forEach((key) => allKeysStr.replace(`${key},`, ""));
  return allKeysStr
    .substr(0, allKeysStr.length - 1)
    .split(",")
    .map((key) => +key);
}
