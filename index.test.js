import {
  sortExtensionsByName,
  sortExtensionsByExtType,
  sumByQuarter,
  averageByQuarter,
  Sequence,
  getUnUsedKeys
} from './coding'

/**
  Question 2: sort extensions by extType follow these orders ASC
  DigitalUser < VitrualUser < FaxUser < AO < Dept.
**/

const extensions = [{
    firstName: 'Bell',
    lastName: 'Chen',
    ext: '456',
    extType: 'Dept'
  },
  {
    firstName: 'Dora',
    lastName: 'Hu',
    ext: '456',
    extType: 'AO'
  },
  {
    firstName: 'Allen',
    lastName: 'Liu',
    ext: '123',
    extType: 'DigitalUser'
  },
  {
    firstName: 'Bell',
    lastName: 'Chen',
    ext: '123',
    extType: 'FaxUser'
  },
  {
    firstName: 'Allen',
    lastName: 'Wang',
    ext: '456',
    extType: 'VitrualUser'
  }
]

const saleItems = [{
    month: 1,
    date: 1,
    transationId: 'xxx',
    salePrice: 1
  },
  {
    month: 1,
    date: 2,
    transationId: 'xxx',
    salePrice: 2
  },
  {
    month: 2,
    date: 21,
    transationId: 'xxx',
    salePrice: 3
  },
  {
    month: 3,
    date: 1,
    transationId: 'xxx',
    salePrice: 4
  },
  {
    month: 4,
    date: 1,
    transationId: 'xxx',
    salePrice: 5
  },
  {
    month: 5,
    date: 1,
    transationId: 'xxx',
    salePrice: 6
  },
  {
    month: 6,
    date: 1,
    transationId: 'xxx',
    salePrice: 7
  },
  {
    month: 7,
    date: 1,
    transationId: 'xxx',
    salePrice: 8
  },
  {
    month: 8,
    date: 1,
    transationId: 'xxx',
    salePrice: 9
  },
  {
    month: 9,
    date: 1,
    transationId: 'xxx',
    salePrice: 10
  },
  {
    month: 10,
    date: 1,
    transationId: 'xxx',
    salePrice: 11
  },
]

describe('coding', () => {
  it('Question1: sortExtensionsByName', () => {
    const expectedResult = [{
        firstName: 'Allen',
        lastName: 'Liu',
        ext: '123',
        extType: 'DigitalUser'
      },
      {
        firstName: 'Allen',
        lastName: 'Wang',
        ext: '456',
        extType: 'VitrualUser'
      },
      {
        firstName: 'Bell',
        lastName: 'Chen',
        ext: '123',
        extType: 'FaxUser'
      },
      {
        firstName: 'Bell',
        lastName: 'Chen',
        ext: '456',
        extType: 'Dept'
      },
      {
        firstName: 'Dora',
        lastName: 'Hu',
        ext: '456',
        extType: 'AO'
      },
    ]
    expect(sortExtensionsByName(extensions)).toMatchObject(expectedResult)
  })

  it('Question2: sortExtensionsByExtType', () => {
    const expectedResult = [{
        firstName: 'Allen',
        lastName: 'Liu',
        ext: '123',
        extType: 'DigitalUser'
      },
      {
        firstName: 'Allen',
        lastName: 'Wang',
        ext: '456',
        extType: 'VitrualUser'
      },
      {
        firstName: 'Bell',
        lastName: 'Chen',
        ext: '123',
        extType: 'FaxUser'
      },
      {
        firstName: 'Dora',
        lastName: 'Hu',
        ext: '456',
        extType: 'AO'
      },
      {
        firstName: 'Bell',
        lastName: 'Chen',
        ext: '456',
        extType: 'Dept'
      }
    ]
    expect(sortExtensionsByExtType(extensions)).toMatchObject(expectedResult)
  })

  it('Question3: sumByQuarter', () => {
    const expectedResult = [{
        quarter: 1,
        totalPrices: 10,
        transactionNums: 4
      },
      {
        quarter: 2,
        totalPrices: 18,
        transactionNums: 3
      },
      {
        quarter: 3,
        totalPrices: 27,
        transactionNums: 3
      },
      {
        quarter: 4,
        totalPrices: 11,
        transactionNums: 1
      },
    ];
    expect(sumByQuarter(saleItems)).toMatchObject(expectedResult)
  })

  it("Question4: averageByQuarter", () => {
    const expectedResult = [{
        quarter: 1,
        averagePrices: 2.5,
        transactionNums: 4
      },
      {
        quarter: 2,
        averagePrices: 6,
        transactionNums: 3
      },
      {
        quarter: 3,
        averagePrices: 9,
        transactionNums: 3
      },
      {
        quarter: 4,
        averagePrices: 11,
        transactionNums: 1
      },
    ];
    expect(averageByQuarter(saleItems)).toMatchObject(expectedResult)
  })

  it('Question5: Sequence', () => {
    const sequence1 = new Sequence()
    expect(sequence1.next()).toBe(1)
    expect(sequence1.next()).toBe(2)
    const sequence2 = new Sequence()
    expect(sequence2.next()).toBe(3)
    expect(sequence2.next()).toBe(4)
  })

  it("Question6: getUnUsedKeys", () => {
    const allKeys = [...Array(100).keys()];
    const usedKeys = [1, 2, 4];
    const unUsedKeys = getUnUsedKeys(allKeys, usedKeys);

    expect(unUsedKeys.length).toBe(97);
    expect(unUsedKeys[1]).toBe(3);
    expect(unUsedKeys[10]).toBe(13);
  })
})