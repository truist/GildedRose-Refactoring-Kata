describe("Gilded Rose Spec", function() {
  
  
  it("should degrade twice as fast", function(){
	  const startQuality = 10;
	  const foo = new Item("foo", 1, startQuality);
	  const shop = new Shop([ foo ]);
	  
	  const itemDay1 = shop.updateQuality()[0];
	  const day1Quality = itemDay1.quality;
	  const initialDegradation = startQuality - day1Quality;
	  const itemDay2 = shop.updateQuality()[0];
	  
	  expect(itemDay2.quality).toEqual(day1Quality - 2 * initialDegradation);
  });
  
  it("should never have negative quality", function(){
	  const startQuality = 1;
	  const foo = new Item("foo", 1, startQuality);
	  const shop = new Shop([ foo ]);
	  
	  const itemDay1 = shop.updateQuality()[0];
	  expect(itemDay1.quality).toEqual(0);
	  const itemDay2 = shop.updateQuality()[0];
	  expect(itemDay2.quality).toEqual(0);
  });
  
  // TODO: test more of this, like SellIn not hitting 0,
  // starting out with a negative Quality and/or a negative SellIn
  // starting at Quality=1, SellIn=0, and seeing that though the Quality 
  //  would be inclined to decrease by 2 but only decreases by 1 because \
  //  it can't go past 0
  
  // TODO: Test most or all of the items in the Shop

  it("Aged Brie increases in quality", function(){
	const startQuality = 0;
	const foo = new Item("Aged Brie", 100, startQuality);
	const shop = new Shop([ foo ]);

	for (var i = 1; i <= 50; i++) {
	  const item = shop.updateQuality()[0];
	  const day1Quality = item.quality;
	  
	  expect(item.quality).toEqual(startQuality + i);
	}
  });
});

describe("Gilded Rose Assumptions", function() {
  it("should equal foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });
  it("should degrade by one", function(){
	  const foo = new Item("foo", 1, 10);
	  const shop = new Shop([ foo ]);
	  
	  const itemsDay1 = shop.updateQuality();
      expectSellInAndQuality(itemsDay1[0], 0, 9);	  
  });
});

function expectSellInAndQuality(item, expectedSellIn, expectedQuality) {
	 expect(item.sellIn).toEqual(expectedSellIn);
	 expect(item.quality).toEqual(expectedQuality);
}
