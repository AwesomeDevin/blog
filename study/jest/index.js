function fetchData(){
  return new Promise((resolve)=>{
    resolve(123)
  })
}

test('测试两个值的和',async ()=>{

  // expect.assertions(1);
  expect(await fetchData()).toBe(123)
})