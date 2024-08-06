// changing Database
use(BabyNames);


// 10 Most Popular Female Names throughtout all years
db.BabyNamesUSA.aggregate([
    {
      $match: { Gender: "F" }
    },
    {
      $group: {
        _id: "$Name",
        totalOccurrences: { $sum: "$Occurrences" }
      }
    },
    {
      $sort: { totalOccurrences: -1 }
    },
    {
      $limit: 10
    }
  ])
  

// 10 Most Popular Male Names throughtout all years
db.BabyNamesUSA.aggregate([
    {
      $match: { Gender: "M" }
    },
    {
      $group: {
        _id: "$Name",
        totalOccurrences: { $sum: "$Occurrences" }
      }
    },
    {
      $sort: { totalOccurrences: -1 }
    },
    {
      $limit: 10
    }
  ])



// Female names that were popular but are no longer
db.BabyNamesUSA.aggregate([
    {
      $match: {
        Gender: "F",
        Occurrences: { $gte: 5 }
      }
    },
    {
      $group: {
        _id: "$Name",
        pre2000: {
          $sum: {
            $cond: [
              { $lt: ["$year", 2000] },
              "$Occurrences",
              0
            ]
          }
        },
        post2000: {
          $sum: {
            $cond: [
              { $gte: ["$year", 2000] },
              "$Occurrences",
              0
            ]
          }
        }
      }
    },
    {
      $project: {
        name: "$_id",
        pre2000: 1,
        post2000: 1,
        decline: {
          $subtract: [
            { $divide: ["$pre2000", { $subtract: [2000, 1880] }] },
            { $divide: ["$post2000", { $subtract: [2023, 2000] }] }
          ]
        }
      }
    },
    {
      $match: {
        pre2000: { $gt: 0 },
        post2000: { $gt: 0 },
        decline: { $gt: 0 }
      }
    },
    {
      $sort: { decline: -1 }
    },
    {
      $limit: 10
    }
  ])

  db.BabyNamesUSA.aggregate([
    {
      $match: { Gender: "M" }
    },
    {
      $group: {
        _id: "$Name",
        totalOccurrences: { $sum: "$Occurrences" }
      }
    },
    {
      $sort: { totalOccurrences: -1 }
    },
    {
      $limit: 10
    }
  ])



// Male names that were popular but are no longer
db.BabyNamesUSA.aggregate([
    {
      $match: {
        Gender: "M",
        Occurrences: { $gte: 5 }
      }
    },
    {
      $group: {
        _id: "$Name",
        pre2000: {
          $sum: {
            $cond: [
              { $lt: ["$year", 2000] },
              "$Occurrences",
              0
            ]
          }
        },
        post2000: {
          $sum: {
            $cond: [
              { $gte: ["$year", 2000] },
              "$Occurrences",
              0
            ]
          }
        }
      }
    },
    {
      $project: {
        name: "$_id",
        pre2000: 1,
        post2000: 1,
        decline: {
          $subtract: [
            { $divide: ["$pre2000", { $subtract: [2000, 1880] }] },
            { $divide: ["$post2000", { $subtract: [2023, 2000] }] }
          ]
        }
      }
    },
    {
      $match: {
        pre2000: { $gt: 0 },
        post2000: { $gt: 0 },
        decline: { $gt: 0 }
      }
    },
    {
      $sort: { decline: -1 }
    },
    {
      $limit: 10
    }
  ])

// Most unique female names
// Least used alphabets
// Names starting with U for females in order of name length
db.BabyNamesUSA.aggregate([
    {
      $match: { Gender: "F" }
    },
    {
      $group: {
        _id: { $substr: ["$Name", 0, 1] },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: 1, _id: 1 }
    },
    {
      $project: {
        _id: 0,
        letter: "$_id",
        count: 1
      }
    }
  ])


// Names starting with U for females in order of name length
db.BabyNamesUSA.aggregate([
    {
      $match: {
        Gender: "F",
        Name: /^U/
      }
    },
    {
      $group: {
        _id: "$Name",
        totalOccurrences: { $sum: "$Occurrences" }
      }
    },
    {
      $match: {
        totalOccurrences: 5
      }
    },
    {
      $project: {
        name: "$_id",
        totalOccurrences: 1,
        nameLength: { $strLenCP: "$_id" }
      }
    },
    {
      $sort: { nameLength: -1 }
    },
    {
      $limit: 5
    }
  ])


// Most unique male names
// Least used alphabets
db.BabyNamesUSA.aggregate([
    {
      $match: { Gender: "F" }
    },
    {
      $group: {
        _id: { $substr: ["$Name", 0, 1] },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: 1, _id: 1 }
    },
    {
      $project: {
        _id: 0,
        letter: "$_id",
        count: 1
      }
    }
  ])

// Names starting with X for Males in order of name length
db.BabyNamesUSA.aggregate([
    {
      $match: {
        Gender: "M",
        Name: /^X/
      }
    },
    {
      $group: {
        _id: "$Name",
        totalOccurrences: { $sum: "$Occurrences" }
      }
    },
    {
      $match: {
        totalOccurrences: 5
      }
    },
    {
      $project: {
        name: "$_id",
        totalOccurrences: 1,
        nameLength: { $strLenCP: "$_id" }
      }
    },
    {
      $sort: { nameLength: -1 }
    },
    {
      $limit: 5
    }
  ])
 

// Most babies named years
db.BabyNamesUSA.aggregate([
    {
      $group: {
        _id: "$year",
        totalBabies: { $sum: "$Occurrences" }
      }
    },
    {
      $sort: { totalBabies: -1 }
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
        totalBabies: 1
      }
    }
  ])

  
// Top 5 years highest female to male ratio
db.BabyNamesUSA.aggregate([
    {
      $group: {
        _id: { year: "$year", gender: "$Gender" },
        totalOccurrences: { $sum: "$Occurrences" }
      }
    },
    {
      $group: {
        _id: "$_id.year",
        totalFemale: {
          $sum: {
            $cond: [{ $eq: ["$_id.gender", "F"] }, "$totalOccurrences", 0]
          }
        },
        totalMale: {
          $sum: {
            $cond: [{ $eq: ["$_id.gender", "M"] }, "$totalOccurrences", 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
        femaleToMaleRatio: {
          $cond: [
            { $eq: ["$totalMale", 0] },
            null,
            { $divide: ["$totalFemale", "$totalMale"] }
          ]
        },
        totalFemale: 1,
        totalMale: 1
      }
    },
    {
      $sort: { femaleToMaleRatio: -1 }
    },
    {
      $limit: 5
    }
  ])


// Top 5 years of male to female ratios
db.BabyNamesUSA.aggregate([
    {
      $group: {
        _id: { year: "$year", gender: "$Gender" },
        totalOccurrences: { $sum: "$Occurrences" }
      }
    },
    {
      $group: {
        _id: "$_id.year",
        totalFemale: {
          $sum: {
            $cond: [{ $eq: ["$_id.gender", "F"] }, "$totalOccurrences", 0]
          }
        },
        totalMale: {
          $sum: {
            $cond: [{ $eq: ["$_id.gender", "M"] }, "$totalOccurrences", 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
        maleToFemaleRatio: {
          $cond: [
            { $eq: ["$totalFemale", 0] },
            null,
            { $divide: ["$totalMale", "$totalFemale"] }
          ]
        },
        totalFemale: 1,
        totalMale: 1
      }
    },
    {
      $sort: { maleToFemaleRatio: -1 }
    },
    {
      $limit: 5
    }
  ])

  
// Find year with highest unique names
db.BabyNamesUSA.aggregate([
    {
      $group: {
        _id: "$year",
        uniqueNamesCount: { $addToSet: "$Name" }
      }
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
        uniqueNamesCount: { $size: "$uniqueNamesCount" }
      }
    },
    {
      $sort: { uniqueNamesCount: -1 }
    },
    {
      $limit: 1
    }
  ])


