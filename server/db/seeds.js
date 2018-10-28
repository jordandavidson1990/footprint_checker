use carbonFootprintTracker;
db.dropDatabase();

db.carbonFootprints.insertMany([
  {
    emitter: "Air Travel",
    factors:{
      economy:
      {
        short_haul: 0.096,
        long_haul: 0.08
      },
      business:
      {
        short_haul: 0.126,
        long_haul: 0.154
      },
      first:
      {
        short_haul: 0.24,
        long_haul: 0.24
      }
    }
  },
  {
    emitter: "Diet",
    factors:{
      type: {
        serious_meat_eaters: 2250,
        typical_diet: 2000,
        vegetarian: 1400,
        vegan: 1000
      },
      source:{
        local: -400,
        abroad: 100
      }
    }
  },
  {
    emitter: "Transport",
    factors: {
        petrol_car: 0.415,
        diesel_car: 0.38,
        bus: 0.09,
        train: 0.09,
        underground_train: 0.05,
        cycle: 0,
        walk: 0
    }
  },
  {
    emitter: "Home",
    factors: {
      heating_type:{
        central: {
          detached: 4800,
          semi_detached: 3200,
          terrace: 2200,
          flat: 1600
        },
        per_room: 800,
      }
    }
  }
]);

db.users.insertOne(
  {
    diet:{
      type: 1,
      source: 1
    },
    air_travel:{
      distance: 1,
      duration: 1,
      class: 1
    },
    transport:{
      fuel_type: 1,
      transport_type: 1
    },
    home:{
      building_type: 1,
      number_of_bedrooms: 1,
      heating_type:1
    }
  }
)

db.questions.insertMany(
  [
    {
      category: "Air Travel",
      questions:
      [
        {
          statement: "How many air miles have you covered in a year?",
          options: [{value: 1000,
                      text: "Upto 1000 miles"
                      },
                      {value: 2000,
                      text: "Upto 2000 miles"
                      },
                      {value: 3000,
                      text: "Upto 3000 miles"
                    }]
        },
        {
          statement: "What class do you normally fly?",
          options: ["Economy", "Business", "First"]
        },
        {
          statement: "How far are your normal flights?",
          options: [{value: "short_haul",
                    text: "Short-haul"},
                    {value: "long_haul",
                    text: "Long-haul"}]
        }
      ]
    },
    {
      category: "Diet",
      questions:
      [
        {
          statement: "What type of diet would you consider yourself?",
          options: [{value: "serious_meat_eaters",
                    text: "Eats Meat with most meals"},
                    {value: "typical_diet",
                     text: "Occaisional Meat eater"},
                    {value: "vegetarian" ,
                    text: "Vegetarian"},
                    {value: "vegan",
                    text: "Vegan"}]
        },
        {
          statement: "Where does your food come from?",
          options: [{value: "local",
                    text: "Locally Sourced"},
                    {value: "abroad",
                    text: "Globally Sourced"}]
        }
      ]
    },
    {
      category: "Transport",
      questions:
      [
        {
          statement: "What is your main type of transport?",
          options: [{value: "petrol_car",
                    text: "Petrol Car"},
                    {value: "diesel_car",
                    text: "Diesel Car"},
                    {value: "train",
                    text: "Train"},
                    {value: "bus",
                    text: "Bus"},
                    {value: "underground_train",
                    text: "Underground Train"},
                    {value: "cycle",
                    text: "Cycle"},
                    {value: "walk",
                    text: "Walk"}]
        },
        {
          statement: "How many miles do you use in a year?",
          options: [{value: 10000,
                    text: "Less than 10,000"},
                    {value: 15000,
                    text: "Between 10,000 & 15,000"},
                    {value: 20000,
                    text: "More Than 15,000"}]
        }
      ]
    },
    {
      category: "Home",
      questions:
      [
        {
          statement: "What kind of home do you have?",
          options: [{value: "detached",
                    text: "Detached"},
                    {value: "semi_detached",
                    text: "Semi-Detatched"},
                    {value: "flat",
                    text: "Flat"},
                    {value: "terrace",
                    text: "Terrace"}]
        },
        {
          statement: "What is your Heating Source?",
          options: [{value: "central",
                    text: "Central Heating"},
                    {value: "per_room",
                    text: "Heat Per Room"}]
        }
      ]
    }
  ]
);
