const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);

const printProfileData = profileDataArr => {
    // Log 1
    for (let i = 0; i < profileDataArr.length; i += 1) {
      console.log(profileDataArr[i]);
    }
  
    console.log('================');
  
    // Log 2
    profileDataArr.forEach((profileItem) => {
      console.log(profileItem)
    });
};

printProfileData(profileDataArgs);