const square = function (x) {
  return x * x;
};
console.log(square(3));

const sq = (x) => x * x;
console.log(sq(4));

const event = {
  name: "Birthday Party",
  guestList: ["Andrew", "Jen", "Mike"],
  printGuestList() {
    console.log(`Guest list for ${this.name}`);
    this.guestList.forEach((guestName) =>
      console.log(`${guestName} is attending ${this.name}`)
    );
  },
};

event.printGuestList();

// const event2 = {
//   name: "Birthday Party",
//   printGuestList: () => {
//     console.log(`Guest list for ${this.name}`);
//   },
// };

// event2.printGuestList();
