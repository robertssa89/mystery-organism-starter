// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (idNumber, dnaArr) => {
  const specimen = {
    specimenNum: idNumber,
    
    dna: dnaArr,
    
    //Method that mutates a base of this specimen's DNA into a new base
    mutate() {
      let randomNumber = Math.floor(Math.random() * dnaArr.length);
      let randomBase = dnaArr[randomNumber];
      let newBase = '';
      switch (randomBase) {
        case 'A':
          const ABases = ['T', 'C', 'G'];
          newBase = ABases[Math.floor(Math.random() * 3)];
          break;
        case 'T':
          const TBases = ['A', 'C', 'G'];
          newBase = TBases[Math.floor(Math.random() * 3)];
          break;
        case 'C':
          const CBases = ['A', 'T', 'G'];
          newBase = CBases[Math.floor(Math.random() * 3)];
          break;
        case 'G':
          const GBases = ['A', 'T', 'C'];
          newBase = GBases[Math.floor(Math.random() * 3)];
          break;
        default:
          console.log('Invalid base');
          break;
      }
      dnaArr[randomNumber] = newBase;
      
      return dnaArr;
    },

    //Method that compares how many bases this specimen has is common with a passed specimen
    compareDNA(pAequorObj) {
      let count = 0;
      //console.log(this.dna);
      this.dna.forEach((base, index) => {
        if (base === pAequorObj.dna[index]) {
          count++;
        }
      })
      const percentage = (count / this.dna.length) * 100;
      console.log('Specimen #' + this.specimenNum + ' and ' + 'specimen #' + pAequorObj.specimenNum + 
        ' have ' + percentage + '% DNA in common');

      return percentage;
    },

    // Method to calculate if this specimen is likey to survive (contains at least 60% 'C' or 'G' bases)
    willLikelySurvive() {
      let count = 0;
      this.dna.forEach(base => {
        if (base === 'C' || base === 'G') {
          count++;
        }
      });
      return (count / this.dna.length * 100) >= 60 ? true : false;
    },

    //Method to return complementary DNA strand of this specimen
    complementStrand() {
      let complementaryStrand = [];
      this.dna.forEach((base) => {
        switch (base) {
          case 'A':
            complementaryStrand.push('T');
            break;
          case 'T':
            complementaryStrand.push('A');
            break;
          case 'C':
            complementaryStrand.push('G');
            break;
          case 'G':
            complementaryStrand.push('C');
            break;
          default:
            console.log('Invalid base');
            break;
        };
      });
      return complementaryStrand;
    }
  }

  return specimen;
}

// Function that creates an array of 30 likely survivors of PAequor
const createLikelyToSurviveArr = () => {
  let pAequorArr = [];
  id = 1;
  while (pAequorArr.length != 30) {
    let newPA = pAequorFactory(id, mockUpStrand());
    if (newPA.willLikelySurvive()) {
      pAequorArr.push(newPA);
      id++;
    };
  };
  return pAequorArr;
} 

// Function to find the two most related instances of pAequor storing the specimen number of the two most related 
//specimens, along with the percentage of bases they have in common, in an object
const mostRelated = specimenArr => {
  mostRelatedInstances = {
    idOne: 0,
    idTwo: 0,
    percentage: 0,  
  }

  for (let i = 0; i < specimenArr.length - 1; i++) {
    for (let j = i + 1 ; j < specimenArr.length; j++) {
      if (i!=j) {
        if (specimenArr[i].compareDNA(specimenArr[j]) > mostRelatedInstances.percentage) {
          mostRelatedInstances.idOne = specimenArr[i].specimenNum;
          mostRelatedInstances.idTwo = specimenArr[j].specimenNum;
          mostRelatedInstances.percentage = specimenArr[i].compareDNA(specimenArr[j]);
        };
      };
    };
  };
  console.log('The two most related instances of PAequor in this array are specimen # ' + 
    mostRelatedInstances.idOne + ' and specimen # ' + mostRelatedInstances.idTwo +
    ' with ' + mostRelatedInstances.percentage + '% DNA in common');
    return mostRelatedInstances;
}


const survivors = createLikelyToSurviveArr();
mostRelated(survivors);
/*
console.log(survivors);
console.log(survivors[29].dna);
console.log(survivors[29].complementStrand());

const speciOne = pAequorFactory(1, mockUpStrand());
const speciTwo = pAequorFactory(2, mockUpStrand());

console.log(speciOne.dna);
console.log(speciTwo.dna);

speciOne.compareDNA(speciTwo);

console.log(speciOne.willLikelySurvive());
console.log(speciTwo.willLikelySurvive())
*/









