use carbonFootprintTracker;
db.dropDatabase();

db.carbonFootprints.insertMany([
  {
    emitter: "Air Travel",
    factors:{
      class_by_mile:{
        economy:
        {
          short_haul: 0.096,
          long_haul: 0.08
        } ,
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
      type_by_miles: {
        car:{
          petrol: 0.415
        } ,
        diesel: 0.38,
      },
      bus: 0.09,
      train: 0.09,
      underground_train: 0.05,
      cycle: 0,
      walk: 0
    },
  },
  {
    emitter: "Home",
    factors:{
      heating_type:{
        central: {
          detached: 4800,
          semi_detached: 3200,
          terrace: 2200,
          flat: 1600
        }
        per_room: 800,
      }
    }
  }
]);

db.users.insertOne([
  {
    diet:{
      type:,
      source:
    },
    air_travel:{
      distance:,
      duration:,
      class:
    },
    transport:{
      fuel_type:,
      transport_type:
    },
    home:{
      building_type:,
      number_of_bedrooms:,
      heating_type:
    }
  }
])
