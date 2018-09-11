//region Task_1
const name = process.argv[2];

console.log(`Hi ${name}!`);
//endregion


//region Task_2
for(var i = 0; i<process.argv.length; i++) {
    console.log(`next item: ${process.argv[i]} \n`);
}
//endregion