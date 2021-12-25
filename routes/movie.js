const express = require('express');
const router = express.Router();
//Models
const Movie=require('../models/Movie')


//Kaydet
router.post('/', (req, res, next)=> {
/* const {title,imdb_score,category,country,year}=req.body;
  const movie=new Movie({
    title,
    imdb_score,
    category,
    country,
    year
  })*/
  /*movie.save((err,data)=>{
  if(err)
    res.json(err)
  res.json({status:1})
})*/
  const movie=new Movie(req.body)

  const promise=movie.save();

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })

});

//Tüm Filmleri getir

router.get('/',(req,res,next)=>{
  const promise=Movie.find({});
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});

//top 10 list

router.get('/top10',(req,res,next)=>{
  const promise=Movie.find({}).limit(10).sort({imdb_score:-1});
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});


//id ye göre filmleri getir

router.get('/:movie_id',(req,res,next)=>{
  const promise=Movie.findById(req.params.movie_id);
  promise.then((movie)=>{
    if(!movie) {
      next({message:'The Movie Was Not Found',code:999});
    }
    res.json(movie)
  }).catch((err)=> {
    res.json(err)
  })
})
//güncelleme
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new: true
      }
  );

  promise.then((movie) => {
    if (!movie)
      next({ message: 'The movie was not found.', code: 99 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

//id ye göre silme
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(
      req.params.movie_id,
      req.body
  );

  promise.then((movie) => {
    if (!movie)
      next({ message: 'The movie was not found.', code: 99 });

    res.json({status:1});
  }).catch((err) => {
    res.json(err);
  });
});

//iki yıl arasındaki filmlerin listelenmesi
//between

router.get('/between/:start_year/:end_year',(req,res,next)=>{
  const {start_year,end_year}=req.params

  const promise=Movie.find(
      {
              //büyükeşit       küçükeşit
        year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}
      }
  );
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});



module.exports = router;
