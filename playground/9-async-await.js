const doWork_1 = async () => {};
console.log(doWork_1()); // Promise { undefined }

const doWork_2 = async () => {
  return "Ngan";
};
console.log(doWork_2()); // Promise { 'Ngan' }
doWork_2()
  .then((result) => console.log("Result", result)) // Result Ngan
  .catch((e) => console.log(e));

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) return reject("Numbers must be non-negative");
      resolve(a + b);
    }, 2000);
  });
};

const doWork_3 = async () => {
  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, 3);
  return sum3;
};
doWork_3()
  .then((result) => console.log("Result", result)) // Result 153
  .catch((e) => console.log(e));

const doWork_4 = async () => {
  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};
doWork_4()
  .then((result) => console.log("Result", result)) // Numbers must be non-negative
  .catch((e) => console.log(e));
