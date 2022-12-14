const mongoose = require('mongoose')

const AvailableProjectSchema = new mongoose.Schema({ //AvailableProject Schema

//   _id: {
//     type: Object
// },

//need to add a batch field for multipe batches
  projectName: {
      type: String
  },
  projectDescription: {
      type: String
  },
  projectBiddingCount:{
    type:Number
  },
  projectType:{
    type:String
  },
  projectSupervisedBy:{
    type:String
  },
  publishedDate:{
    type:String
  },
  projectStatus:{
    type:Boolean
  },
  bidding:{
    biddingPlacedGroup:{
      type:String
    },
    date:{
      type:String
    },
    time:{
      type:String
    }

  },
  allBiddings:[]
})
const AvailableProject = mongoose.model("availableProjects", AvailableProjectSchema)
module.exports = AvailableProject