const mongoose=require('mongoose')
const express = require('express');
const router = express.Router();

//models
const Director=require('../models/Director')

/* kaydetme */
router.post('/', (req, res, next) =>{
  const director=new Director(req.body);
  const promise=director.save();
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});
//gruplama ile düzenleme ve hepsini getirme
router.get('/',(req,res)=>{
  const promise=Director.aggregate([
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'director_id',
        as:'movies'
      }
    },{
      $unwind:{
        path:'$movies',
        preserveNullAndEmptyArrays:true
      }
    },{
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          surname:'$surname',
          bio:'$bio',
        },
        movies:{
          $push:'$movies'
        }
      }
    },{
    $project:{
      _id:'$_id._id',
      name:'$_id.name',
      surname:'$_id.surname',
      bio:'$_id.bio',
      movies:'$movies'
    }
    }
  ])
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})



//tek yönetmen

router.get('/:director_id',(req,res)=>{
  const promise=Director.aggregate([
    {
      $match:{
        '_id':mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'director_id',
        as:'movies'
      }
    },{
      $unwind:{
        path:'$movies',
        preserveNullAndEmptyArrays:true
      }
    },{
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          surname:'$surname',
          bio:'$bio',
        },
        movies:{
          $push:'$movies'
        }
      }
    },{
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        bio:'$_id.bio',
        movies:'$movies'
      }
    }
  ])
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

module.exports = router;
